import React, { useState, useEffect } from "react";

export const TypeBar = ({ deviceTypes }) => {
    const [selectedType, setSelectedType] = useState();

    const handleTypeClick = (type) => {
        setSelectedType(type);
    }

    return (
        <ul className="sideBar__list">
            <h2 className="sideBar__title">Choose device type</h2>
            {deviceTypes && deviceTypes.map((type) => (
                <li
                    className={
                        selectedType === type.name
                            ? "sideBar__item selected"
                            : "sideBar__item"
                    }
                    active={
                        selectedType === type.name
                            ? "true"
                            : "false"
                    }
                    onClick={() => handleTypeClick(type.name)}
                    key={type.id}
                >
                    {type.name}
                </li>
            ))
            }
        </ul>
    )
}