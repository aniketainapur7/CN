import { Link, useLocation } from 'react-router-dom';
import { BookOpen, ShoppingCart, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isLoggedIn] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <BookOpen className="h-8 w-8 text-amber-600 group-hover:text-amber-700 transition-colors" />
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                BookHaven
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  isActive('/') ? 'text-amber-600' : 'text-gray-700'
                }`}
              >
                Home
              </Link>
              <Link
                to="/catalogue"
                className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                  isActive('/catalogue') ? 'text-amber-600' : 'text-gray-700'
                }`}
              >
                Catalogue
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {isLoggedIn ? (
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-amber-600 transition-colors">
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline text-sm font-medium">Account</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-amber-500" />
                <span className="text-2xl font-bold text-white">BookHaven</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Your premier destination for discovering and collecting books from around the world.
                Quality literature delivered to your doorstep.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-amber-500 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/catalogue" className="hover:text-amber-500 transition-colors">
                    Catalogue
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-amber-500 transition-colors">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 BookHaven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
