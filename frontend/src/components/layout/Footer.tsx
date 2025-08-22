import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Info, Users, Phone, Award } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Car className="h-6 w-6 text-primary-400 mr-2" />
            <span className="text-lg font-semibold">AutoMonitor</span>
          </div>
          
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
            <Link 
              to="/about" 
              className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Info className="h-4 w-4 mr-1" />
              <span>About the Project</span>
            </Link>
            
            <Link 
              to="/contact" 
              className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Phone className="h-4 w-4 mr-1" />
              <span>Contact Us</span>
            </Link>
            
            <Link 
              to="/team" 
              className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Users className="h-4 w-4 mr-1" />
              <span>Team Members</span>
            </Link>
            
            <Link 
              to="/acknowledgments" 
              className="flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Award className="h-4 w-4 mr-1" />
              <span>Acknowledgments</span>
            </Link>
          </nav>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Autonomous Car Monitoring System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;