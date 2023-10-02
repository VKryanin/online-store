import React, { useState } from "react";

import styles from './User.module.scss'
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";

export const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(values).some(val => !val);
        if (isEmpty) return;
        dispatch(loginUser(values));
        closeForm();
    }
    return (
        <div className={styles.form}>
            <div className={styles.formClose} onClick={closeForm}>
                <svg className={styles.formIcon}>
                    <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#close`} />
                </svg>
            </div>

            <h2 className={styles.formTitle}>
                Log in
            </h2>

            <form className={styles.formForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={values.email}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        value={values.password}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div
                    className={styles.formLink}
                    onClick={() => {
                        toggleCurrentFormType('signup')
                    }}
                >
                    Create an account
                </div>
                <button type="submit" className={styles.formSubmit}>
                    Login
                </button>
            </form>
        </div>
    )
}