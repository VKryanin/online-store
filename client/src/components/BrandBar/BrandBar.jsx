import React, { useState, useEffect } from "react";

export const BrandBar = ({ deviceBrands }) => {
    const [selectedBrand, setSelectedBrand] = useState();

    const handleTypeClick = (brand) => {
        setSelectedBrand(brand);
    }

    return (
        <ul className="sideBar__list">
            <h2 className="sideBar__title">Choose device brand</h2>
            {deviceBrands && deviceBrands.map((brand) =>
                <li
                    className={
                        selectedBrand === brand.name
                            ? "sideBar__item selected"
                            : "sideBar__item"
                    }
                    active={
                        selectedBrand === brand.name
                            ? "true"
                            : "false"
                    }
                    key={brand.id}
                    onClick={() => handleTypeClick(brand.name)}
                >
                    {brand.name}
                </li>
            )}
        </ul >
    )
}