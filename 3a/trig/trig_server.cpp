// udp_trig_server.cpp
#include <iostream>
#include <string>
#include <sstream>
#include <cmath>
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")

#define PORT 8080
#define BUFSIZE 1024

double to_radians(double value) { return value * M_PI / 180.0; }

std::string compute(const std::string &req) {
    std::istringstream iss(req);
    std::string func, valstr, unit;
    if (!(iss >> func >> valstr)) return "ERR invalid request format. Use: <func> <value> [deg|rad]";

    if (!(iss >> unit)) unit = "rad"; // default

    // normalize
    for (auto &c : func) c = std::tolower(c);
    for (auto &c : unit) c = std::tolower(c);

    double value;
    try {
        value = std::stod(valstr);
    } catch (...) {
        return "ERR invalid numeric value";
    }

    if (unit == "deg") value = to_radians(value); // convert to radians

    double res = 0.0;
    errno = 0;
    if (func == "sin") {
        res = sin(value);
    } else if (func == "cos") {
        res = cos(value);
    } else if (func == "tan") {
        // check near cos(value)=0
        double c = cos(value);
        if (fabs(c) < 1e-12) return "ERR tan undefined (cos approx 0)";
        res = tan(value);
    } else if (func == "asin") {
        if (value < -1.0 || value > 1.0) return "ERR asin domain [-1,1]";
        res = asin(value);
    } else if (func == "acos") {
        if (value < -1.0 || value > 1.0) return "ERR acos domain [-1,1]";
        res = acos(value);
    } else if (func == "atan") {
        res = atan(value);
    } else {
        return "ERR unknown function. Use sin cos tan asin acos atan";
    }

    // Format result with decent precision
    std::ostringstream oss;
    oss.setf(std::ios::fixed);
    oss.precision(10);
    oss << "OK " << res;
    return oss.str();
}

int main() {
    WSADATA wsa;
    if (WSAStartup(MAKEWORD(2,2), &wsa) != 0) {
        std::cerr << "WSAStartup failed\n";
        return 1;
    }

    SOCKET sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP);
    if (sock == INVALID_SOCKET) {
        std::cerr << "socket() failed\n";
        WSACleanup();
        return 1;
    }

    sockaddr_in serv{};
    serv.sin_family = AF_INET;
    serv.sin_addr.s_addr = INADDR_ANY;
    serv.sin_port = htons(PORT);

    if (bind(sock, (sockaddr*)&serv, sizeof(serv)) == SOCKET_ERROR) {
        std::cerr << "bind() failed\n";
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    std::cout << "UDP trig server listening on port " << PORT << "...\n";

    char buf[BUFSIZE];
    while (true) {
        sockaddr_in client{};
        int clientLen = sizeof(client);
        int recvLen = recvfrom(sock, buf, BUFSIZE - 1, 0, (sockaddr*)&client, &clientLen);
        if (recvLen == SOCKET_ERROR) {
            std::cerr << "recvfrom() failed\n";
            break;
        }
        buf[recvLen] = '\0';
        std::string request(buf);
        char clientIP[INET_ADDRSTRLEN];
        inet_ntop(AF_INET, &client.sin_addr, clientIP, sizeof(clientIP));
        std::cout << "Received from " << clientIP << ":" << ntohs(client.sin_port) << " -> " << request << "\n";

        std::string reply = compute(request);

        int sent = sendto(sock, reply.c_str(), (int)reply.size(), 0, (sockaddr*)&client, clientLen);
        if (sent == SOCKET_ERROR) {
            std::cerr << "sendto() failed\n";
            break;
        }
    }

    closesocket(sock);
    WSACleanup();
    return 0;
}
