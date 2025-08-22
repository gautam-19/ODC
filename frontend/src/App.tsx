import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TeamPage from "./pages/TeamPage";
import AcknowledgmentsPage from "./pages/AcknowledgmentsPage";
import { useAuth } from "./context/AuthContext";
import CarDetails from './components/car/CarDetails';
import CarDashboard from './components/car/CarDashboard';
import UserCarDetails from './components/car/userCarDetails';
import UserCarDashboard from "./components/car/userCarDashBoard";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-6 container-padding">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<CarDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/acknowledgments" element={<AcknowledgmentsPage />} />
          <Route path="/car-details" element={<CarDetails />} />
          <Route path="/user-car-details" element={<UserCarDetails/>}/>
          <Route path="/user-car-dashboard" element={<UserCarDashboard/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
