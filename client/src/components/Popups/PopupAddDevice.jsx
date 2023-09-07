import React, { useEffect, useState, useContext } from "react";
import { LabelItem } from "../LabelItem/LabelItem";
import { SelectedItem } from "../SelectedItem/SelectedItem";
import { DeviceTypeContext, DeviceBrandContext } from "../../context/DeviceContext";
import { useFormValidation } from "../../utils/validation";


export const PopupDevice = ({ setFormHidden, setPopupList, handleAddDevice }) => {
    const [info, setInfo] = useState([]);
    const deviceTypes = useContext(DeviceTypeContext);
    const deviceBrand = useContext(DeviceBrandContext);
    const [image, setImage] = useState()
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

    const loadImage = (e) => {
        const img = e.target.files[0]
        setImage(img)
    }

    function handleSubmit(e) {
        const { name, price, type, brand } = values;
        const newPrice = Number(price)
        const brandId = deviceBrand.find(item => item.name === brand).id;
        const typeId = deviceTypes.find(item => item.name === type).id;
        e.preventDefault();
        // console.log({ 'name': name, 'price': newPrice, 'img': image, 'brandId': brandId, 'typeId': typeId, 'info': info }, 'PopupDevice');
        handleAddDevice({ 'name': name, 'price': newPrice, 'img': image, 'brandId': brandId, 'typeId': typeId, 'info': info });
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
                        title="price"
                        name='price'
                        type={'number'}
                        onChange={handleChange}
                        values={values}
                        errors={errors}
                    />
                    <input
                        className="createItem__input"
                        title="img"
                        name='img'
                        type='file'
                        onChange={loadImage}
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