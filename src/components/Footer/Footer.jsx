import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import LOGO from '../../images/LOGO.svg'
import styles from './Footer.module.scss';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLogo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="Stuff" />
                </Link>
            </div>
            <h4 className={styles.footerRights}>
                Developed by{" "}
                <a
                    href="https://t.me/RJKvCyMbXo"
                    rel="noreferrer"
                    target="_blank"
                >
                    Soqa-dev
                </a>
            </h4>
            <nav className={styles.footerSocials}>
                <a
                    href="https://www.instagram.com/sooooooooooooooqa"
                    rel="noreferrer"
                    target="_blank"
                >
                    <svg className={styles.headerIcon}>
                        <use xlinkHref={`${process.env.PUBLIC_URL}/icons.svg#instagram`} />
                    </svg>
                </a>
            </nav>
        </footer>
    )
}