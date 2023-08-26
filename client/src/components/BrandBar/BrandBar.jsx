import React, { useState } from "react";

export const BrandBar = ({ brands }) => {
    const [selectedBrand, setSelectedBrand] = useState();
    const handleTypeClick = (brand) => {
        setSelectedBrand(brand);
    }

    return (
        <ul className="sideBar__list">
            <h2 className="sideBar__title">Choose device brand</h2>
            {brands.map((brand, index) =>
                <li
                    onClick={() => handleTypeClick(brand.brand)}
                    active={selectedBrand === brand.brand ? "true" : "false"}
                    key={index}
                    className={selectedBrand === brand.brand
                        ? "sideBar__item selected"
                        : "sideBar__item"}
                >
                    {brand.brand}
                </li>
            )}
        </ul>
    )
}