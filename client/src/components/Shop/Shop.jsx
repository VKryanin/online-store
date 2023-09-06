import React, { useContext, useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { TypeBar } from "../TypeBar/TypeBar";
import { BrandBar } from "../BrandBar/BrandBar";
import { DeviceList } from "../DeviceList/DeviceList";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { DeviceTypeContext, DeviceBrandContext, DeviceContext } from "../../context/DeviceContext";

export const Shop = ({ logout, setFilter }) => {
    const currentUser = useContext(CurrentUserContext);
    const deviceTypes = useContext(DeviceTypeContext);
    const deviceBrands = useContext(DeviceBrandContext);
    const devices = useContext(DeviceContext);
    const [pagesCount, setPagesCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    const pages = [];
    useEffect(() => {
        setPagesCount(devices && Math.ceil(devices.count / 9));
    }, [devices, triggerUpdate])

    for (let i = 0; i < pagesCount; i++) {
        pages.push(i + 1)
    }

    const setPage = (page) => {
        setFilter({ page: page })
        setCurrentPage(page)
        setTriggerUpdate(true);
    }

    return (
        <>
            <Header loggedIn={currentUser.loggedIn} logout={logout} />
            <section className="shop">
                <aside className="shop__filter">
                    <TypeBar deviceTypes={deviceTypes} setFilter={setFilter} />
                </aside>
                <main className="shop__content">
                    < BrandBar deviceBrands={deviceBrands} setFilter={setFilter} />
                    <DeviceList devices={devices} deviceBrands={deviceBrands} deviceTypes={deviceTypes} />
                    <ul className="shop__paggination">
                        {pages.map((page) => (
                            <li
                                key={page}
                                className={currentPage === page
                                    ? "shop__page shop__page_active"
                                    : "shop__page"}
                                onClick={() =>
                                    setPage(page)
                                }>
                                {page}
                            </li>
                        ))
                        }
                    </ul>
                </main>
            </section>
        </>
    )
}