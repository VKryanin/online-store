import React from "react";

import styles from './Poster.module.scss';

import BG from '../../images/computer.svg'

export const Poster = () => {
    return (
        <section className={styles.poster}>
            <h1 className={styles.posterTitle}>
                BIG SALE 20%
            </h1>
            <div className={styles.posterProduct}>
                <div className={styles.posterWrapper}>
                    <p className={styles.posterSubtitle}>The bestseller of 2022</p>
                    <h2 className={styles.posterHead}>LENNON r2d2
                        with NVIDIA 5090 TI
                    </h2>
                    <button className={styles.posterButton}>Shop now</button>
                </div>
                <div className={styles.posterImage}>
                    <img src={BG} alt="PC" />
                </div>
            </div>
        </section>
    )
}