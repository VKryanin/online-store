import React from "react";

export const SelectedItem = ({ title, deviceTypes, deviceBrand, onChange, values, errors }) => {

    return (
        <label className="createItem__label">
            <select className="createItem__select"
                placeholder={title}
                defaultValue=''
                onChange={onChange}
                name={title.toLowerCase()}
            >
                <option
                    className="createItem__option"
                    value=""
                    disabled>
                    {`Choose ${title}`}

                </option>
                {
                    deviceTypes
                        ? deviceTypes.map((type) =>
                            <option
                                className="createItem__option"
                                key={type.id}
                            >
                                {type.name}
                            </option>
                        )
                        : deviceBrand.map((brand) =>
                            <option
                                className="createItem__option"
                                key={brand.id}>
                                {brand.name}
                            </option>
                        )
                }
            </select>
        </label>
    )
}