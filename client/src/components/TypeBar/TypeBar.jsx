import React, { useState } from "react";

export const TypeBar = ({ type }) => {
    const [selectedType, setSelectedType] = useState();
    const handleTypeClick = (type) => {
        setSelectedType(type);
    }
    return (
        <ul className="sideBar__list">
            <h2 className="sideBar__title">Choose device type</h2>
            {type.map((item, index) =>
                <li
                    onClick={() => handleTypeClick(item.type)}
                    active={selectedType === item.type ? "true" : "false"}
                    key={index}
                    className={selectedType === item.type
                        ? "sideBar__item selected"
                        : "sideBar__item"}>
                    {item.type}
                </li>
            )}
        </ul>
    )
}