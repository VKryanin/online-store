import React, { useEffect, useState, useContext } from "react";
import { Header } from "../Header/Header";
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext";

export const DevicePage = ({ setCurrentUser, getDevice, logout }) => {
    const currentUser = useContext(CurrentUserContext);
    const { id } = useParams();
    const [deviceInfo, setDeviceInfo] = useState(null);

    useEffect(() => {
        getDevice(id)
            .then(setDeviceInfo)
            .catch(e => console.error(e))
    }, [])
    return (
        <>
            <Header loggedIn={currentUser.loggedIn} logout={logout} />
            {deviceInfo && <div >
                <h2>{deviceInfo.name}</h2>
                <p>Другие свойства объекта:</p>
                <p>Brand ID: {deviceInfo.brandId}</p>
                {
                    deviceInfo.info.map(item => <p key={item.id}>{`${item.title}: ${item.description}`}</p>)
                }
                <img src={`${process.env.REACT_APP_API_URL}/${deviceInfo.img}`} alt="img" />
                <p>Price: {deviceInfo.price}</p>
                <p>Rating: {deviceInfo.rating}</p>
                <p>Type ID: {deviceInfo.typeId}</p>
            </div>}

        </>
    );
};