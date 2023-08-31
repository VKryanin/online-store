import React, { useEffect, useState, useContext } from "react";
import { LabelItem } from "../LabelItem/LabelItem";
import { SelectedItem } from "../SelectedItem/SelectedItem";
import { DeviceTypeContext } from "../../context/DeviceContext";

export const CreateItem = ({ formHidden, setFormHidden, formFor, brands }) => {
    const [info, setInfo] = useState([]);
    const deviceTypes = useContext(DeviceTypeContext);
    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const HideForm = () => {
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

    return <div className="createItem">
        <form name={formFor} className="createItem__form">
            <h3 className="createItem__title">Form add {formFor}</h3>
            {formFor === 'type'
                ? (<LabelItem title={"type"} name={formFor} type={'name'} />)
                : (formFor === 'brand'
                    ? <LabelItem title={"brand"} name={formFor} type={'name'} />
                    : <>
                        <SelectedItem title={"brand"} brands={brands} />
                        <SelectedItem title={"type"} deviceTypes={deviceTypes}/>
                        <LabelItem title={"name"} name={formFor} type={'name'} />
                        <LabelItem title={"coast"} name={`${formFor} coast`} type={'number'} />
                        <LabelItem title={"image"} name={`${formFor} image`} type={'file'} />
                        <button onClick={(e) => { e.preventDefault(); addInfo() }}>Add info</button>
                        {
                            info.map((i, index) =>
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
                <button className="createItem__button">Add</button>
                <button className="createItem__button" onClick={() => HideForm()}>Close</button>
            </div>
        </form >
    </div >
}
