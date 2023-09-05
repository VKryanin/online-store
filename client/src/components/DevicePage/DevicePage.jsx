import React, { useEffect, useState, useContext } from "react";
import { Header } from "../Header/Header";
import { useParams } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import rate from '../../image/rating.svg';

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
            {deviceInfo && <main className="devicePage">
                <div className="devicePage__container">
                    <img
                        className="devicePage__image"
                        src={`${process.env.REACT_APP_API_URL}/${deviceInfo.img}`}
                        alt="img"
                    />
                    <div>
                        <h2 className="devicePage__title">{deviceInfo.name}</h2>
                        <div className="devicePage__rating">
                            {deviceInfo.rating}
                        </div>
                    </div>
                    <div className="devicePage__basket">
                        <p>{deviceInfo.price} руб.</p>
                    </div>
                </div>
                <p>Другие свойства объекта:</p>
                {
                    deviceInfo.info.map(item => <p key={item.id}>{`${item.title}: ${item.description}`}</p>)
                }
            </main>}

        </>
    );
};