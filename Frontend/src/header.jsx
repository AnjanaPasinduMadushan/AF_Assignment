import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import "../src/assets/header.css";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { autheticationActions } from './components/store';
axios.defaults.withCredentials = true;

const Header = () => {

    
    const isLogged = useSelector(state=>state.isLogged)
    const dispatch = useDispatch();
    const history = useNavigate()
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
        .then(()=>history("./signUp"));
        
      };

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
                  <Link  className="login" to="./login">
                    Login
                  </Link>
                </li>

                <li className="header__item">
                  <Link className="register" to="./signUp">
                    Sign Up
                  </Link>
                </li>
              </>
            )}

                <li className="header__item">
              {isLogged && (
                  <Link onClick={handleLogout} className="logout">
                    Log Out
                  </Link>
              )}
              
              </li>
                <li className="header__item">
              {isLogged && (
                <Link className="profile" to="./profile">
                  Profile
                </Link>
              )}
              
              </li>

        </>


          </ul>
        </nav>
      </header></div>
  )
}

export default Header