import React from "react";
import styles from './Favourite.module.scss'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export const Favourite = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favourite } = useSelector(({ user }) => user);

    const handleItemClick = (id) => {
        navigate(`/products/${id}`);
    }

    return (
        <section className={styles.favourite}>
            <h2 className={styles.favouriteTitle}>
                Your favourite items
            </h2>
            {!favourite.length
                ? (<p className={styles.favouriteEmpty}>Here is empty </p>)
                : (<>
                    <ul className={styles.favouriteList}>
                        {favourite.map((item) => {
                            const { title, id, price, images, category } = item
                            return <li
                                className={styles.favouriteItem}
                                key={id}
                                onClick={() => handleItemClick(id)}
                            >
                                <div
                                    className={styles.favouriteImage}
                                    style={{ backgroundImage: `url(${images[0]})` }}
                                />
                                <div className={styles.favouriteInfo}>
                                    <h3 className={styles.favouriteName}>{title}</h3>
                                    <p className={styles.favouriteCategory}>{category.name}</p>
                                </div>
                                <p className={styles.favouritePrice}>{price}$</p>
                            </li>
                        })}
                    </ul>
                </>
                )
            }

        </section>
    )
}