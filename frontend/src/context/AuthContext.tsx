import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: string;
  username: string;
  isAdmin:boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('asdfadsfasxxx' , user , loading);
    const checkAuthStatus = async () => {
      try {
        const response = await api.get('/auth/me');
        console.log('asdfasdf' , response);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // const login = async (username: string, password: string) => {
  //   try {
  //     const response = await api.post('/auth/login', { username, password });
  //     setUser(response.data.user);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error('Login failed');
  //   }
  // };
  // src/services/authService.ts      
// const login = async (email: string, password: string) => {
//   const response = await api.post('/auth/login', {
//  email, password ,
//   });

//   const data = response.data;
//   if (!response.status) {
//     throw new Error(data.message || 'Login failed');
//   }

//   setUser(response.data.user)

//   return data; // { message: string, isAdmin: boolean }
// };
const login = async (email: string, password: string): Promise<boolean> => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    // Assuming a successful login returns 200 status or similar
    if (response.status === 200) {
      // You can also save tokens or user data here if needed
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // Login failed (e.g., 401 or network error)
    console.log(error);
    return false;
  }
};


  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};



// import React, { createContext, useContext, useState, useEffect } from 'react';
// import api from '../services/api';

// interface User {
//   id: string;
//   username: string;
//   isAdmin: boolean;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<{ message: string; isAdmin: boolean }>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await api.get('/auth/me');
//         setUser(response.data.user);
//       } catch (error) {
//         console.log(error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthStatus();
//   }, []);

//   const login = async (email: string, password: string) => {
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Login failed');
//     }

//     // Assuming backend returns at least userId and isAdmin in response
//     setUser({
//       id: data.userId || '',
//       username: email,
//       isAdmin: data.isAdmin,
//     });

//     return data;
//   };

//   const logout = async () => {
//     try {
//       await api.post('/auth/logout');
//       setUser(null);
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
