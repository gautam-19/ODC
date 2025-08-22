import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CarData } from './CarDashboard';
import { fetchLatestImage, LatestImageData } from '../car/carService';

const STORAGE_KEY = 'cars';

const UserCarDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const carNumber: string | undefined = location.state?.carNumber;

  const [car, setCar] = useState<CarData | null>(null);
  const [imageData, setImageData] = useState<LatestImageData | null>(null);

  useEffect(() => {
    if (!carNumber) return;

    const storedCars = localStorage.getItem(STORAGE_KEY);
    if (storedCars) {
      const cars: CarData[] = JSON.parse(storedCars);
      const foundCar = cars.find((c) => c.carNumber === carNumber);
      if (foundCar) {
        setCar(foundCar);
      }
    }
  }, [carNumber]);

  useEffect(() => {
    if (!car) return;

    const loadImage = async () => {
      try {
        const data = await fetchLatestImage(car.carNumber);
        if (data.imageUrl) {
          setImageData(data);

          // Optional: update car data in localStorage
          const storedCars = localStorage.getItem(STORAGE_KEY);
          if (storedCars) {
            const cars: CarData[] = JSON.parse(storedCars);
            const updatedCars = cars.map(c =>
              c.id === car.id ? { ...c, obstacleDetected: data.hasObstacle } : c
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
          }
        } else {
          setImageData(null);
        }
      } catch (err) {
        console.error('Failed to fetch image:', err);
        setImageData(null);
      }
    };

    loadImage();
  }, [car]);

  const handleBack = () => {
    navigate('/user-car-dashboard', { state: { refresh: true } });
  };

  if (!car) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <p>Car data not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">Car Details - {car.carNumber}</h2>

      <p className="mt-2"><strong>Location:</strong> {car.location.address}</p>
      <p><strong>Coordinates:</strong> {car.location.latitude}, {car.location.longitude}</p>

      {imageData ? (
        <>
          {imageData.hasObstacle ? (
            <>
              <p className="text-red-600 font-semibold mt-4">⚠️ Obstacle Detected!</p>
              {car.obstacleDistance && (
                <p><strong>Distance:</strong> {car.obstacleDistance} meters</p>
              )}
              <p className="mt-4"><strong>Detected Car ID:</strong> {imageData.carId}</p>
              <p>Detected at: {new Date(imageData.timestamp).toLocaleString()}</p>
              <img
                src={imageData.imageUrl}
                alt="Obstacle"
                className="mt-4 rounded shadow w-full"
              />
            </>
          ) : (
            <>
              <p className="mt-4 text-green-600 font-semibold">✅ No obstacle detected.</p>
            </>
          )}
        </>
      ) : (
        <p className="mt-4">No image data available.</p>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back to Dashboard
        </button>
        
      </div>
    </div>
  );
};

export default UserCarDetails;
