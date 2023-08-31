import React from "react";
import { useNavigate } from "react-router-dom";


export const DeviceList = ({ devices }) => {
    const navigate = useNavigate();
    const OpenDevicePage = (id) => {
        navigate(`/device/${id}`)
    }
    return (
        <>
            <h3>Device</h3>
            <ul className="deviceList">
                {devices && devices.rows.map((device) =>
                    <li
                        key={device.id}
                        className="deviceList__item"
                        onClick={() => { OpenDevicePage(device.id) }}>
                        {device.name}
                    </li>
                )}
            </ul>
        </>

    )
}