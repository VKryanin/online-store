import React from "react";
import { NavBar } from "../NavBar/NavBar";
import { useParams } from 'react-router-dom';

export const DevicePage = ({ loggedIn, device }) => {
    const { id } = useParams();
    const deviceItem = device.find(item => (
        item.id === +id))
    return (
        <>
            <NavBar loggedIn={loggedIn} />
            {deviceItem && (
                <div>
                    <h2>{deviceItem.device}</h2>
                    <p>Другие свойства объекта</p>
                </div>
            )}
        </>
    )
}