//.....................MAIN........WORKING...........CODE.......................................................................................
//.....................MAIN........WORKING...........CODE.......................................................................................
//.....................MAIN........WORKING...........CODE.......................................................................................
//.....................MAIN........WORKING...........CODE.......................................................................................



// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CarData } from './CarDashboard';
// import { fetchLatestImage } from '../car/carService';

// const STORAGE_KEY = 'cars';

// const CarDetails: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const car: CarData = location.state?.car;

//   const [imageUrl, setImageUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (!car) return;

//     const loadImage = async () => {
//       try {
//         const url = await fetchLatestImage(); // pass car id
//         setImageUrl(url);
//       } catch (err) {
//         console.error('Failed to fetch image:', err);
//       }
//     };

//     loadImage();
//   }, [car]);

//   if (!car) {
//     return <p>No car data provided.</p>;
//   }

//   const handleBack = () => {
//     navigate(-1); // Go back to previous page (dashboard)
//   };

//   const handleDelete = () => {
//     if (!window.confirm(`Delete car ${car.carNumber}? This action cannot be undone.`)) {
//       return;
//     }

//     const storedCars = localStorage.getItem(STORAGE_KEY);
//     if (!storedCars) return;

//     const cars: CarData[] = JSON.parse(storedCars);
//     const updatedCars = cars.filter((c) => c.id !== car.id);

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//     navigate('/cars'); // or navigate(-1);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">Car Details - {car.carNumber}</h2>

//       <p><strong>Obstacle Detected:</strong> {car.hasObstacle ? 'Yes' : 'No'}</p>
//       {car.hasObstacle && car.obstacleDistance && (
//         <p><strong>Distance:</strong> {car.obstacleDistance} meters</p>
//       )}

//       <p className="mt-2"><strong>Location:</strong> {car.location.address}</p>
//       <p><strong>Coordinates:</strong> {car.location.latitude}, {car.location.longitude}</p>

//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt="Obstacle"
//           className="mt-4 rounded shadow w-full"
//         />
//       ) : (
//         <p className="mt-4">Loading image...</p>
//       )}

//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//         >
//           Back to Dashboard
//         </button>

//         <button
//           onClick={handleDelete}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Delete Car
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;




//........................................................END.................................................................
//........................................................END.................................................................
//........................................................END.................................................................
//........................................................END.................................................................


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CarData } from './CarDashboard';
// import { fetchLatestImage } from '../car/carService';

// const STORAGE_KEY = 'cars';

// const CarDetails: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const car: CarData = location.state?.car;

//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [obstacleDetected, setObstacleDetected] = useState<boolean>(false);

//   useEffect(() => {
//     if (!car) return;

//     const loadImage = async () => {
//       try {
//         const url = await fetchLatestImage(); // pass car id if needed
//         if (url) {
//           setImageUrl(url);
//           setObstacleDetected(true); // Show obstacle if image is present
//         }
//       } catch (err) {
//         console.error('Failed to fetch image:', err);
//       }
//     };

//     loadImage();
//   }, [car]);
//   const handleBack = () => {
//   navigate('/cars', { state: { refresh: true } });
// };

//   useEffect(() => {
//   if (!car) return;


//   const loadImage = async () => {
//     try {
//       const url = await fetchLatestImage(); // pass car id if needed
//       if (url) {
//         setImageUrl(url);
//         setObstacleDetected(true);

//         // Update car data in localStorage
//         const storedCars = localStorage.getItem(STORAGE_KEY);
//         if (storedCars) {
//           const cars: CarData[] = JSON.parse(storedCars);
//           const updatedCars = cars.map((c) =>
//             c.id === car.id ? { ...c, hasObstacle: true } : c
//           );
//           localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//         }
//       }
//     } catch (err) {
//       console.error('Failed to fetch image:', err);
//     }
//   };

//   loadImage();
// }, [car]);


//   const handleDelete = () => {
//     if (!window.confirm(`Delete car ${car.carNumber}? This action cannot be undone.`)) {
//       return;
//     }

//     const storedCars = localStorage.getItem(STORAGE_KEY);
//     if (!storedCars) return;

//     const cars: CarData[] = JSON.parse(storedCars);
//     const updatedCars = cars.filter((c) => c.id !== car.id);

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//     navigate('/cars'); // or navigate(-1);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">Car Details - {car.carNumber}</h2>

//       {/* Obstacle Detected if image is fetched */}
//       {obstacleDetected && (
//         <p className="text-red-600 font-semibold">
//           ⚠️ Obstacle Detected!
//         </p>
//       )}

//       {car.hasObstacle && car.obstacleDistance && (
//         <p><strong>Distance:</strong> {car.obstacleDistance} meters</p>
//       )}

