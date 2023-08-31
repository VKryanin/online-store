import React from "react";

export const SelectedItem = ({ title, deviceTypes, brands }) => {

    return (
        <label className="createItem__label">
            <select className="createItem__select" placeholder={title} defaultValue=''>
                <option className="createItem__option" value="" disabled>{`Choose ${title}`}</option>
                {
                    deviceTypes
                        ? deviceTypes.map((type, index) =>
                            <option className="createItem__option" key={index}>{type.name}</option>
                        )
                        : brands.map((brand, index) =>
                            <option className="createItem__option" key={index}>{brand.brand}</option>
                        )
                }
            </select>
        </label>

    )
}