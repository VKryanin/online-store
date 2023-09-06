import React, { useEffect, useState, useContext } from "react";
import { Header } from "../Header/Header";
import { AddRating } from '../Popups/PopupFormAddRating'
import { Link, useParams } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext";

export const DevicePage = ({ getDevice, logout, handleAddRating }) => {
    const currentUser = useContext(CurrentUserContext);
    const { id } = useParams();
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        getDevice(id)
            .then(setDeviceInfo)
            .catch(e => console.error(e))
    }, [])
    return (
        <>
            <Header loggedIn={currentUser.loggedIn} logout={logout} />
            {deviceInfo &&
                <main className="devicePage">
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
                            <p className="devicePage__price">Стоимость: {deviceInfo.price} руб.</p>
                            <div className="devicePage__items">
                                <div className="devicePage__link_wrapper">
                                    <Link
                                        className="devicePage__link"
                                        to="/"
                                    >
                                        К списку товаров
                                    </Link>
                                </div>
                                {currentUser.isLoggedIn &&
                                    <button
                                        className="devicePage__button"
                                        onClick={() => setIsOpen(true)} >
                                        Добавить оценку
                                    </button>
                                }
                                <button className="devicePage__button">
                                    Добавить в корзину
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="devicePage__characteristics">Характеристики:</p>
                    <div className="devicePage__wrapper">
                        {
                            deviceInfo.info.map(item =>
                                <p className="devicePage__info" key={item.id}>
                                    {`${item.title.trim()}: ${item.description.trim()}`}
                                </p>
                            )
                        }
                    </div>
                    {isOpen &&
                        <AddRating setIsOpen={setIsOpen} handleAddRating={handleAddRating} deviceInfo={deviceInfo}/>
                    }
                </main>
            }
        </>
    );
};