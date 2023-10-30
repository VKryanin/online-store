import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "../../utils/routes";
import LOGO from '../../images/LOGO.svg';
import AVATAR from '../../images/avatar.jpg'
import styles from './Header.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { toggleForm, logout, checkAuth } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('')
    const { currentUser, cart, favourite } = useSelector(({ user }) => user)
    const [values, setValues] = useState({ name: 'Guest', avatar: AVATAR })

    useEffect(() => {
        if (!currentUser) return;
        setValues(currentUser);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    const { data, isLoading } = useGetProductsQuery({ title: searchValue });

    const handleClick = () => {
        if (!currentUser) dispatch(toggleForm(true));
        else navigate(ROUTES.PROFILE)
    }

    const handleSearch = ({ target: { value } }) => {
        setSearchValue(value)
    }

    const handleLogout = () => {
        dispatch(logout())
        localStorage.clear()
        dispatch(checkAuth())
        setValues({ name: 'Guest', avatar: AVATAR })
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
                            onChange={handleSearch}
                            value={searchValue} />
                    </div>
                    {
                        searchValue && <div className={styles.headerPopup}>
                            {
                                isLoading
                                    ? 'Loading...'
                                    : !data.length ? 'No results'
                                        : (data.map(({ title, images, id }) => {
                                            return (
                                                <Link
                                                    className={styles.headerItem}
                                                    to={`/products/${id}`}
                                                    key={id}
                                                    onClick={() => setSearchValue('')}
                                                >
                                                    <div
                                                        className={styles.headerImage}
                                                        style={{ backgroundImage: `url(${images[0]})` }}
                                                    />
                                                    <div className={styles.headerTitle}>{title}</div>
                                                </Link>)
                                        })
                                        )
                            }
                        </div>
                    }
                </form>
                <div className={styles.headerAccount}>
                    <Link to={ROUTES.FAVOURITE} className={currentUser ? styles.headerFavourites : styles.headerFavourites + ' ' + styles.headerFavouritesHidden} >
                        <svg className={styles.headerIconFav}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#heart`} />
                        </svg>
                        {!!favourite.length && (
                            <span className={styles.headerCount}>{favourite.length}</span>
                        )}
                    </Link>
                    <Link to={ROUTES.CART} className={styles.headerCart}>
                        <svg className={styles.headerIconCart}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#bag`} />
                        </svg>
                        {!!cart.length && (
                            <span className={styles.headerCount}>{cart.length}</span>
                        )}
                    </Link>
                    {currentUser ? (
                        <Link
                            to={ROUTES.HOME}
                            className={styles.headerExit}
                            onClick={() => handleLogout()}
                        >
                            <svg className={styles.headerIconCart}>
                                <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#exit`} />
                            </svg>
                        </Link>)
                        : (
                            <Link
                                to={ROUTES.HOME}
                                className={styles.headerExit}
                                onClick={() => handleClick()}
                            >
                                <svg className={styles.headerIconCart}>
                                    <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#login`} />
                                </svg>
                            </Link>
                        )}
                </div>
            </div>
        </header >
    )
}