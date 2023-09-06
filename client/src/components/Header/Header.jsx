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
            <NavLink className='header__logo' to={'/'}>SoqaShop</NavLink>
            {currentUser.isLoggedIn
                ? <nav className="header__nav">
                    {currentUser.role === 'ADMIN'
                        ? <button className="header__button" onClick={() => { OpenAdminPanel() }}>Admin</button>
                        : <></>
                    }
                    <NavLink to={'/profile'} className="header__button">Профиль</NavLink>
                    <button className="header__button" onClick={() => {
                        logout()
                    }}>Выйти</button>
                </nav>
                : <nav className="header__nav">
                    <div className="header__links">
                        <NavLink to={'/login'} className="header__link">
                            Логин
                        </NavLink>
                    </div>
                    <div className="header__links">
                        <NavLink to={'/registration'} className="header__link">
                            Регистрация
                        </NavLink>
                    </div>

                </nav>
            }
        </header>
    )
}