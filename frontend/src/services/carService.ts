import api from './api';

export const fetchCars = async () => {
  try {
    const response = await api.get('/cars');
    return response.data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};
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
