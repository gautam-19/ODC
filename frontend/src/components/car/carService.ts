
export interface LatestImageData {
  carId: string;
  carNumber: string;
  imageUrl: string;
  timestamp: string;
  hasObstacle: boolean;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

const BASE_URL = 'http://localhost:5000'; // Replace with actual base URL
// export async function fetchLatestImage(carNumber: string): Promise<LatestImageData> {
//   const url = `${BASE_URL}/api/cars/image-by-car-number/${encodeURIComponent(carNumber)}`;
//   console.log(url);

//   try {
//     const response = await fetch(url);

//     if (response.status === 404) {
//       // No image or car not found
//       return {
//         carId: '',
//         carNumber,
//         imageUrl: '',
//         timestamp: '',
//         hasObstacle: false,
//         location: { latitude: 0, longitude: 0, address: 'Unknown' },
//       };
//     }

//     if (!response.ok) {
//       throw new Error('Failed to fetch image for carNumber: ' + carNumber);
//     }

//     const data = await response.json();

//     return {
//       carId: data.carId,
//       carNumber: data.carNumber,
//       imageUrl: BASE_URL + data.imageUrl,
//       timestamp: data.timestamp,
//       hasObstacle: data.hasObstacle,
//       location: data.location,
//     };
//   } catch (error) {
//     console.error('fetchLatestImage error:', error);
//     // Gracefully return a fallback object
//     return {
//       carId: '',
//       carNumber,
//       imageUrl: '',
//       timestamp: '',
//       hasObstacle: false,
//       location: { latitude: 0, longitude: 0, address: 'Unknown' },
//     };
//   }
// }


export async function addCarToBackend(car: {
  carNumber: string;
  hostName: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
}) {
  const response = await fetch(`${BASE_URL}/api/cars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    throw new Error('Failed to save car to backend');
  }

  return await response.json();
}


export async function deleteCarFromBackend(carNumber: string) {
  const response = await fetch(`${BASE_URL}/api/cars/${carNumber}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete car');
  }

  return await response.json();
}
export const login = async (username: string, password: string) => {
  const response = await fetch('/api/authRoutes/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data; // { message: string, user: { id, username, isAdmin } }
};
async function updateObstacleStatus(carNumber: string, obstacleDetected: boolean) {
  const response = await fetch(`${BASE_URL}/api/cars/${carNumber}/obstacle-status`, {
    method: 'PATCH', // or PUT, depending on your API http://localhost:5000/api/cars/123/obstacle-status
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ obstacleDetected }),
  });

  if (!response.ok) {
    console.error(`Failed to update obstacle status for carId: ${carNumber}`);
  }
};
export async function fetchLatestImage(carNumber: string): Promise<LatestImageData> {
  const url = `${BASE_URL}/api/cars/image-by-car-number/${encodeURIComponent(carNumber)}`;
  console.log(url);

  try {
    const response = await fetch(url);

    if (response.status === 404) {
      return {
        carId: '',
        carNumber,
        imageUrl: '',
        timestamp: '',
        hasObstacle: false,
        location: { latitude: 0, longitude: 0, address: 'Unknown' },
      };
    }

    if (!response.ok) {
      throw new Error('Failed to fetch image for carNumber: ' + carNumber);
    }

    const data = await response.json();

    // 🔔 If an obstacle is detected, update the database
    if (data.hasObstacle) {
      await updateObstacleStatus(data.carNumber, true);
    }

    return {
      carId: data.carId,
      carNumber: data.carNumber,
      imageUrl: BASE_URL + data.imageUrl,
      timestamp: data.timestamp,
      hasObstacle: data.hasObstacle,
      location: data.location,
    };
  } catch (error) {
    console.error('fetchLatestImage error:', error);
    return {
      carId: '',
      carNumber,
      imageUrl: '',
      timestamp: '',
      hasObstacle: false,
      location: { latitude: 0, longitude: 0, address: 'Unknown' },
    };
  }
}