//       <p className="mt-2"><strong>Location:</strong> {car.location.address}</p>
//       <p><strong>Coordinates:</strong> {car.location.latitude}, {car.location.longitude}</p>

//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt="Obstacle"
//           className="mt-4 rounded shadow w-full"
//         />
//       ) : (
//         <p className="mt-4">Loading image...</p>
//       )}

//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//         >
//           Back to Dashboard
//         </button>

//         <button
//           onClick={handleDelete}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Delete Car
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;

//*******************************************************************************************************************************************************


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CarData } from './CarDashboard';
// import { fetchLatestImage, LatestImageData } from '../car/carService';

// const STORAGE_KEY = 'cars';

// const CarDetails: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const car: CarData = location.state?.car;

//   const [imageData, setImageData] = useState<LatestImageData | null>(null);
//   const [obstacleDetected, setObstacleDetected] = useState(false);

//   useEffect(() => {
//     if (!car) return;

//     const loadImage = async () => {
//       try {
//         const data = await fetchLatestImage(); // you can pass carId if needed
//         if (data.imageUrl) {
//           setImageData(data);
//           setObstacleDetected(true);

//           // Update localStorage car data with obstacle presence
//           const storedCars = localStorage.getItem(STORAGE_KEY);
//           if (storedCars) {
//             const cars: CarData[] = JSON.parse(storedCars);
//             const updatedCars = cars.map((c) =>
//               c.id === car.id ? { ...c, hasObstacle: true } : c
//             );
//             localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//           }
//         }
//       } catch (err) {
//         console.error('Failed to fetch image:', err);
//       }
//     };

//     loadImage();
//   }, [car]);

//   const handleBack = () => {
//     navigate('/cars', { state: { refresh: true } });
//   };

//   const handleDelete = () => {
//     if (!window.confirm(`Delete car ${car.carNumber}? This action cannot be undone.`)) {
//       return;
//     }
//     const storedCars = localStorage.getItem(STORAGE_KEY);
//     if (!storedCars) return;

//     const cars: CarData[] = JSON.parse(storedCars);
//     const updatedCars = cars.filter((c) => c.id !== car.id);

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//     navigate('/cars'); // or navigate(-1);
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">Car Details - {car.carNumber}</h2>

//       {obstacleDetected && (
//         <p className="text-red-600 font-semibold">⚠️ Obstacle Detected!</p>
//       )}

//       {car.hasObstacle && car.obstacleDistance && (
//         <p><strong>Distance:</strong> {car.obstacleDistance} meters</p>
//       )}

//       <p className="mt-2"><strong>Location:</strong> {car.location.address}</p>
//       <p><strong>Coordinates:</strong> {car.location.latitude}, {car.location.longitude}</p>

//       {imageData ? (
//         <>
//           <img
//             src={imageData.imageUrl}
//             alt="Obstacle"
//             className="mt-4 rounded shadow w-full"
//           />
//           <p className="mt-2 text-gray-600">
//             Detected at: {new Date(imageData.timestamp).toLocaleString()}
//           </p>
//         </>
//       ) : (
//         <p className="mt-4">Loading image...</p>
//       )}

//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//         >
//           Back to Dashboard
//         </button>

//         <button
//           onClick={handleDelete}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Delete Car
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;

//*************************************************************LAST WORKING CODE*************************************************************************** */

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CarData } from './CarDashboard';
// import { fetchLatestImage, LatestImageData } from '../car/carService';

// const STORAGE_KEY = 'cars';

// const CarDetails: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const car: CarData = location.state?.car;

//   const [imageData, setImageData] = useState<LatestImageData | null>(null);
//   const [obstacleDetected, setObstacleDetected] = useState(false);

//   useEffect(() => {
//     if (!car) return;

//     const loadImage = async () => {
//       try {
//         const data = await fetchLatestImage(); // data includes carId now
//         if (data.imageUrl) {
//           setImageData(data);
//           setObstacleDetected(true);

//           // Update localStorage car data with obstacle presence
//           const storedCars = localStorage.getItem(STORAGE_KEY);
//           if (storedCars) {
//             const cars: CarData[] = JSON.parse(storedCars);
//             const updatedCars = cars.map((c) =>
//               c.id === car.id ? { ...c, hasObstacle: true } : c
//             );
//             localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//           }
//         }
//       } catch (err) {
//         console.error('Failed to fetch image:', err);
//       }
//     };

//     loadImage();
//   }, [car]);

//   const handleBack = () => {
//     navigate('/cars', { state: { refresh: true } });
//   };

//   const handleDelete = () => {
//     if (!window.confirm(`Delete car ${car.carNumber}? This action cannot be undone.`)) {
//       return;
//     }
//     const storedCars = localStorage.getItem(STORAGE_KEY);
//     if (!storedCars) return;

