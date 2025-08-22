import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Car, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Car className="h-6 w-6 text-primary-500 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">
              Autonomous Car Monitoring System
            </h1>
          </div>
          
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-primary-500 transition-colors duration-200"
            >
              <span className="mr-2">Logout</span>
              <LogOut className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;