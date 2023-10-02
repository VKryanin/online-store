import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import LOGO from '../../images/LOGO.svg';
import AVATAR from '../../images/avatar.jpg'
import styles from './Header.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { toggleForm } from "../../features/user/userSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(({ user }) => user)
    const [values, setValues] = useState({ name: 'Guest', avatar: AVATAR })

    useEffect(() => {
        if (!currentUser) return;
        setValues(currentUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])


    const handleClick = () => {
        if (!currentUser) dispatch(toggleForm(true));
    }

    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="Stuff" />
                </Link>
            </div>
            <div className={styles.headerInfo}>
                <div className={styles.headerUser} onClick={handleClick}>
                    <div
                        className={styles.headerUserAvatar}
                        style={{ backgroundImage: `url(${values.avatar})` }}
                    />
                    <p className={styles.headerUserName}>{values.name}</p>
                </div>
                <form className={styles.headerForm}>
                    <div className={styles.headerIconWrapper}>
                        <svg className={styles.headerIcon}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#search`} />
                        </svg>
                    </div>
                    <div className={styles.headerInput}>
                        <input
                            type="search"
                            name="search"
                            placeholder="Search for anything ..."
                            autoComplete="off"
                            onChange={() => { }}
                            value='' />
                    </div>
                    {false && <div className={styles.headerPopup}></div>}
                </form>
                <div className={styles.headerAccount}>
                    <Link to={ROUTES.HOME} className={styles.headerFavourites}>
                        <svg className={styles.headerIconFav}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#heart`} />
                        </svg>
                    </Link>
                    <Link to={ROUTES.CART} className={styles.headerCart}>
                        <svg className={styles.headerIconCart}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#bag`} />
                        </svg>
                        <span className={styles.headerCount}>2</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}