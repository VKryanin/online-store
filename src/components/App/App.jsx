import React, { useEffect } from "react";
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
    const { isLoading } = useSelector(({ user }) => user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuth())
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(checkAuth())
    // }, [isLoading])

    console.log(isLoading, 'isLoading');

    // useEffect(() => {
    // dispatch(checkAuth())

    // }, [isLoading])


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