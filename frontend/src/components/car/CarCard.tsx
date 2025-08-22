// import React, { useState } from 'react';
// import { MapPin } from 'lucide-react';

// export interface CarData {
//   id: string;
//   carNumber: string;
//   isActive: boolean;
//   hasObstacle: boolean;
//   obstacleDistance?: number;
//   obstacleImage?: string;
//   location: {
//     latitude: number;
//     longitude: number;
//     address: string;
//   };
// }

// interface CarCardProps {
//   car: CarData;
// }

// const CarCard: React.FC<CarCardProps> = ({ car }) => {
//   const [showImage, setShowImage] = useState(true);

//   const toggleImage = () => setShowImage((prev) => !prev);

//   return (
//     <div className="card transition-all duration-300 hover:translate-y-[-5px] p-6 border rounded-md shadow-md max-w-md">
//       <h3 className="text-xl font-semibold mb-4">Car #{car.carNumber}</h3>

//       {/* Only show obstacle image button if there is an obstacle and image */}
//       {car.hasObstacle && car.obstacleImage && (
//         <>
//           <button
//             onClick={toggleImage}
//             className="mb-2 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
//           >
//             {showImage ? 'Hide Obstacle' : 'View Obstacle'}
            
//           </button>
//           {showImage && (
//             // <img
//             //   src={car.obstacleImage}
//             //   alt="Obstacle"
//             //   className="w-full h-auto rounded-lg border"
//             //   loading="lazy"
//             //   onError={(e) => {
//             //     (e.target as HTMLImageElement).src = '/no-image.png'; // fallback image
//             //   }}
//             // />
//             <img
//   src={`http://localhost:5000${car.obstacleImage}`}
//   alt="Obstacle"
//   className="w-full h-auto rounded-lg border"
//   loading="lazy"
//   onError={(e) => {
//     (e.target as HTMLImageElement).src = '/no-image.png';
//   }}
// />
//           )}
          
//         </>
//       )}

//       {/* Optional: If no obstacle or image */}
//       {!car.hasObstacle && <p>No obstacle detected.</p>}
//       {car.hasObstacle && !car.obstacleImage && <p>Obstacle detected but no image available.</p>}

//       {/* Car location button */}
//       <button
//         onClick={() => window.open(`https://www.google.com/maps?q=${car.location.latitude},${car.location.longitude}`, '_blank')}
//         className="mt-4 flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
//       >
//         <MapPin className="h-5 w-5 mr-2 text-primary-500" />
//         <div className="text-left">
//           <p className="text-sm font-medium text-gray-700">Car Location:</p>
//           <p className="text-base text-primary-600 truncate">
//             {car.location?.address ?? 'Location unknown'}
//           </p>
//         </div>
//       </button>
//     </div>
//   );
// };

// export default CarCard;

 //--------------------------------------------------------------------------------------------------------------------------------->

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export interface CarData {
  id: string;
  carNumber: string;
  isActive: boolean;
  hasObstacle: boolean;
  obstacleDistance?: number;
  obstacleImage?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

interface CarCardProps {
  car: CarData;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <div
      onClick={toggleDetails}
      className="card cursor-pointer transition-all duration-300 hover:shadow-lg p-6 border rounded-md shadow max-w-md"
    >
      <h3 className="text-xl font-semibold mb-2">Car #{car.carNumber}</h3>

      {showDetails && (
        <>
          {/* Obstacle info */}
          {car.hasObstacle ? (
            car.obstacleImage ? (
              <img
                src={car.obstacleImage}
                alt="Obstacle"
                className="w-full h-auto rounded-lg border mb-2"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/no-image.png';
                }}
              />
            ) : (
              <p className="mb-2">Obstacle detected but no image available.</p>
            )
          ) : (
            <p className="mb-2">No obstacle detected.</p>
          )}

          {/* Location info */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent collapsing when clicking button
              window.open(
                `https://www.google.com/maps?q=${car.location.latitude},${car.location.longitude}`,
                '_blank'
              );
            }}
            className="flex items-center p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <MapPin className="h-5 w-5 mr-2 text-primary-500" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-700">Car Location:</p>
              <p className="text-base text-primary-600 truncate">
                {car.location?.address ?? 'Location unknown'}
              </p>
            </div>
          </button>
        </>
      )}
    </div>
  );
};

