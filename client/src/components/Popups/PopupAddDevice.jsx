import React, { useEffect, useState, useContext } from "react";
import { LabelItem } from "../LabelItem/LabelItem";
import { SelectedItem } from "../SelectedItem/SelectedItem";
import { DeviceTypeContext, DeviceBrandContext } from "../../context/DeviceContext";

export const PopupDevice = ({ setFormHidden, setPopupList }) => {
    const [info, setInfo] = useState([]);
    const deviceTypes = useContext(DeviceTypeContext);
    const deviceBrand = useContext(DeviceBrandContext);
    const HideForm = () => {
        setFormHidden(true)
        setPopupList(prev => ({
            ...prev,
            addBrand: false
        }))
    }

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    return (
        <form name='Add Brand' className="createItem__form">
            <h3 className="createItem__title">Form add device</h3>
            <>
                <SelectedItem title={"brand"} deviceBrand={deviceBrand} />
                <SelectedItem title={"type"} deviceTypes={deviceTypes} />
                <LabelItem title={"name"} name='device-name' type={'name'} />
                <LabelItem title={"coast"} name='device-coast' type={'number'} />
                <LabelItem title={"image"} name='device-image' type={'file'} />
                <button onClick={(e) => { e.preventDefault(); addInfo() }}>Add info</button>
                {
                    info.map((i) =>
                        <div key={i.number + 1}>
                            <input type="text" placeholder="title" />
                            <input type="text" placeholder="desc" />
                            <button onClick={() => removeInfo(i.number)}>Delete</button>
                        </div>)
                }
            </>
            <div>
                <button className="createItem__button">Add</button>
                <button className="createItem__button" onClick={() => HideForm()}>Close</button>
            </div>
        </form>
    )
}