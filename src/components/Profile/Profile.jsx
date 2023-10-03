import React, { useEffect, useState } from "react";

import styles from './Profile.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../features/user/userSlice";

export const Profile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(({ user }) => user);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        avatar: ''
    })

    useEffect(() => {
        if (!currentUser) return;
        setValues(currentUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEmpty = Object.values(values).some(val => !val);
        if (isEmpty) return;
        dispatch(updateUser(values));
    }

    return (
        <section className={styles.profile}>
            {
                !currentUser
                    ? <span>You need to log in</span>
                    : (
                        <form className={styles.profileForm} onSubmit={handleSubmit}>
                            <div className={styles.profileGroup}>
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
                            <div className={styles.profileGroup}>
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
                            <div className={styles.profileGroup}>
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
                            <div className={styles.profileGroup}>
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
                            <button type="submit" className={styles.profileSubmit}>
                                Update an account
                            </button>
                        </form>
                    )
            }
        </section>

    )
}