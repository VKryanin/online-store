import React from "react";

import styles from './Product.module.scss'

export const Product = ({ title, images, price }) => {
    const currentImage = images[0];
    const SIZES = [4, 4.5, 5]
    return (
        <section className={styles.product}>
            <div className={styles.productImages}>
                <div
                    className={styles.productCurrent}
                    style={{ backgroundImage: `url(${currentImage})` }}
                />
                {images.map((image, i) => (
                    <div
                        key={i}
                        className={styles.productImage}
                        style={{ backgroundImage: `url(${image})` }}
                        onClick={() => { }}
                    />
                ))}
            </div>
            <div className={styles.productInfo}>
                <h1 className={styles.productTitle}>{title}</h1>
                <div className={styles.productPrice}>{price}</div>
                <p className={styles.productColor}>
                    <span>Color:</span>  Green
                </p>
                <p className={styles.productSizes}>
                    <span>Sizes:</span>
                    <div className={styles.productList}>
                        {SIZES.map(size => (
                            <div 
                            onClick={() => {}}
                            className={`${styles.productSize}`}
                            key={size}>

                            </div>
                        ))}
                    </div>
                </p>
            </div>
        </section>
    )
}