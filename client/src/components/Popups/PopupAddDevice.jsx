import React, { useEffect, useState, useContext } from "react";
import { LabelItem } from "../LabelItem/LabelItem";
import { SelectedItem } from "../SelectedItem/SelectedItem";
import { DeviceTypeContext, DeviceBrandContext } from "../../context/DeviceContext";
import { useFormValidation } from "../../utils/validation";


export const PopupDevice = ({ setFormHidden, setPopupList, handleAddDevice }) => {
    const [info, setInfo] = useState([]);
    const deviceTypes = useContext(DeviceTypeContext);
    const deviceBrand = useContext(DeviceBrandContext);
    const { values, errors, isValid, handleChange, handleSelectChange } = useFormValidation();
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

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }


    function handleSubmit(e) {
        const { name, image, coast, type, brand } = values;
        const newCoast = Number(coast)
        const brandId = deviceBrand.find(item => item.name === brand).id;
        const typeId = deviceTypes.find(item => item.name === type).id;
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('name', name)
        // formData.append('price', newCoast)
        // formData.append('img', image)
        // formData.append('brandId', brandId)
        // formData.append('typeId', typeId)
        // formData.append('info', JSON.stringify(info))
        console.log({ 'name': name, 'price': coast, 'img': image, 'brandId': brandId, 'typeId': typeId, 'info': info });
        handleAddDevice(values);
        HideForm()
    }

    return (
        <div className="createItem__wrapper">
            <form
                name='Add Brand'
                className="createItem__form"
                onSubmit={handleSubmit}
            >
                <h3 className="createItem__title">Form add device</h3>
                <>
                    <SelectedItem
                        title={"brand"}
                        deviceBrand={deviceBrand}
                        values={values}
                        errors={errors}
                        onChange={handleSelectChange} />
                    <SelectedItem title={"type"}
                        deviceTypes={deviceTypes}
                        values={values}
                        errors={errors}
                        onChange={handleSelectChange} />
                    <LabelItem
                        title="name"
                        name='name'
                        type={'name'}
                        onChange={handleChange}
                        values={values}
                        errors={errors}
                    />
                    <LabelItem
                        title="coast"
                        name='coast'
                        type={'number'}
                        onChange={handleChange}
                        values={values}
                        errors={errors}
                    />
                    <LabelItem
                        title="image"
                        name='image'
                        type='file'
                        onChange={handleChange}
                        values={values}
                        errors={errors}
                    />
                </>
                <button onClick={(e) => { e.preventDefault(); addInfo() }}>Add info</button>
                {
                    info.map((i) =>
                        <div key={i.number + 1}>
                            <input type="text" placeholder="title" value={i.title} onChange={(e) => changeInfo('title', e.target.value, i.number)} />
                            <input type="text" placeholder="desc" value={i.description} onChange={(e) => changeInfo('description', e.target.value, i.number)} />
                            <button onClick={() => removeInfo(i.number)}>Delete</button>
                        </div>)
                }
            </form>
            <div>
                <button
                    className="createItem__button"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Add
                </button>
                <button
                    className="createItem__button"
                    onClick={() => HideForm()}>
                    Close
                </button>
            </div>
        </div>
    )
}