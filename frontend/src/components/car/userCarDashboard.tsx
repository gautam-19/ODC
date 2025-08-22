

// export default CarDashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import {addCarToBackend } from '../car/carService'; // adjust path

export interface CarData {
  id: string;
  carNumber: string;
  hostName: string;
  hasObstacle: boolean;
  obstacleDistance?: number;
  obstacleImage?: string;
  obstacleDetected: boolean; 
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

const STORAGE_KEY = 'cars';

const UserCarDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarData[]>([]);
  // const [showModal, setShowModal] = useState(false);
  // const [formData, setFormData] = useState({
  //   carNumber: '',
  //   hostName: '',
  //   address: '',
  // });

  const loadCars = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCars(JSON.parse(stored));
    }
  };

  useEffect(() => {
    loadCars();
    window.addEventListener('focus', loadCars);
    return () => window.removeEventListener('focus', loadCars);
  }, []);

  const handleCardClick = (carNumber: string) => {
    navigate('/user-car-details', { state: { carNumber } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Car Dashboard</h1>
 
      </div>

      {cars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <div
          className="grid grid-cols-4 gap-4 max-w-full overflow-x-auto p-2"
          style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
        >
          {cars.map((car) => 
          {
            console.log('asdfasdfasdfasdd',car);
            return (
            <div
              key={car.id}
              onClick={() => handleCardClick(car.carNumber)}
              className="bg-white p-4 rounded shadow hover:bg-blue-50 cursor-pointer transition"
              style={{ minWidth: '12rem' }}
            >
              <h2 className="text-xl font-semibold truncate">{car.carNumber}</h2>
              <p className="truncate">{car.hostName}</p>
              <p>{car.obstacleDetected ? 'Obstacle Detected' : 'No Obstacles'}</p>
            </div>
          )}
          
          )}
        </div>
      )}

    </div>
  );
};

export default UserCarDashboard;
