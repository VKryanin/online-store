import React, { useContext } from "react";
import { Header } from "../Header/Header";
import { useParams } from 'react-router-dom';
import { DeviceContext } from "../../context/DeviceContext";



export const DevicePage = ({ loggedIn }) => {
    const devices = useContext(DeviceContext)
    const { id } = useParams();
    const deviceList = devices && devices.rows.map(device => device)
    const deviceItem = deviceList && deviceList.find(item => item.id === +id)
    return (
        <>
            <Header loggedIn={loggedIn} />
            {deviceItem && (
                <div>
                    <h2>{deviceItem.name}</h2>
                    <p>Другие свойства объекта:</p>
                    <p>Brand ID: {deviceItem.brandId}</p>
                    <p>Created At: {deviceItem.createdAt}</p>
                    <p>Image: {deviceItem.img}</p>
                    <p>Price: {deviceItem.price}</p>
                    <p>Rating: {deviceItem.rating}</p>
                    <p>Type ID: {deviceItem.typeId}</p>
                    <p>Updated At: {deviceItem.updatedAt}</p>
                </div>
            )}
        </>
    )
}