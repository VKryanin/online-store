import React from "react";
import { NavBar } from "../NavBar/NavBar";
import { TypeBar } from "../TypeBar/TypeBar";
import { BrandBar } from "../BrandBar/BrandBar";
import { DeviceList } from "../DeviceList/DeviceList";

export const Shop = ({ loggedIn, setLoggedIn, type, device, brands }) => {

    return (
        <>
            <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            <section className="shop">
                <aside className="shop__filter">
                    <TypeBar type={type} />
                    < BrandBar brands={brands} />
                </aside>
                <main className="shop__content">
                    <DeviceList device={device} />
                </main>
            </section>
        </>
    )
}