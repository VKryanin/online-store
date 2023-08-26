import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Auth } from "../Auth/Auth";

export const Registration = () => {
    const navigate = useNavigate();

    return (
        <div className="auth">
            <header className="auth__header">
                <NavLink className='header__link' to={'/'}>SoqaShop</NavLink>
                <button onClick={() => navigate('/')} className="header__button">Catalog</button>
            </header>
            <section className="auth__section">
                <h1 className="auth__title">Registration</h1>
                < Auth isRegForm={true} />
            </section>
        </div>
    )
}