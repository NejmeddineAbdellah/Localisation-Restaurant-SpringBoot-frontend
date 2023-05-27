import './App.css';
import { Header, Footer } from './component/Layout';
import Specilaitelist from './component/Specialitelist';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Villelist from './component/Villelist';
import ZoneList from './component/Zonelist';
import SerieList from './component/Serielist';
import RestaurantList from './component/Restaurantlist';
import ZoneByVille from './component/RestaurantForm';
import ReastauUpdate from './component/Reastaupdate';
import Login from './component/Auth/Login.jsx';
import SignUp from './component/Auth/Register.jsx'
import Map from './component/mapApi/map.jsx';
import AllRestaus from './component/mapApi/mapAll.jsx';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import RestaurantCleint from './component/ReastaurantDisplay/RestaurantClientDisplay.jsx'

function AppHeader() {


  const location = useLocation();
  const isLoginHomePage = location.pathname === '/';
  const isRegisterPage = location.pathname === '/signup';
  if (isRegisterPage || isLoginHomePage) {
    return null; // Don't render the header on the login page
  }

  return <Header />;
}

function App() {
  //<ResponsiveAppBar/>  
  return (

    <div className="App">
      <Router>
        <AppHeader />
        <Routes>

            <Route path="/restaurantclient" element={<RestaurantCleint />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} Index={true} />
            <Route element={<ProtectedRoute />} >
            <Route path="/restaurant" element={<RestaurantList />} />
            <Route path="/addrestaurant" element={<ZoneByVille />} />
            <Route path="/specialites" element={<Specilaitelist />} />
            <Route path="/villes" element={<Villelist />} />
            <Route path="/series" element={<SerieList />} />
            <Route path="/zones" element={<ZoneList />} />
            <Route path="/editresto/:id" element={<ReastauUpdate />} />
            <Route path="/mapall" element={<AllRestaus />} />
            <Route path="/map" element={<Map />} />
            <Route path="/map/:id" element={<Map />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
