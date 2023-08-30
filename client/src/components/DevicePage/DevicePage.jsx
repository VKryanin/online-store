import React from "react";
import { Header } from "../Header/Header";
import { useParams } from 'react-router-dom';

export const DevicePage = ({ loggedIn, device }) => {
    const { id } = useParams();
    const deviceItem = device.find(item => (
        item.id === +id))
    return (
        <>
            <Header loggedIn={loggedIn} />
            {deviceItem && (
                <div>
                    <h2>{deviceItem.device}</h2>
                    <p>Другие свойства объекта</p>
                </div>
            )}
        </>
    )
}