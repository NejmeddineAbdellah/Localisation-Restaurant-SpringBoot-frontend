import React from "react";
import * as mdb from 'mdb-ui-kit';
import { Input } from 'mdb-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { NavLink, useNavigate } from "react-router-dom";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { MenuOutlined } from "@ant-design/icons";
import Headlogo from '../images/headerlogo.jpg';
import lg from '../images/Coffee.png';
import { Select } from "antd";
import authService from "../services/services/auth.service";

function Header() {

  const user = authService.getCurrentUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("usernameId");
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark text-white" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '20px' }}>
      <nav className="navbar navbar-expand-lg text-white">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <img src={lg} style={{ height: "80px" }} />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">
              <MenuOutlined style={{ color: '#fff' }} />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '20px' }}>
              {user && user.roles && user.roles.includes('ROLE_ADMIN') && (
                <NavLink
                  exact
                  className="nav-link text-white"
                  activeClassName="active"
                  to="/villes"
                >
                  Home
                </NavLink>
              )}
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/restaurant"
              >
                Restaurant
              </NavLink>
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/restaurantclient"
              >
                Restaurant User
              </NavLink>
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/villes"
              >
                Villes
              </NavLink>
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/zones"
              >
                Zones
              </NavLink>
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/series"
              >
                Series
              </NavLink>
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/specialites"
              >
                Specialite
              </NavLink>
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>


  );
}

const Footer = () => {
  return (
    <div>
      <footer className="text-center text-lg-start bg-dark text-light fixed-bottom" style={{
        'bottom': 0, 'position': 'relative'
      }}>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>Localistation Restaurant
                </h6>
                <p>
                  Here you can use rows and columns to organize your footer content. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
              <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Useful links
                </h6>
                <p>
                  <NavLink className="nav-link text-white" to="/Restaurant ">Restaurant</NavLink>
                </p>
                <p>
                  <NavLink className="nav-link text-white" to="/zones">Zone</NavLink>
                </p>
                <p>
                  <NavLink className="nav-link text-white" to="/villes">Villes</NavLink>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p><i className="fas fa-home me-3"></i> Marrakech, Innara 10012, MA</p>
                <p>
                  <i className="fas fa-envelope me-3"></i>
                  crissnajm1998@gmail.com
                </p>
                <p><i className="fas fa-phone me-3"></i> + 212 671 012 945</p>
              </div>
            </div>
          </div>
        </section>
        <div className="text-center p-4" style={{ "background-color": 'rgba(0, 0, 0, 0.05)' }}>
          © 2021 Copyright :
          <a className="text-reset fw-bold" href="#"> LocalistationRestaurant</a>
        </div>
      </footer>

    </div>
  );
};

export { Header, Footer };