import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import cn from "classnames";
import axios from 'axios';
import Price from "../price";
import Notification from "../Notification";

const HeaderNavMenu = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstname: '', lastname: '' });
  const [notifications, setNotifications] = useState([]);
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/inefficiencies');
      setNotifications(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const access_token = localStorage.getItem('access_Token');
        if (!access_token) {
          throw new Error('Access Token not found');
        }

        const response = await axios.get('http://localhost:3000/api/user/current', {
          headers: {
            Authorization: access_token,
          },
        });

        setUser({
          firstname: response.data.result?.fullname.split(' ')[0] || '',
          lastname: response.data.result?.fullname.split(' ')[1] || '',
        });
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur actuel :', error);
      }
    };

    fetchCurrentUser();
    fetchNotifications();
  }, []);

  const logout = () => {
    localStorage.removeItem("access_Token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const isLoggedIn = localStorage.getItem("access_Token") !== null;
  const isLoginPage = pathname === "/";

  const isActiveClassName = (path) => {
    return path === pathname ? "active" : "";
  };


  return (
    <div className="navbar-wrap main-menu d-none d-lg-flex">
      <ul className="navigation">
        <li className={cn("menu-item-has-children", { active: ["/home"].includes(pathname) })}>
          <a href="/home" style={{ color: "white" }}>Accueil</a>
        </li>
        <li className={cn("menu-item-has-children", { active: ["/contactUs"].includes(pathname) })}>
          <a href="/contact" style={{ color: "white" }}>Contact</a>
        </li>
        <li className={cn("menu-item-has-children", {})}>
          <a href="/about" style={{ color: "white" }}>A propos</a>
        </li>
        {isLoggedIn && !isLoginPage && (
          <>
            <div className="user-info">
              {user.firstname && (
                <Link className="nav-link" style={{ marginTop: '17px', color: "white", fontWeight: "bold" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>{user.firstname}
                </Link>
              )}
            </div>            
             
            <Notification notifications={notifications} fetchNotifications={fetchNotifications} />

                   

            <div className="user-info">
              <Link><Price /></Link>
            </div>
            <li className={cn(isActiveClassName("/"))}>
              <a onClick={logout} style={{ color: "white" }}>Deconnexion {''}
                <img src='./img/images/se-deconnecter.png' alt='Déconnexion' style={{ width: "25px" }}></img>
              </a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default HeaderNavMenu;
