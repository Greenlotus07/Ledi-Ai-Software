import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Users, User, DollarSign, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <header className="bg-black bg-opacity-30 backdrop-blur-md">
      <div className="container mx-auto px-1 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Music className="w-8 h-8 text-pink-500" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Ledi AI
          </span>
        </Link>
        <nav>
          <ul className="flex space-x-1">
            <li>
              <Link to="/studio" className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                <Music className="w-4 h-4" />
                <span>Studio</span>
              </Link>
            </li>
            <li>
              <Link to="/community" className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                <Users className="w-4 h-4" />
                <span>Community</span>
              </Link>
            </li>
            {currentUser && (
              <li>
                <Link to="/profile" className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
              </li>
            )}
            <li>
              <Link to="/pricing" className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                <DollarSign className="w-4 h-4" />
                <span>Pricing</span>
              </Link>
            </li>
            {currentUser ? (
              <li>
                <button onClick={handleLogout} className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login" className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
