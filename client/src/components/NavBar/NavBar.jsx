import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import { NavLink, useNavigate } from "react-router-dom";

export const NavBar = (props) => {
    const { setLoggedIn, loggedIn } = props;
    const navigate = useNavigate();
    const OpenAdminPanel = () => {
        navigate('/admin')
    }
    return (
        <header className="header">
            <NavLink className='header__link' to={'/'}>SoqaShop</NavLink>
            {loggedIn
                ? <nav className="header__nav">
                    <button className="header__button" onClick={() => { OpenAdminPanel() }}>Admin</button>
                    <button className="header__button" onClick={() => {
                        setLoggedIn(false)
                    }}>Exit</button>
                </nav>
                : <nav className="header__nav">
                    <button className="header__button" onClick={() => {
                        setLoggedIn(true)
                    }}>Login</button>
                    <button className="header__button">Registration</button>
                </nav>
            }
        </header>
    )
}