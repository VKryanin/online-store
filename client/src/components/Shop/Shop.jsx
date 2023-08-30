import React, { useContext } from "react";
import { Header } from "../Header/Header";
import { TypeBar } from "../TypeBar/TypeBar";
import { BrandBar } from "../BrandBar/BrandBar";
import { DeviceList } from "../DeviceList/DeviceList";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { DeviceContext } from "../../context/DeviceContext";

export const Shop = ({ loggedIn, setCurrentUser, type, device, brands, logout }) => {
    const currentUser = useContext(CurrentUserContext);
    const deviceTypes = useContext(DeviceContext);

    return (
        <>
            <Header loggedIn={currentUser.loggedIn} setCurrentUser={setCurrentUser} logout={logout} />
            <section className="shop">
                <aside className="shop__filter">
                    <TypeBar type={type} deviceTypes={deviceTypes} />
                    < BrandBar brands={brands} />
                </aside>
                <main className="shop__content">
                    <DeviceList device={device} />
                </main>
            </section>
        </>
    )
}