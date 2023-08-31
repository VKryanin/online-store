import React, { useEffect, useState, useContext } from "react";
import { LabelItem } from "../LabelItem/LabelItem";
import { SelectedItem } from "../SelectedItem/SelectedItem";
import { DeviceTypeContext, DeviceBrandContext } from "../../context/DeviceContext";

export const CreateItem = ({ setFormHidden, formFor, handleForm }) => {
    const [info, setInfo] = useState([]);
    const deviceTypes = useContext(DeviceTypeContext);
    const deviceBrand = useContext(DeviceBrandContext);
    const [deviceData, setDeviceData] = useState({})
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const HideForm = (e) => {
        e.preventDefault()
        setFormHidden(true)
    }
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.keyCode === 27) {
                setFormHidden(true);
            }
        }
        const handleClickOutside = (event) => {
            if (event.target.classList.contains("createItem")) {
                setFormHidden(true);
            }
        }
        document.addEventListener("keydown", handleEscape);
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("click", handleClickOutside);
        }
    }, [setFormHidden]);

    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return <div className="createItem">
        <form name={formFor} className="createItem__form">
            <h3 className="createItem__title">Form add {formFor}</h3>
            {formFor === 'Type'
                ? (<LabelItem
                    title={"type"}
                    name={formFor}
                    type={'name'}
                    value={deviceData.name || ''}
                    onChange={e =>
                        setDeviceData(prev => (
                            {
                                ...prev,
                                name: e.target.value
                            }
                        ))
                    }
                />)
                : (formFor === 'Brand'
                    ? <LabelItem
                        title={"brand"}
                        name={formFor}
                        type={'name'}
                        value={deviceData.name || ''}
                        onChange={e =>
                            setDeviceData(prev => (
                                {
                                    ...prev,
                                    name: e.target.value
                                }
                            ))
                        }
                    />
                    : <>
                        <SelectedItem
                            title={"brand"}
                            deviceBrand={deviceBrand}
                            value={deviceData.brand || ''}
                            onChange={e =>
                                setDeviceData(prev => (
                                    {
                                        ...prev,
                                        brand: e.target.value
                                    }
                                ))
                            }
                        />
                        <SelectedItem
                            title={"type"}
                            deviceTypes={deviceTypes}
                            value={deviceData.type || ''}
                            onChange={e =>
                                setDeviceData(prev => (
                                    {
                                        ...prev,
                                        type: e.target.value
                                    }
                                ))
                            }
                        />
                        <LabelItem
                            title={"name"}
                            name={formFor}
                            type={'name'}
                            value={deviceData.name || ''}
                            onChange={e =>
                                setDeviceData(prev => (
                                    {
                                        ...prev,
                                        name: e.target.value
                                    }
                                ))
                            }
                        />
                        <LabelItem
                            title={"coast"}
                            name={`${formFor} coast`}
                            type={'number'}
                            value={deviceData.coast || ''}
                            onChange={e =>
                                setDeviceData(prev => (
                                    {
                                        ...prev,
                                        coast: e.target.value
                                    }
                                ))
                            }
                        />
                        <LabelItem
                            title={"image"}
                            name={`${formFor} image`}
                            type={'file'}
                            value={deviceData.link || ''}
                            onChange={e =>
                                setDeviceData(prev => (
                                    {
                                        ...prev,
                                        link: e.target.value
                                    }
                                ))
                            }
                        />
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
                )
            }
            <div>
                <button className="createItem__button" onClick={(e) => handleSubmit(e)}>Add</button>
                <button className="createItem__button" onClick={(e) => HideForm(e)}>Close</button>
            </div>
        </form >
    </div >
}
