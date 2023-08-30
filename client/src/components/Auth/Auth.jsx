import React, { useContext, useState } from "react"
import { Label } from "../Label/Label"
import { NavLink, useLocation } from "react-router-dom"
import { CurrentUserContext } from "../../context/CurrentUserContext"

export const Auth = ({ isRegForm, auth }) => {
    const [userData, setUserData] = useState({})
    function handleSubmit(e) {
        e.preventDefault();
        auth({ email: userData.email, password: userData.password, name: userData.name })
    }
    return (
        <>
            <form name={isRegForm
                ? 'registration'
                : 'login'}
                className='auth__form'
                noValidate>
                {isRegForm && (
                    < Label
                        title="Your name"
                        name='name'
                        minLength={2}
                        maxLength={30}
                        pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$'
                        value={userData.name || ''}
                        onChange={e => setUserData(prev => (
                            {
                                ...prev,
                                name: e.target.value
                            })
                        )} />
                )}
                < Label
                    title='E-mail'
                    name='email'
                    pattern='^.+@.+\..+$'
                    value={userData.email || ''}
                    onChange={e =>
                        setUserData(prev => (
                            {
                                ...prev,
                                email: e.target.value
                            })
                        )} />
                < Label
                    title='Password'
                    name='password'
                    minLength={6}
                    value={userData.password || ''}
                    onChange={e =>
                        setUserData(prev => (
                            {
                                ...prev,
                                password: e.target.value
                            })
                        )} />
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
                    <button
                        type='submit'
                        className='auth__button'
                        onClick={e => {
                            handleSubmit(e)
                        }} >
                        {isRegForm ? 'Зарегистрироваться' : 'Войти'}
                    </button >
                </div>
            </form>
        </>
    )
}