export default CarCard;
//-------------------------------------------------------------------------------------------------------------------
// import React, { useState } from 'react';
// import { MapPin, Eye, AlertTriangle, CameraOff } from 'lucide-react';

// export interface CarData {
//   id: string;
//   carNumber: string;
//   isActive: boolean;
//   hasObstacle: boolean;
//   obstacleDistance?: number;
//   obstacleImage?: string;
//   lastUpdated?: string; // ISO string
//   location: {
//     latitude: number;
//     longitude: number;
//     address: string;
//   };
// }

// interface CarCardProps {
//   car: CarData;
// }

// const CarCard: React.FC<CarCardProps> = ({ car }) => {
//   const [showImage, setShowImage] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);

//   const toggleDetails = () => setShowDetails((prev) => !prev);
//   const toggleImage = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setShowImage((prev) => !prev);
//   };

//   const carNumberDisplay =
//     car.carNumber || `unknown_${car.id.split('-')[1] || Date.now()}`;
//   const isRecent =
//     car.lastUpdated &&
//     Date.now() - new Date(car.lastUpdated).getTime() < 10 * 1000;

//   return (
//     <div
//       onClick={toggleDetails}
//       className="card bg-white cursor-pointer transition-all duration-300 hover:shadow-lg p-6 border rounded-2xl shadow-lg max-w-md"
//     >
//       <h3 className="text-xl font-bold text-primary-700 mb-2">
//         Car #{carNumberDisplay}
//       </h3>

//       <p className="text-sm mb-2">
//         Status:{' '}
//         <span
//           className={`font-semibold ${
//             isRecent && car.isActive ? 'text-green-600' : 'text-gray-500'
//           }`}
//         >
//           {isRecent && car.isActive ? 'Active' : 'Inactive'}
//         </span>
//       </p>

//       <p className="text-sm mb-4">
//         Obstacle:{' '}
//         {isRecent && car.hasObstacle ? (
//           <span className="text-red-600 font-semibold">Detected</span>
//         ) : (
//           <span className="text-gray-500">No obstacle</span>
//         )}
//       </p>

//       {showDetails && (
//         <div className="mt-4 space-y-3">
//           {isRecent && car.hasObstacle ? (
//             <>
//               <button
//                 onClick={toggleImage}
//                 className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 font-medium rounded-md hover:bg-red-200 transition"
//               >
//                 <Eye className="h-5 w-5 mr-2" />
//                 {showImage ? 'Hide' : 'View'} Obstacle
//               </button>

//               {showImage && car.obstacleImage ? (
//                 <img
//                   src={car.obstacleImage}
//                   alt="Obstacle"
//                   className="w-full rounded-lg shadow border"
//                   loading="lazy"
//                   onError={(e) => {
//                     (e.target as HTMLImageElement).src = '/no-image.png';
//                   }}
//                 />
//               ) : (
//                 showImage && (
//                   <div className="text-sm text-gray-400 flex items-center gap-2">
//                     <CameraOff className="h-4 w-4" /> No image found.
//                   </div>
//                 )
//               )}
//             </>
//           ) : (
//             <div className="text-sm text-gray-500 flex items-center gap-2">
//               <AlertTriangle className="h-4 w-4" /> No obstacle data available.
//             </div>
//           )}

//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               window.open(
//                 `https://www.google.com/maps?q=${car.location.latitude},${car.location.longitude}`,
//                 '_blank'
//               );
//             }}
//             className="flex items-center p-2 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
//           >
//             <MapPin className="h-5 w-5 mr-2 text-blue-500" />
//             <div className="text-left text-sm">
//               <p className="font-medium text-gray-700">Location</p>
//               <p className="text-gray-600 truncate">
//                 {car.location?.address || 'Unknown'}
//               </p>
//             </div>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CarCard;
