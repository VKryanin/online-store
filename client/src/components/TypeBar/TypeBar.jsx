import React, { useState } from "react";

export const TypeBar = ({ deviceTypes, setFilter }) => {
    const [selectedType, setSelectedType] = useState();

    const handleTypeClick = (type) => {
        if (selectedType === type.name) {
            setSelectedType(undefined);
            setFilter(prev => ({
                ...prev,
                typeId: undefined
            }))

        } else {
            setSelectedType(type.name);
            setFilter(prev => ({
                ...prev,
                typeId: type.id
            }))
        }
    }

    console.log(deviceTypes);

    return (
        <ul className="sideBar__list">
            <h2 className="sideBar__title">Choose device type</h2>
            {deviceTypes && deviceTypes.map((type) => (
                <li
                    className={selectedType === type.name ? "sideBar__item selected" : "sideBar__item"}
                    active={selectedType === type.name ? "true" : "false"}
                    onClick={() => handleTypeClick(type)}
                    key={type.id}
                >
                    {type.name}
                </li>
            ))}
        </ul>
    )
}