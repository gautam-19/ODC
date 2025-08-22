
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export interface CarData {
//   id: string; // Unique identifier
//   carNumber: string;
//   hostName?: string;
//   hasObstacle: boolean;
//   obstacleDistance?: number;
//   obstacleImage?: string;
//   location: {
//     address: string;
//     latitude: number;
//     longitude: number;
//   };
// }

// const STORAGE_KEY = 'cars';

// const CarDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const [cars, setCars] = useState<CarData[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     carNumber: '',
//     hostName: '',
//     address: '',
//   });

//   const loadCars = () => {
//     const stored = localStorage.getItem(STORAGE_KEY);
//     if (stored) {
//       setCars(JSON.parse(stored));
//     }
//   };

//   useEffect(() => {
//     loadCars();
//     window.addEventListener('focus', loadCars);
//     return () => window.removeEventListener('focus', loadCars);
//   }, []);

//   const openModal = () => setShowModal(true);
//   const closeModal = () => {
//     setShowModal(false);
//     setFormData({ carNumber: '', hostName: '', address: '' });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const addCar = () => {
//     const { carNumber, hostName, address } = formData;
//     if (!carNumber || !hostName || !address) {
//       alert('All fields are required.');
//       return;
//     }

//     const exists = cars.some(
//       (car) => car.carNumber.toLowerCase() === carNumber.toLowerCase()
//     );
//     if (exists) {
//       alert(`Car number "${carNumber}" already exists. Please use a different car number.`);
//       return;
//     }

//     const newCar: CarData = {
//       id: Date.now().toString(),
//       carNumber,
//       hostName,
//       hasObstacle: true,
//       location: {
//         address,
//         latitude: 0,
//         longitude: 0,
//       },
//     };

//     const updatedCars = [...cars, newCar];
//     setCars(updatedCars);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
//     closeModal();
//   };

//   const handleCardClick = (car: CarData) => {
//     navigate('/car-details', { state: { car } });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Car Dashboard</h1>
//         <button onClick={openModal} className="bg-blue-600 text-white px-4 py-2 rounded">
//           + Add Car
//         </button>
//       </div>

//       {cars.length === 0 ? (
//         <p>No cars found.</p>
//       ) : (
//         <div
//           className="grid grid-cols-4 gap-4 max-w-full overflow-x-auto p-2"
//           style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
//         >
//           {cars.map((car) => (
//             <div
//               key={car.id}
//               onClick={() => handleCardClick(car)}
//               className="bg-white p-4 rounded shadow hover:bg-blue-50 cursor-pointer transition"
//               style={{ minWidth: '12rem' }}
//             >
//               <h2 className="text-xl font-semibold truncate">{car.carNumber}</h2>
//               <p className="truncate">{car.hostName}</p>
//               <p>{car.hasObstacle ? 'Obstacle Detected' : 'No Obstacles'}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//             <h2 className="text-lg font-bold mb-4">Add New Car</h2>
//             <input
//               type="text"
//               name="carNumber"
//               placeholder="Car Number"
//               value={formData.carNumber}
//               onChange={handleChange}
//               className="w-full mb-2 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="hostName"
//               placeholder="Host Name"
//               value={formData.hostName}
//               onChange={handleChange}
//               className="w-full mb-2 p-2 border rounded"
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Car Location"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full mb-2 p-2 border rounded"
//             />
//             <div className="flex justify-end space-x-2 mt-4">
//               <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
//                 Cancel
//               </button>
//               <button onClick={addCar} className="px-4 py-2 bg-green-600 text-white rounded">
//                 Add
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarDashboard;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {addCarToBackend } from '../car/carService'; // adjust path

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

const CarDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<CarData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    carNumber: '',
    hostName: '',
    address: '',
  });

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

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setFormData({ carNumber: '', hostName: '', address: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const addCar = () => {
  //   const { carNumber, hostName, address } = formData;
  //   if (!carNumber || !hostName || !address) {
  //     alert('All fields are required.');
  //     return;
  //   }

  //   const exists = cars.some(
  //     (car) => car.carNumber.toLowerCase() === carNumber.toLowerCase()
  //   );
  //   if (exists) {
  //     alert(`Car number "${carNumber}" already exists. Please use a different car number.`);
  //     return;
  //   }

  //   const newCar: CarData = {
  //     id: Date.now().toString(),
  //     carNumber,
  //     hostName,
  //     hasObstacle: true,
  //     location: {
  //       address,
  //       latitude: 0,
  //       longitude: 0,
  //     },
  //   };

  //   const updatedCars = [...cars, newCar];
  //   setCars(updatedCars);
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  //   closeModal();
  // };
 // Create this helper if not present

const addCar = async () => {
  const { carNumber, hostName, address } = formData;
  if (!carNumber || !hostName || !address) {
    alert('All fields are required.');
    return;
  }

  const exists = cars.some(car => car.carNumber.toLowerCase() === carNumber.toLowerCase());
  if (exists) {
    alert(`Car number "${carNumber}" already exists. Please use a different car number.`);
    return;
  }

  const newCar = {
    carNumber,
    hostName,
    location: {
      address,
      latitude: 0,
      longitude: 0,
    },
  };

  try {
    const response = await addCarToBackend(newCar);
    const savedCar = response.car;

    const updatedCars = [...cars, {
      ...savedCar,
      id: savedCar._id,
      hasObstacle: false,
    }];
    setCars(updatedCars);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
    closeModal();
  } catch (error) {
    console.error(error);
    alert('Failed to add car. Please try again.');
  }
};



  const handleCardClick = (carNumber: string) => {
    navigate('/car-details', { state: { carNumber } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Car Dashboard</h1>
        <button onClick={openModal} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Car
        </button>
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Add New Car</h2>
            <input
              type="text"
              name="carNumber"
              placeholder="Car Number"
              value={formData.carNumber}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              name="hostName"
              placeholder="Host Name"
              value={formData.hostName}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Car Location"
              value={formData.address}
              onChange={handleChange}
              className="w-full mb-2 p-2 border rounded"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>
              <button onClick={addCar} className="px-4 py-2 bg-green-600 text-white rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDashboard;
