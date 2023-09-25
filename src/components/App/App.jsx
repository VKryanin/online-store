import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from './App.module.scss'
import { AppRoutes } from "../Routes/Routes";
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer'
import { Sidebar } from "../Sidebar/Sidebar";
import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from '../../features/products/productSlice'

export const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])
    return (
        <div className={styles.app}>
            <Header />
            <div className={styles.appContainer}>
                <Sidebar />
                <AppRoutes />
            </div>
            <Footer />
        </div>
    )
}