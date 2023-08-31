import React, { useContext, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { CreateItem } from "../CreateItem/CreateItem";


export const Admin = ({ handleAddType, handleAddBrand }) => {
    const [formHidden, setFormHidden] = useState(true);
    const [formFor, setFormFor] = useState('');


    const handleClick = () => {
        setFormHidden(false);
        // setHandle(handleForm)
    }
    const ChooseForm = (type) => {
        setFormFor(type)
    }

    return (
        <>
            <Header />
            <section className="admin">
                <button className="admin__button" onClick={() => { handleClick(); ChooseForm('Type') }}>add type</button>
                <button className="admin__button" onClick={() => { handleClick(); ChooseForm('Brand') }}>add brand</button>
                <button className="admin__button" onClick={() => { handleClick(); ChooseForm('Device') }}>add device</button>
            </section>
            {!formHidden && <CreateItem formHidden={formHidden} setFormHidden={setFormHidden} formFor={formFor}  />}

        </>
    )
}