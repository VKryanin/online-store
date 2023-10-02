import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { ROUTES } from '../../utils/routes'
import { addItemToCart } from "../../features/user/userSlice";

import styles from './Product.module.scss'


const SIZES = [4, 4.5, 5];

export const Product = (item) => {
    const { title, images, price, description } = item
    const dispatch = useDispatch()

    const [currentImage, setCurrentImage] = useState();
    const [currentSize, setCurrentSize] = useState();

    useEffect(() => {
        if (!images.length) return;
        setCurrentImage(images[0])
    }, [images])

    const addToCart = () => {
        dispatch(addItemToCart(item))
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
                    <button onClick={addToCart} className={styles.productAdd} disabled={!currentSize}>Add to cart</button>
                    <button className={styles.productFavourite}>Add to favourites</button>
                </div>
                <div className={styles.productBottom}>
                    <p className={styles.productPurchase}>19 people purchased</p>
                    <Link to={ROUTES.HOME}>
                        Return to store
                    </Link>
                </div>
            </div>
        </section>
    )
}