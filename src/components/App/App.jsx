import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from './App.module.scss'

import { AppRoutes } from "../Routes/Routes";
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer'
import { Sidebar } from "../Sidebar/Sidebar";
import { UserForm } from "../User/UserForm";

import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from '../../features/products/productSlice'
import { checkAuth } from "../../features/user/userSlice";


export const App = () => {
    const jwt = useSelector((state) => state.jwt);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])

    useEffect(() => {
        dispatch(checkAuth())
        console.log(jwt);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [jwt])

    return (
        <div className={styles.app}>
            <Header />
            <UserForm />
            <div className={styles.appContainer}>
                <Sidebar />
                <AppRoutes />
            </div>
            <Footer />
        </div>
    )
}