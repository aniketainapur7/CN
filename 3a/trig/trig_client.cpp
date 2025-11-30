// udp_trig_client.cpp
#include <iostream>
#include <string>
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "ws2_32.lib")

#define SERVER_IP "127.0.0.1"
#define SERVER_PORT 8080
#define BUFSIZE 1024

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
    serv.sin_port = htons(SERVER_PORT);
    inet_pton(AF_INET, SERVER_IP, &serv.sin_addr);

    std::cout << "UDP trig client. Enter requests like:\n";
    std::cout << "  sin 30 deg\n  cos 1.5708 rad\n  atan 1\nType 'quit' to exit.\n\n";

    while (true) {
        std::cout << "> ";
        std::string line;
        if (!std::getline(std::cin, line)) break;
        if (line.empty()) continue;
        if (line == "quit" || line == "exit") break;

        int sent = sendto(sock, line.c_str(), (int)line.size(), 0, (sockaddr*)&serv, sizeof(serv));
        if (sent == SOCKET_ERROR) {
            std::cerr << "sendto() failed\n";
            continue;
        }

        sockaddr_in from{};
        int fromLen = sizeof(from);
        char buf[BUFSIZE];
        int recvLen = recvfrom(sock, buf, BUFSIZE - 1, 0, (sockaddr*)&from, &fromLen);
        if (recvLen == SOCKET_ERROR) {
            std::cerr << "recvfrom() failed\n";
            continue;
        }
        buf[recvLen] = '\0';
        std::cout << "Server reply: " << buf << "\n";
    }

    closesocket(sock);
    WSACleanup();
    return 0;
}
