import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import { NavLink, useNavigate } from "react-router-dom";

export const Header = ({ logout }) => {
    const currentUser = useContext(CurrentUserContext)
    const navigate = useNavigate();
    const OpenAdminPanel = () => {
        navigate('/admin')
    }
    return (
        <header className="header">
            <NavLink className='header__link' to={'/'}>SoqaShop</NavLink>
            {currentUser.isLoggedIn
                ? <nav className="header__nav">
                    {currentUser.role === 'ADMIN'
                        ? <button className="header__button" onClick={() => { OpenAdminPanel() }}>Admin</button>
                        : <></>
                    }
                    <NavLink to={'/profile'} className="header__button">Profile</NavLink>
                    <button className="header__button" onClick={() => {
                        logout()
                    }}>Exit</button>
                </nav>
                : <nav className="header__nav">
                    <NavLink to={'/login'} className="header__button">Login</NavLink>
                    <NavLink to={'/registration'} className="header__button">Registration</NavLink>
                </nav>
            }
        </header>
    )
}