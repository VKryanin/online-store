import React from "react";

import styles from './Sidebar.module.scss'
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const Sidebar = () => {
    const { list } = useSelector(({ categories }) => categories)

    return (
        <aside className={styles.aside}>
            <h3 className={styles.asideTitle}>CATEGORIES</h3>
            <nav>
                <ul className={styles.asideMenu}>
                    {list.map(({ id, name }) => (
                        <li key={id}>
                            <NavLink
                                className={({ isActive }) => `${styles.asideLink} ${isActive ? styles.asideActive : ''}`}
                                to={`/categories/${id}`}>
                                {name}
                            </NavLink>
                        </li>
                    ))}

                </ul>
            </nav>
            <ul className={styles.asideFooter}>
                <li>
                    <a href="/help" target="_blank" className={styles.asideFooterLink}>help</a>
                </li>
                <li>
                    <a href="/terms" target="_blank" className={styles.asideFooterLink}>Terms & Conditions</a>
                </li>
            </ul>
        </aside>
    )
}