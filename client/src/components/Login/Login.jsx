import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Auth } from "../Auth/Auth";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export const Login = ({ auth }) => {
    const navigate = useNavigate();
    return (
        <div className="auth">
            <header className="auth__header">
                <NavLink
                    className='header__logo'
                    to={'/'}>SoqaShop
                </NavLink>
                <button
                    onClick={
                        () => navigate('/')
                    }
                    className="header__button">Каталог</button>
            </header>
            <section className="auth__section">
                <h1 className="auth__title">Авторизация</h1>
                < Auth
                    isRegForm={false}
                    auth={auth} />
            </section>
        </div>
    )
}