//     const cars: CarData[] = JSON.parse(storedCars);
//     const updatedCars = cars.filter((c) => c.id !== car.id);

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//     navigate('/cars');
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">Car Details - {car.carNumber}</h2>

//       {obstacleDetected && (
//         <p className="text-red-600 font-semibold">⚠️ Obstacle Detected!</p>
//       )}

//       {car.hasObstacle && car.obstacleDistance && (
//         <p><strong>Distance:</strong> {car.obstacleDistance} meters</p>
//       )}

//       <p className="mt-2"><strong>Location:</strong> {car.location.address}</p>
//       <p><strong>Coordinates:</strong> {car.location.latitude}, {car.location.longitude}</p>

//       {imageData ? (
//         <>
//           <p className="mt-4"><strong>Detected Car ID:</strong> {imageData.carId}</p>
//           <img
//             src={imageData.imageUrl}
//             alt="Obstacle"
//             className="mt-4 rounded shadow w-full"
//           />
//           <p className="mt-2 text-gray-600">
//             Detected at: {new Date(imageData.timestamp).toLocaleString()}
//           </p>
//         </>
//       ) : (
//         <p className="mt-4">Loading image...</p>
//       )}

//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//         >
//           Back to Dashboard
//         </button>

//         <button
//           onClick={handleDelete}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Delete Car
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CarData } from './CarDashboard';
// import { fetchLatestImage, LatestImageData } from '../car/carService';

// const STORAGE_KEY = 'cars';

// const CarDetails: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const car: CarData = location.state?.car;

//   const [imageData, setImageData] = useState<LatestImageData | null>(null);
//   const [obstacleDetected, setObstacleDetected] = useState(false);

//   useEffect(() => {
//     if (!car) return;

//     const loadImage = async () => {
//       try {
//         // Fetch latest image regardless of carId
//         const data = await fetchLatestImage(car.id);

//         if (data.imageUrl && data.hasObstacle) {
//           setImageData(data);
//           setObstacleDetected(data.hasObstacle);
//           console.log('obstacleDetected state set to:', data.hasObstacle);

//           // Update localStorage obstacle status for this car
//           const storedCars = localStorage.getItem(STORAGE_KEY);
//           if (storedCars) {
//             const cars: CarData[] = JSON.parse(storedCars);
//             const updatedCars = cars.map((c) =>
//               c.id === car.id ? { ...c, hasObstacle: data.hasObstacle } : c
//             );
//             localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//           }
//         } else {
//           // No obstacle or no image
//           setImageData(null);
//           setObstacleDetected(false);
//         }
//       } catch (err) {
//         console.error('Failed to fetch image:', err);
//         setImageData(null);
//         setObstacleDetected(false);
//       }
//     };

//     loadImage();
//   }, [car]);

//   const handleBack = () => {
//     navigate('/cars', { state: { refresh: true } });
//   };

//   const handleDelete = () => {
//     if (!window.confirm(`Delete car ${car.carNumber}? This action cannot be undone.`)) {
//       return;
//     }
//     const storedCars = localStorage.getItem(STORAGE_KEY);
//     if (!storedCars) return;

//     const cars: CarData[] = JSON.parse(storedCars);
//     const updatedCars = cars.filter((c) => c.id !== car.id);

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//     navigate('/cars');
//   };

//   if (!car) {
//     return (
//       <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//         <p>No car data available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">Car Details - {car.carNumber}</h2>

//       {obstacleDetected && (
//         <p className="text-red-600 font-semibold">⚠️ Obstacle Detected!</p>
//       )}

//       {obstacleDetected && car.obstacleDistance && (
//         <p><strong>Distance:</strong> {car.obstacleDistance} meters</p>
//       )}

//       <p className="mt-2"><strong>Location:</strong> {car.location.address}</p>
//       <p><strong>Coordinates:</strong> {car.location.latitude}, {car.location.longitude}</p>

//       {/* Show image only if obstacle detected and image data exists */}
//       {obstacleDetected && imageData ? (
//         <>
//           <p className="mt-4"><strong>Detected Car ID:</strong> {imageData.carId}</p>
//           <p className="mt-4">
//             Detected at: {new Date(imageData.timestamp).toLocaleString()}
//           </p>
//           <img
//             src={imageData.imageUrl}
//             alt="Obstacle"
//             className="mt-4 rounded shadow w-full"
//           />
          
//         </>
//       ) : (
//         <p className="mt-4">No obstacle image available.</p>
//       )}

//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//         >
//           Back to Dashboard
//         </button>

//         <button
//           onClick={handleDelete}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Delete Car
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CarData } from './CarDashboard';
// import { fetchLatestImage, LatestImageData } from '../car/carService';

