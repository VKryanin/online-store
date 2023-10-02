import React, { useState } from "react";

import styles from './User.module.scss'
import { useDispatch } from "react-redux";
import { createUser } from "../../features/user/userSlice";

export const UserSignupForm = ({ toggleCurrentFormType, closeForm }) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        avatar: ''
    })

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(values).some(val => !val);
        if (isEmpty) return;
        dispatch(createUser(values));
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
                Sign Up
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
                        type="name"
                        name="name"
                        placeholder="Your name"
                        value={values.name}
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
                <div className={styles.formGroup}>
                    <input
                        type="avatar"
                        name="avatar"
                        placeholder="Your avatar"
                        value={values.avatar}
                        autoComplete="off"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div 
                className={styles.formLink}
                onClick={()=> {
                    toggleCurrentFormType('login')
                }}
                >
                    I already have an account
                </div>
                <button type="submit" className={styles.formSubmit}>
                    Create an account
                </button>
            </form>
        </div>
    )
}