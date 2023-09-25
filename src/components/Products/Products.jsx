import React from "react";

import styles from './Products.module.scss';
import { Link } from "react-router-dom";

export const Products = ({ title, products = [], amount, style = {} }) => {
    const list = products.filter((_, i) => i < amount)
    return (
        <section className={styles.products} style={style}>
            {title && <h2>{title}</h2>}
            <div className={styles.productsList}>
                {list.map(({ id, images, title, category: { name: cat }, price }) => (
                    <Link to={`/products/${id}`} key={id} className={styles.productsProduct}>
                        <div
                            className={styles.productsImage}
                            style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={styles.productsWrapper}>
                            <h3 className={styles.productsTitle}>{title}</h3>
                            <p className={styles.productsCaterories}>{cat}</p>
                            <div className={styles.productsInfo}>
                                <div className={styles.productsPrices}>
                                    <p className={styles.productsPrice}>{price}$</p>
                                    <p className={styles.productsOldPrice}>{Math.floor(price * .8)}$</p>
                                </div>
                                <p
                                    className={styles.purchases}>
                                    {Math.floor(Math.random() * 20 + 1)} purchased
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}