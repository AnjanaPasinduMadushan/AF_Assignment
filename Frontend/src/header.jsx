import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../src/assets/header.css";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { autheticationActions } from './components/store';
axios.defaults.withCredentials = true;

const Header = () => {


  const isLogged = useSelector(state => state.isLogged)


  const dispatch = useDispatch();
  const history = useNavigate();

  const [userData, setUserData] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/User/profile', { withCredentials: true });
        setUserData(response.data.user);
        console.log(response.data.user)
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [isLogged])



  console.log(userData.role)

  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:8070/User/logout", null, {
      withCredentials: true,
    }); //null means we don't have anything to add with this api
    if (res.status === 200) {
      return res;
    }
    return new Error("Unable To Logout. Please try again");
  };
  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(autheticationActions.logOut()))
      .then(() => history("./signUp"));

  };

  const isActive = useLocation()
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          {/* <img src="" alt="Logo" /> */}
          <h1 className="header__title">CitizenConnect</h1>
        </div>

        <nav className="header__nav">
          <ul className="header__list">
            <>
              {!isLogged && (
                <>
                  <li className="header__item">
                    <NavLink activeClassName="activeNavItem" className="login" to="./login">
                      Login
                    </NavLink>
                  </li>

                  <li className="header__item">
                    <NavLink activeClassName="activeNavItem" className="register" to="./signUp">
                      Sign Up
                    </NavLink>
                  </li>
                </>
              )}



              <li className="header__item">
                {isLogged && userData.role === 'admin' && (
                  <NavLink activeClassName="activeNavItem" className="profile" to="./newUsers">
                    New Users
                  </NavLink>
                )}

              </li>


              <li className="header__item">
                {isLogged && userData.role === 'admin' && (
                  <NavLink activeClassName="activeNavItem" className="new_complaint" to="./newComplaints">
                    New Complaints
                  </NavLink>
                )}

              </li>


              <li className="header__item">
                {isLogged && userData.role === 'admin' && (
                  <NavLink activeClassName="activeNavItem" className="feedback" to="./profile">
                    Feedbacks
                  </NavLink>
                )}

              </li>
              <li className="header__item">
                {isLogged && (
                  <NavLink activeClassName="activeNavItem" className="profile" to="./profile">
                    Profile
                  </NavLink>
                )}

              </li>
              <li className="header__item">
                {isLogged && (
                  <NavLink onClick={handleLogout} className="logout">
                    Log Out
                  </NavLink>
                )}

              </li>

            </>


          </ul>
        </nav>
      </header></div>
  )
}

export default Header