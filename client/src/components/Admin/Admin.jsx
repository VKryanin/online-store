import React, { useState } from "react";
import { Header } from "../Header/Header";
import { CreateItem } from "../CreateItem/CreateItem";

export const Admin = ({ types, brands }) => {
    const [formHidden, setFormHidden] = useState(true);
    const [formFor, setFormFor] = useState('')
    const handleClick = () => {
        setFormHidden(false);
    }
    const ChooseForm = (type) => {
        setFormFor(type)
    }

    return (
        <>
            <Header />
            <section className="admin">
                <button className="admin__button" onClick={() => { handleClick(); ChooseForm('type') }}>add type</button>
                <button className="admin__button" onClick={() => { handleClick(); ChooseForm('brand') }}>add brand</button>
                <button className="admin__button" onClick={() => { handleClick(); ChooseForm('device') }}>add device</button>
            </section>
            {!formHidden && <CreateItem formHidden={formHidden} setFormHidden={setFormHidden} formFor={formFor} types={types} brands={brands} />}

        </>
    )
}