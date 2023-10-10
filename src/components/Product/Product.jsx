import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from '../../utils/routes'
import { addItemToCart, addItemtoFavourite, removeItemFromFavourite } from "../../features/user/userSlice";

import styles from './Product.module.scss'


const SIZES = [4, 4.5, 5];

export const Product = (item) => {
    const { favourite } = useSelector(({ user }) => user);
    const { id, title, images, price, description } = item
    const [currentImage, setCurrentImage] = useState();
    const [currentSize, setCurrentSize] = useState();
    const dispatch = useDispatch();
    const favouriteList = favourite.map(({ id }) => id)
    const isFavourite = favouriteList.includes(item.id)

    useEffect(() => {
        if (!images.length) return;
        setCurrentImage(images[0])
    }, [images])

    const addToCart = () => {
        dispatch(addItemToCart(item))
    }

    const addToFav = () => {
        dispatch(addItemtoFavourite(item))
    }

    const removeToFav = () => {
        dispatch(removeItemFromFavourite(id))
    }
    return (
        <section className={styles.product}>
            <div className={styles.productImages}>
                <div
                    className={styles.productCurrent}
                    style={{ backgroundImage: `url(${currentImage})` }}
                />
                <div className={styles.productImagesList}>
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className={styles.productImage}
                            style={{ backgroundImage: `url(${image})` }}
                            onClick={() => { setCurrentImage(image) }}
                        />
                    ))}
                </div>

            </div>
            <div className={styles.productInfo}>
                <h1 className={styles.productTitle}>{title}</h1>
                <div className={styles.productPrice}>{price}$</div>
                <p className={styles.productColor}>
                    <span>Color:</span>  Green
                </p>
                <div className={styles.productSizes}>
                    <span>Sizes:</span>
                    <div className={styles.productList}>
                        {SIZES.map(size => (
                            <div
                                onClick={() => { setCurrentSize(size) }}
                                className={
                                    `${styles.productSize} ${currentSize === size
                                        ? styles.productSizeActive
                                        : ''}`
                                }
                                key={size}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className={styles.productDescription}>
                    {description}
                </p>
                <div className={styles.productActions}>
                    <button
                        onClick={addToCart}
                        className={styles.productAdd}
                        disabled={!currentSize}
                    >
                        Add to cart
                    </button>
                    {!isFavourite
                        ? (<button
                            className={styles.productAddFavourite}
                            onClick={addToFav}
                        >
                            Add to favourites
                        </button>)
                        : <button
                            className={styles.productRemoveFavourite}
                            onClick={removeToFav}
                        >
                            Favourites
                        </button>}
                </div>
                <div className={styles.productBottom}>
                    <p className={styles.productPurchase}>19 people purchased</p>
                    <Link to={ROUTES.HOME}>
                        Return to store
                    </Link>
                </div>
            </div>
        </section >
    )
}