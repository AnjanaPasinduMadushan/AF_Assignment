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
      .then(() => history("./login"));

  };

  const isActive = useLocation()
  return (
    <div>
      <header className="header">
        <div className="header__logo">
          <h1 className="header__title" onClick={()=>history("/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="400"
              zoomAndPan="magnify"
              viewBox="0 0 300 37.5"
              height="50"
              preserveAspectRatio="xMidYMid meet"
              version="1.0"
            >
              <defs>
                <g />
                <clipPath id="65ee6a3e16">
                  <path
                    d="M 5 14 L 32 14 L 32 26 L 5 26 Z M 5 14 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="2ef5f3eac5">
                  <path
                    d="M 18.386719 3.699219 L 34.609375 19.925781 L 18.386719 36.148438 L 2.164062 19.925781 Z M 18.386719 3.699219 "
                    clip-rule="nonzero"
                  />
                </clipPath>
                <clipPath id="d37b54131b">
                  <path
                    d="M 18.386719 3.699219 L 34.609375 19.925781 L 18.386719 36.148438 L 2.164062 19.925781 Z M 18.386719 3.699219 "
                    clip-rule="nonzero"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#65ee6a3e16)">
                <g clip-path="url(#2ef5f3eac5)">
                  <g clip-path="url(#d37b54131b)">
                    <path
                      fill="#ffffff"
                      d="M 25.625 25.710938 L 19.835938 25.710938 C 16.636719 25.710938 14.046875 23.121094 14.046875 19.921875 C 14.046875 19.421875 14.132812 18.941406 14.25 18.476562 L 16.941406 18.476562 C 17.070312 18.476562 17.183594 18.519531 17.304688 18.550781 C 17.078125 18.960938 16.941406 19.421875 16.941406 19.921875 C 16.941406 21.519531 18.238281 22.816406 19.835938 22.816406 L 25.625 22.816406 C 27.21875 22.816406 28.519531 21.519531 28.519531 19.921875 C 28.519531 18.328125 27.21875 17.027344 25.625 17.027344 L 23.5625 17.03125 C 23.054688 15.871094 22.242188 14.882812 21.238281 14.132812 L 25.625 14.132812 C 28.820312 14.132812 31.414062 16.726562 31.414062 19.921875 C 31.414062 23.121094 28.820312 25.710938 25.625 25.710938 Z M 13.210938 22.816406 L 11.152344 22.820312 C 9.554688 22.816406 8.257812 21.519531 8.257812 19.921875 C 8.257812 18.328125 9.554688 17.027344 11.152344 17.027344 L 16.941406 17.027344 C 18.539062 17.027344 19.835938 18.328125 19.835938 19.921875 C 19.835938 20.421875 19.695312 20.886719 19.472656 21.296875 C 19.59375 21.328125 19.707031 21.371094 19.835938 21.371094 L 22.523438 21.371094 C 22.644531 20.90625 22.730469 20.425781 22.730469 19.921875 C 22.730469 16.726562 20.136719 14.132812 16.941406 14.132812 L 11.152344 14.132812 C 7.953125 14.136719 5.363281 16.726562 5.363281 19.925781 C 5.363281 23.121094 7.953125 25.710938 11.152344 25.710938 L 15.539062 25.710938 C 14.53125 24.964844 13.722656 23.976562 13.210938 22.816406 Z M 13.210938 22.816406 "
                      fill-opacity="1"
                      fill-rule="nonzero"
                    />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(35.205095, 27.426351)">
                  <g>
                    <path d="M 10.34375 -3.53125 C 10.9375 -3.53125 11.515625 -3.617188 12.078125 -3.796875 C 12.640625 -3.972656 13.050781 -4.144531 13.3125 -4.3125 L 13.703125 -4.578125 L 15.359375 -1.265625 C 15.304688 -1.222656 15.226562 -1.164062 15.125 -1.09375 C 15.03125 -1.03125 14.804688 -0.90625 14.453125 -0.71875 C 14.109375 -0.53125 13.734375 -0.363281 13.328125 -0.21875 C 12.929688 -0.0820312 12.40625 0.0351562 11.75 0.140625 C 11.101562 0.253906 10.4375 0.3125 9.75 0.3125 C 8.15625 0.3125 6.644531 -0.078125 5.21875 -0.859375 C 3.800781 -1.640625 2.65625 -2.710938 1.78125 -4.078125 C 0.914062 -5.453125 0.484375 -6.929688 0.484375 -8.515625 C 0.484375 -9.722656 0.738281 -10.878906 1.25 -11.984375 C 1.757812 -13.085938 2.4375 -14.03125 3.28125 -14.8125 C 4.132812 -15.601562 5.128906 -16.234375 6.265625 -16.703125 C 7.398438 -17.179688 8.5625 -17.421875 9.75 -17.421875 C 10.851562 -17.421875 11.867188 -17.285156 12.796875 -17.015625 C 13.734375 -16.753906 14.394531 -16.492188 14.78125 -16.234375 L 15.359375 -15.84375 L 13.703125 -12.53125 C 13.609375 -12.601562 13.460938 -12.695312 13.265625 -12.8125 C 13.078125 -12.9375 12.691406 -13.09375 12.109375 -13.28125 C 11.523438 -13.476562 10.9375 -13.578125 10.34375 -13.578125 C 9.40625 -13.578125 8.5625 -13.425781 7.8125 -13.125 C 7.070312 -12.820312 6.484375 -12.421875 6.046875 -11.921875 C 5.609375 -11.421875 5.273438 -10.882812 5.046875 -10.3125 C 4.816406 -9.738281 4.703125 -9.15625 4.703125 -8.5625 C 4.703125 -7.257812 5.1875 -6.09375 6.15625 -5.0625 C 7.132812 -4.039062 8.53125 -3.53125 10.34375 -3.53125 Z M 10.34375 -3.53125 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(48.428597, 27.426351)">
                  <g>
                    <path d="M 1.59375 -16.5625 C 2.019531 -16.988281 2.53125 -17.203125 3.125 -17.203125 C 3.71875 -17.203125 4.226562 -16.988281 4.65625 -16.5625 C 5.09375 -16.132812 5.3125 -15.625 5.3125 -15.03125 C 5.3125 -14.4375 5.09375 -13.925781 4.65625 -13.5 C 4.226562 -13.070312 3.71875 -12.859375 3.125 -12.859375 C 2.53125 -12.859375 2.019531 -13.070312 1.59375 -13.5 C 1.164062 -13.925781 0.953125 -14.4375 0.953125 -15.03125 C 0.953125 -15.625 1.164062 -16.132812 1.59375 -16.5625 Z M 1.25 -10.640625 L 1.25 0 L 4.90625 0 L 4.90625 -10.640625 Z M 1.25 -10.640625 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(52.303997, 27.426351)">
                  <g>
                    <path d="M 1.859375 -10.640625 L 1.859375 -14.59375 L 5.53125 -14.59375 L 5.53125 -10.640625 L 7.78125 -10.640625 L 7.78125 -7.84375 L 5.53125 -7.84375 L 5.53125 -4.453125 C 5.53125 -3.472656 5.804688 -2.984375 6.359375 -2.984375 C 6.503906 -2.984375 6.648438 -3.007812 6.796875 -3.0625 C 6.953125 -3.125 7.070312 -3.179688 7.15625 -3.234375 L 7.28125 -3.3125 L 8.1875 -0.359375 C 7.40625 0.0859375 6.507812 0.3125 5.5 0.3125 C 4.800781 0.3125 4.203125 0.191406 3.703125 -0.046875 C 3.210938 -0.296875 2.835938 -0.625 2.578125 -1.03125 C 2.328125 -1.4375 2.144531 -1.863281 2.03125 -2.3125 C 1.914062 -2.757812 1.859375 -3.238281 1.859375 -3.75 L 1.859375 -7.84375 L 0.328125 -7.84375 L 0.328125 -10.640625 Z M 1.859375 -10.640625 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(58.107053, 27.426351)">
                  <g>
                    <path d="M 1.59375 -16.5625 C 2.019531 -16.988281 2.53125 -17.203125 3.125 -17.203125 C 3.71875 -17.203125 4.226562 -16.988281 4.65625 -16.5625 C 5.09375 -16.132812 5.3125 -15.625 5.3125 -15.03125 C 5.3125 -14.4375 5.09375 -13.925781 4.65625 -13.5 C 4.226562 -13.070312 3.71875 -12.859375 3.125 -12.859375 C 2.53125 -12.859375 2.019531 -13.070312 1.59375 -13.5 C 1.164062 -13.925781 0.953125 -14.4375 0.953125 -15.03125 C 0.953125 -15.625 1.164062 -16.132812 1.59375 -16.5625 Z M 1.25 -10.640625 L 1.25 0 L 4.90625 0 L 4.90625 -10.640625 Z M 1.25 -10.640625 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(61.982453, 27.426351)">
                  <g>
                    <path d="M 11.53125 -10.640625 L 6.265625 -2.796875 L 11.109375 -2.796875 L 11.109375 0 L 0.109375 0 L 5.375 -7.84375 L 0.96875 -7.84375 L 0.96875 -10.640625 Z M 11.53125 -10.640625 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(71.226277, 27.426351)">
                  <g>
                    <path d="M 12 -4.8125 L 4.296875 -4.8125 C 4.296875 -4.0625 4.535156 -3.503906 5.015625 -3.140625 C 5.503906 -2.785156 6.03125 -2.609375 6.59375 -2.609375 C 7.1875 -2.609375 7.65625 -2.6875 8 -2.84375 C 8.34375 -3.007812 8.738281 -3.328125 9.1875 -3.796875 L 11.84375 -2.46875 C 10.738281 -0.613281 8.898438 0.3125 6.328125 0.3125 C 4.722656 0.3125 3.347656 -0.234375 2.203125 -1.328125 C 1.054688 -2.429688 0.484375 -3.753906 0.484375 -5.296875 C 0.484375 -6.847656 1.054688 -8.175781 2.203125 -9.28125 C 3.347656 -10.394531 4.722656 -10.953125 6.328125 -10.953125 C 8.015625 -10.953125 9.382812 -10.460938 10.4375 -9.484375 C 11.5 -8.515625 12.03125 -7.125 12.03125 -5.3125 C 12.03125 -5.0625 12.019531 -4.894531 12 -4.8125 Z M 4.390625 -6.84375 L 8.4375 -6.84375 C 8.351562 -7.394531 8.132812 -7.816406 7.78125 -8.109375 C 7.425781 -8.410156 6.972656 -8.5625 6.421875 -8.5625 C 5.816406 -8.5625 5.332031 -8.398438 4.96875 -8.078125 C 4.613281 -7.765625 4.421875 -7.351562 4.390625 -6.84375 Z M 4.390625 -6.84375 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(81.340655, 27.426351)">
                  <g>
                    <path d="M 1.25 0 L 1.25 -10.640625 L 4.90625 -10.640625 L 4.90625 -9.515625 L 4.953125 -9.515625 C 5.910156 -10.472656 6.925781 -10.953125 8 -10.953125 C 8.53125 -10.953125 9.050781 -10.878906 9.5625 -10.734375 C 10.082031 -10.597656 10.582031 -10.382812 11.0625 -10.09375 C 11.539062 -9.800781 11.925781 -9.390625 12.21875 -8.859375 C 12.519531 -8.328125 12.671875 -7.710938 12.671875 -7.015625 L 12.671875 0 L 9 0 L 9 -6.015625 C 9 -6.566406 8.820312 -7.050781 8.46875 -7.46875 C 8.113281 -7.882812 7.65625 -8.09375 7.09375 -8.09375 C 6.539062 -8.09375 6.035156 -7.875 5.578125 -7.4375 C 5.128906 -7.007812 4.90625 -6.535156 4.90625 -6.015625 L 4.90625 0 Z M 1.25 0 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(92.657226, 27.426351)">
                  <g>
                    <path d="M 10.34375 -3.53125 C 10.9375 -3.53125 11.515625 -3.617188 12.078125 -3.796875 C 12.640625 -3.972656 13.050781 -4.144531 13.3125 -4.3125 L 13.703125 -4.578125 L 15.359375 -1.265625 C 15.304688 -1.222656 15.226562 -1.164062 15.125 -1.09375 C 15.03125 -1.03125 14.804688 -0.90625 14.453125 -0.71875 C 14.109375 -0.53125 13.734375 -0.363281 13.328125 -0.21875 C 12.929688 -0.0820312 12.40625 0.0351562 11.75 0.140625 C 11.101562 0.253906 10.4375 0.3125 9.75 0.3125 C 8.15625 0.3125 6.644531 -0.078125 5.21875 -0.859375 C 3.800781 -1.640625 2.65625 -2.710938 1.78125 -4.078125 C 0.914062 -5.453125 0.484375 -6.929688 0.484375 -8.515625 C 0.484375 -9.722656 0.738281 -10.878906 1.25 -11.984375 C 1.757812 -13.085938 2.4375 -14.03125 3.28125 -14.8125 C 4.132812 -15.601562 5.128906 -16.234375 6.265625 -16.703125 C 7.398438 -17.179688 8.5625 -17.421875 9.75 -17.421875 C 10.851562 -17.421875 11.867188 -17.285156 12.796875 -17.015625 C 13.734375 -16.753906 14.394531 -16.492188 14.78125 -16.234375 L 15.359375 -15.84375 L 13.703125 -12.53125 C 13.609375 -12.601562 13.460938 -12.695312 13.265625 -12.8125 C 13.078125 -12.9375 12.691406 -13.09375 12.109375 -13.28125 C 11.523438 -13.476562 10.9375 -13.578125 10.34375 -13.578125 C 9.40625 -13.578125 8.5625 -13.425781 7.8125 -13.125 C 7.070312 -12.820312 6.484375 -12.421875 6.046875 -11.921875 C 5.609375 -11.421875 5.273438 -10.882812 5.046875 -10.3125 C 4.816406 -9.738281 4.703125 -9.15625 4.703125 -8.5625 C 4.703125 -7.257812 5.1875 -6.09375 6.15625 -5.0625 C 7.132812 -4.039062 8.53125 -3.53125 10.34375 -3.53125 Z M 10.34375 -3.53125 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(105.880728, 27.426351)">
                  <g>
                    <path d="M 2.25 -1.265625 C 1.070312 -2.316406 0.484375 -3.664062 0.484375 -5.3125 C 0.484375 -6.957031 1.097656 -8.304688 2.328125 -9.359375 C 3.554688 -10.421875 5.078125 -10.953125 6.890625 -10.953125 C 8.671875 -10.953125 10.171875 -10.414062 11.390625 -9.34375 C 12.617188 -8.28125 13.234375 -6.929688 13.234375 -5.296875 C 13.234375 -3.671875 12.632812 -2.328125 11.4375 -1.265625 C 10.238281 -0.210938 8.722656 0.3125 6.890625 0.3125 C 4.972656 0.3125 3.425781 -0.210938 2.25 -1.265625 Z M 5.09375 -7.109375 C 4.613281 -6.640625 4.375 -6.035156 4.375 -5.296875 C 4.375 -4.566406 4.601562 -3.96875 5.0625 -3.5 C 5.519531 -3.039062 6.117188 -2.8125 6.859375 -2.8125 C 7.578125 -2.8125 8.164062 -3.046875 8.625 -3.515625 C 9.09375 -3.992188 9.328125 -4.59375 9.328125 -5.3125 C 9.328125 -6.039062 9.085938 -6.640625 8.609375 -7.109375 C 8.140625 -7.578125 7.554688 -7.8125 6.859375 -7.8125 C 6.160156 -7.8125 5.570312 -7.578125 5.09375 -7.109375 Z M 5.09375 -7.109375 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(117.197299, 27.426351)">
                  <g>
                    <path d="M 1.25 0 L 1.25 -10.640625 L 4.90625 -10.640625 L 4.90625 -9.515625 L 4.953125 -9.515625 C 5.910156 -10.472656 6.925781 -10.953125 8 -10.953125 C 8.53125 -10.953125 9.050781 -10.878906 9.5625 -10.734375 C 10.082031 -10.597656 10.582031 -10.382812 11.0625 -10.09375 C 11.539062 -9.800781 11.925781 -9.390625 12.21875 -8.859375 C 12.519531 -8.328125 12.671875 -7.710938 12.671875 -7.015625 L 12.671875 0 L 9 0 L 9 -6.015625 C 9 -6.566406 8.820312 -7.050781 8.46875 -7.46875 C 8.113281 -7.882812 7.65625 -8.09375 7.09375 -8.09375 C 6.539062 -8.09375 6.035156 -7.875 5.578125 -7.4375 C 5.128906 -7.007812 4.90625 -6.535156 4.90625 -6.015625 L 4.90625 0 Z M 1.25 0 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(128.51387, 27.426351)">
                  <g>
                    <path d="M 1.25 0 L 1.25 -10.640625 L 4.90625 -10.640625 L 4.90625 -9.515625 L 4.953125 -9.515625 C 5.910156 -10.472656 6.925781 -10.953125 8 -10.953125 C 8.53125 -10.953125 9.050781 -10.878906 9.5625 -10.734375 C 10.082031 -10.597656 10.582031 -10.382812 11.0625 -10.09375 C 11.539062 -9.800781 11.925781 -9.390625 12.21875 -8.859375 C 12.519531 -8.328125 12.671875 -7.710938 12.671875 -7.015625 L 12.671875 0 L 9 0 L 9 -6.015625 C 9 -6.566406 8.820312 -7.050781 8.46875 -7.46875 C 8.113281 -7.882812 7.65625 -8.09375 7.09375 -8.09375 C 6.539062 -8.09375 6.035156 -7.875 5.578125 -7.4375 C 5.128906 -7.007812 4.90625 -6.535156 4.90625 -6.015625 L 4.90625 0 Z M 1.25 0 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(139.830441, 27.426351)">
                  <g>
                    <path d="M 12 -4.8125 L 4.296875 -4.8125 C 4.296875 -4.0625 4.535156 -3.503906 5.015625 -3.140625 C 5.503906 -2.785156 6.03125 -2.609375 6.59375 -2.609375 C 7.1875 -2.609375 7.65625 -2.6875 8 -2.84375 C 8.34375 -3.007812 8.738281 -3.328125 9.1875 -3.796875 L 11.84375 -2.46875 C 10.738281 -0.613281 8.898438 0.3125 6.328125 0.3125 C 4.722656 0.3125 3.347656 -0.234375 2.203125 -1.328125 C 1.054688 -2.429688 0.484375 -3.753906 0.484375 -5.296875 C 0.484375 -6.847656 1.054688 -8.175781 2.203125 -9.28125 C 3.347656 -10.394531 4.722656 -10.953125 6.328125 -10.953125 C 8.015625 -10.953125 9.382812 -10.460938 10.4375 -9.484375 C 11.5 -8.515625 12.03125 -7.125 12.03125 -5.3125 C 12.03125 -5.0625 12.019531 -4.894531 12 -4.8125 Z M 4.390625 -6.84375 L 8.4375 -6.84375 C 8.351562 -7.394531 8.132812 -7.816406 7.78125 -8.109375 C 7.425781 -8.410156 6.972656 -8.5625 6.421875 -8.5625 C 5.816406 -8.5625 5.332031 -8.398438 4.96875 -8.078125 C 4.613281 -7.765625 4.421875 -7.351562 4.390625 -6.84375 Z M 4.390625 -6.84375 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(149.944819, 27.426351)">
                  <g>
                    <path d="M 6.90625 -7.9375 C 6.21875 -7.9375 5.625 -7.679688 5.125 -7.171875 C 4.625 -6.660156 4.375 -6.046875 4.375 -5.328125 C 4.375 -4.597656 4.625 -3.976562 5.125 -3.46875 C 5.625 -2.957031 6.21875 -2.703125 6.90625 -2.703125 C 7.238281 -2.703125 7.550781 -2.738281 7.84375 -2.8125 C 8.144531 -2.894531 8.363281 -2.976562 8.5 -3.0625 L 8.6875 -3.1875 L 9.9375 -0.640625 C 9.832031 -0.578125 9.691406 -0.492188 9.515625 -0.390625 C 9.347656 -0.285156 8.957031 -0.144531 8.34375 0.03125 C 7.726562 0.21875 7.066406 0.3125 6.359375 0.3125 C 4.796875 0.3125 3.425781 -0.234375 2.25 -1.328125 C 1.070312 -2.429688 0.484375 -3.75 0.484375 -5.28125 C 0.484375 -6.832031 1.070312 -8.164062 2.25 -9.28125 C 3.425781 -10.394531 4.796875 -10.953125 6.359375 -10.953125 C 7.066406 -10.953125 7.71875 -10.867188 8.3125 -10.703125 C 8.90625 -10.535156 9.328125 -10.367188 9.578125 -10.203125 L 9.9375 -9.953125 L 8.6875 -7.4375 C 8.226562 -7.769531 7.632812 -7.9375 6.90625 -7.9375 Z M 6.90625 -7.9375 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(157.737717, 27.426351)">
                  <g>
                    <path d="M 1.859375 -10.640625 L 1.859375 -14.59375 L 5.53125 -14.59375 L 5.53125 -10.640625 L 7.78125 -10.640625 L 7.78125 -7.84375 L 5.53125 -7.84375 L 5.53125 -4.453125 C 5.53125 -3.472656 5.804688 -2.984375 6.359375 -2.984375 C 6.503906 -2.984375 6.648438 -3.007812 6.796875 -3.0625 C 6.953125 -3.125 7.070312 -3.179688 7.15625 -3.234375 L 7.28125 -3.3125 L 8.1875 -0.359375 C 7.40625 0.0859375 6.507812 0.3125 5.5 0.3125 C 4.800781 0.3125 4.203125 0.191406 3.703125 -0.046875 C 3.210938 -0.296875 2.835938 -0.625 2.578125 -1.03125 C 2.328125 -1.4375 2.144531 -1.863281 2.03125 -2.3125 C 1.914062 -2.757812 1.859375 -3.238281 1.859375 -3.75 L 1.859375 -7.84375 L 0.328125 -7.84375 L 0.328125 -10.640625 Z M 1.859375 -10.640625 " />
                  </g>
                </g>
              </g>
              <g fill="#ffffff" fill-opacity="1">
                <g transform="translate(163.540773, 27.426351)">
                  <g>
                    <path d="M 3.609375 -4.4375 C 4.273438 -4.4375 4.835938 -4.203125 5.296875 -3.734375 C 5.765625 -3.273438 6 -2.710938 6 -2.046875 C 6 -1.398438 5.765625 -0.84375 5.296875 -0.375 C 4.835938 0.0820312 4.273438 0.3125 3.609375 0.3125 C 2.960938 0.3125 2.40625 0.0820312 1.9375 -0.375 C 1.476562 -0.84375 1.25 -1.398438 1.25 -2.046875 C 1.25 -2.710938 1.476562 -3.273438 1.9375 -3.734375 C 2.40625 -4.203125 2.960938 -4.4375 3.609375 -4.4375 Z M 3.609375 -4.4375 " />
                  </g>
                </g>
              </g>
            </svg>
          </h1>
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
                  <NavLink activeClassName="activeNavItem" className="feedback" to="./feed">
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