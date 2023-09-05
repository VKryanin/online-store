import React, { useContext } from "react";
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
    const devices = useContext(DeviceContext)
    console.log(devices);
    return (
        <>
            <Header loggedIn={currentUser.loggedIn} logout={logout} />
            <section className="shop">
                <aside className="shop__filter">
                    <TypeBar deviceTypes={deviceTypes} setFilter={setFilter} />
                    < BrandBar deviceBrands={deviceBrands} setFilter={setFilter} />
                </aside>
                <main className="shop__content">
                    <DeviceList devices={devices} />

                </main>
            </section>
        </>
    )
}