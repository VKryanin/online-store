import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import LOGO from '../../images/LOGO.svg'
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerLogo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="Stuff" />
                </Link>
            </div>
            <div className={styles.headerInfo}>
                <div className={styles.headerUser}>
                    <div className={styles.headerUserAvatar} />
                    <p className={styles.headerUserName}>Guest</p>
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