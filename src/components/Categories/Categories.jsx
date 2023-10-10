import React from "react";
import styles from './Categories.module.scss';
import { Link } from "react-router-dom";

export const Categories = ({ title, products = [], amount }) => {
    const list = products.filter((_, i) => i < amount);
    return (
        <section className={styles.categories}>
            <h2 className={styles.categoriesTitle}>{title}</h2>
            <ul className={styles.categoriesList}>
                {list.map(({ id, name, image }) => (
                    <li className={styles.categoriesItem} key={id}>
                        <Link to={`categories/${id}`} >
                            <div
                                className={styles.categoriesImage}
                                style={{ backgroundImage: `url(${image})` }}
                            />
                            <h3 className={styles.categoriesTitle}>
                                {name}
                            </h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}