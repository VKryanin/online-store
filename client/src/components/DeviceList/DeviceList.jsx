import React from "react";
import { useNavigate } from "react-router-dom";


export const DeviceList = ({ device }) => {
    const navigate = useNavigate();
    const OpenDevicePage = (id) => {
        navigate(`/device/${id}`)
    }
    return (
        <>
            <h3>Device</h3>
            <ul className="deviceList">

                {device.map((device, index) =>
                    <li key={index} className="deviceList__item" onClick={() => { OpenDevicePage(index) }}>{device.device}</li>
                )}
            </ul>
        </>

    )
}