// const STORAGE_KEY = 'cars';

// const CarDetails: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const carNumber: string | undefined = location.state?.carNumber;

//   const [car, setCar] = useState<CarData | null>(null);
//   const [imageData, setImageData] = useState<LatestImageData | null>(null);
//   const [obstacleDetected, setObstacleDetected] = useState(false);

//   useEffect(() => {
//     if (!carNumber) return;

//     const storedCars = localStorage.getItem(STORAGE_KEY);
//     if (storedCars) {
//       const cars: CarData[] = JSON.parse(storedCars);
//       const foundCar = cars.find((c) => c.carNumber === carNumber);
//       if (foundCar) {
//         setCar(foundCar);
//       }
//     }
//   }, [carNumber]);

//   useEffect(() => {
//   if (!car) return;

//   const loadImage = async () => {
//     try {
//       const data = await fetchLatestImage(car.carNumber);  // use carNumber here

//       if (data.imageUrl && data.hasObstacle) {
//         setImageData(data);
//         setObstacleDetected(data.hasObstacle);
//         // Update localStorage etc...
//       } else {
//         setImageData(null);
//         setObstacleDetected(false);
//       }
//     } catch (err) {
//       console.error('Failed to fetch image:', err);
//       setImageData(null);
//       setObstacleDetected(false);
//     }
//   };

//   loadImage();
// }, [car]);


//   const handleBack = () => {
//     navigate('/cars', { state: { refresh: true } });
//   };

//   const handleDelete = () => {
//     if (!car || !window.confirm(`Delete car ${car.carNumber}? This action cannot be undone.`)) {
//       return;
//     }

//     const storedCars = localStorage.getItem(STORAGE_KEY);
//     if (!storedCars) return;

//     const cars: CarData[] = JSON.parse(storedCars);
//     const updatedCars = cars.filter((c) => c.id !== car.id);

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//     navigate('/cars');
//   };

//   if (!car) {
//     return (
//       <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//         <p>Car data not found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
//       <h2 className="text-2xl font-bold mb-4">Car Details - {car.carNumber}</h2>

//       {obstacleDetected && (
//         <p className="text-red-600 font-semibold">⚠️ Obstacle Detected!</p>
//       )}

//       {obstacleDetected && car.obstacleDistance && (
//         <p><strong>Distance:</strong> {car.obstacleDistance} meters</p>
//       )}

//       <p className="mt-2"><strong>Location:</strong> {car.location.address}</p>
//       <p><strong>Coordinates:</strong> {car.location.latitude}, {car.location.longitude}</p>

//       {obstacleDetected && imageData ? (
//         <>
//           <p className="mt-4"><strong>Detected Car ID:</strong> {imageData.carId}</p>
//           <p>Detected at: {new Date(imageData.timestamp).toLocaleString()}</p>
//           <img
//             src={imageData.imageUrl}
//             alt="Obstacle"
//             className="mt-4 rounded shadow w-full"
//           />
//         </>
//       ) : (
//         <p className="mt-4">No obstacle image available.</p>
//       )}

//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={handleBack}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//         >
//           Back to Dashboard
//         </button>
//         <button
//           onClick={handleDelete}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Delete Car
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CarData } from './CarDashboard';
import { fetchLatestImage, LatestImageData } from '../car/carService';
import { deleteCarFromBackend } from '../car/carService';

const STORAGE_KEY = 'cars';

const CarDetails: React.FC = () => {
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
    navigate('/cars', { state: { refresh: true } });
  };

  // const handleDelete = () => {
  //   if (!car || !window.confirm(`Delete car ${car.carNumber}? This action cannot be undone.`)) {
  //     return;
  //   }

  //   const storedCars = localStorage.getItem(STORAGE_KEY);
  //   if (!storedCars) return;

  //   const cars: CarData[] = JSON.parse(storedCars);
  //   const updatedCars = cars.filter((c) => c.id !== car.id);

  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  //   navigate('/cars');
  // };
 // adjust path if needed

const handleDelete = async () => {
  if (!car || !window.confirm(`Delete car ${car.carNumber}? This action cannot be undone.`)) {
    return;
  }

  try {
    // Call backend delete
    await deleteCarFromBackend(car.carNumber);

    // Remove from localStorage
    const storedCars = localStorage.getItem(STORAGE_KEY);
    if (storedCars) {
      const cars: CarData[] = JSON.parse(storedCars);
      const updatedCars = cars.filter((c) => c.id !== car.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
    }

    navigate('/cars');
  } catch (error) {
    console.error('Delete failed:', error);
    alert(`Failed to delete car: ${(error as Error).message}`);
  }
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
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Delete Car
        </button>
      </div>
    </div>
  );
};

export default CarDetails;
