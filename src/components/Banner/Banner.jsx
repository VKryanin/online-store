import React from "react";

import styles from './Banner.module.scss';
import bannerImg from '../../images/banner.jpg'

export const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className={styles.bannerLeft}>
                <p className={styles.bannerContent}>
                    New Year
                    <span>SALE</span>
                </p>
                <button className={styles.bannerMore}>See more</button>
            </div>
            <div
                className={styles.bannerRight}
                style={{ backgroundImage: `url(${bannerImg})` }}
            >
                <p className={styles.bannerDiscount}>
                    save up to <span>50%</span> off
                </p>
            </div>
        </section>
    )
}