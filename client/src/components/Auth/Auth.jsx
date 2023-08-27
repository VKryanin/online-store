import React, { useState } from "react"
import { Label } from "../Label/Label"
import { NavLink, useLocation } from "react-router-dom"
import { login, registration } from '../../Api/useApi'

export const Auth = ({ isRegForm }) => {
    const location = useLocation();
    const isLogin = location.pathname === 'login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const click = async (e) => {
        e.preventDefault()
        if (isLogin) {
            const response = await login()
            console.log(response);
        } else {
            const response = await registration(email, password, name)
            console.log(response);
        }
    }
    return (
        <>
            <form name={isRegForm ? 'registration' : 'login'} className='auth__form' noValidate>
                {isRegForm && (
                    < Label title="Your name" name='name' minLength={2} maxLength={30} pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$' value={name} onChange={e => setName(e.target.value)} />
                )}
                < Label title='E-mail' name='email' pattern='^.+@.+\..+$' value={email} onChange={e => setEmail(e.target.value)} />
                < Label title='Password' name='password' minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
                <div className="auth__wrapper">
                    {isRegForm
                        ? (<p className="auth__subtitle">
                            <span className="auth__span">Already registered?</span>
                            <NavLink to='/login' className='auth__link'> Login </NavLink>
                        </p>)
                        : (<p className="auth__subtitle">
                            <span className="auth__span">Don't have an account?</span>
                            <NavLink to='/registration' className='auth__link' >
                                Registration
                            </NavLink>
                        </p>
                        )}
                    <button type='submit' className='auth__button' onClick={e => { click(e) }} >
                        {isRegForm ? 'Зарегистрироваться' : 'Войти'}
                    </button >
                </div>

            </form>
        </>
    )
}