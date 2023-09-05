import React from "react";
import { useNavigate } from "react-router-dom";
import rate from '../../image/rating.svg'
import rateDis from '../../image/ratingDis.svg'

export const DeviceList = ({ devices, deviceBrands, deviceTypes }) => {
    const navigate = useNavigate();
    const OpenDevicePage = (id) => {
        navigate(`/device/${id}`);
    }
    const brandsMap = new Map(deviceBrands && deviceBrands.map(brand => [brand.id, brand.name]));
    const typeMap = new Map(deviceTypes && deviceTypes.map(type => [type.id, type.name]));
    return (
        <>
            <ul className="deviceList">
                {devices && devices.rows.map((device) =>
                    <li
                        key={device.id}
                        className="deviceList__item"
                    >
                        <img className="deviceList__image"
                            src={`${process.env.REACT_APP_API_URL}/${device.img}`}
                            alt=""
                            onClick={() => { OpenDevicePage(device.id) }} />
                        <div className="deviceList__wraper">
                            <h4 className="deviceList__title"
                                onClick={() => { OpenDevicePage(device.id) }}>
                                {typeMap.get(device.typeId)}
                            </h4>
                            <p className="deviceList__rating">
                                <img
                                    className="deviceList__icon"
                                    src={rate}
                                    alt="icon" />
                                {device.rating}
                            </p>
                        </div>
                        <h5 className="deviceList__model"
                            onClick={() => { OpenDevicePage(device.id) }}>
                            {brandsMap.get(device.brandId)} {device.name}
                        </h5>
                    </li>
                )}
            </ul>
        </>
    )
}