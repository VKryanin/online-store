import React, { useContext, useState } from "react";
import { Header } from "../Header/Header";
import { PopupAddType } from "../Popups/PopupAddType";
import { PopupAddBrand } from "../Popups/PopupAddBrand";
import { PopupDevice } from "../Popups/PopupAddDevice";

export const Admin = ({handleAddType, handleAddBrand}) => {
    const [formHidden, setFormHidden] = useState(true);
    const [popupList, setPopupList] = useState({ addType: false, addBrand: false, addDevice: false })

    const handleClick = (popupName) => {
        setFormHidden(false);
        setPopupList(prev => ({
            ...prev,
            [popupName]: true
        }))
    }


    return (
        <>
            <Header />
            <section className="admin">
                <button className="admin__button" onClick={() => { handleClick('addType') }}>add type</button>
                <button className="admin__button" onClick={() => { handleClick('addBrand') }}>add brand</button>
                <button className="admin__button" onClick={() => { handleClick('addDevice') }}>add device</button>
            </section>
            {!formHidden && <div className="createItem">
                {popupList.addType && <PopupAddType setFormHidden={setFormHidden} setPopupList={setPopupList} handleAddType={handleAddType} />}
                {popupList.addBrand && <PopupAddBrand setFormHidden={setFormHidden} setPopupList={setPopupList} handleAddBrand={handleAddBrand}/>}
                {popupList.addDevice && <PopupDevice setFormHidden={setFormHidden} setPopupList={setPopupList} />}
            </div >}
        </>
    )
}