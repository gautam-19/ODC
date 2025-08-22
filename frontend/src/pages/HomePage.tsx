import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import CarDashboard from '../components/car/CarDashboard';
import { Car } from 'lucide-react';
import ReadOnlyCarDashboard from '../components/car/userCarDashBoard';

const HomePage: React.FC = () => {
  const { isAuthenticated , user } = useAuth();

  return (
    <div className="py-8">
      {!isAuthenticated ? (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-primary-100 rounded-full flex items-center justify-center">
                <Car className="h-8 w-8 text-primary-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Autonomous Car Monitoring System
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time monitoring and tracking for autonomous vehicle fleets. 
              Please login to access the monitoring dashboard.
            </p>
          </div>
          <LoginForm />
        </div>
      ) : (user?.isAdmin ? (
        <CarDashboard />
      ) : <ReadOnlyCarDashboard />)}
    </div>
  );
};

export default HomePage;