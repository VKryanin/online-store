import React from "react"
import { Label } from "../Label/Label"
import { NavLink } from "react-router-dom"


export const Auth = ({ isRegForm }) => {
    return (
        <>
            <form name={isRegForm ? 'registration' : 'login'} className='auth__form' noValidate>
                {isRegForm && (
                    < Label title="Your name" name='name' minLength={2} maxLength={30} pattern='^(?!\s)[A-Za-zА-Яа-я\-\s]+$' />
                )}
                < Label title='E-mail' name='email' pattern='^.+@.+\..+$' />
                < Label title='Password' name='password' minLength={6} />
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
                    <button type='submit' className='auth__button'>
                        {isRegForm ? 'Зарегистрироваться' : 'Войти'}
                    </button >
                </div>

            </form>
        </>
    )
}