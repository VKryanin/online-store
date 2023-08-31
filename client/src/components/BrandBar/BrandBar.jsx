import React, { useState, useEffect } from "react";

export const BrandBar = (deviceBrands) => {
    const [selectedBrand, setSelectedBrand] = useState();

    useEffect(() => {
        setSelectedBrand(null);
    }, [deviceBrands]);

    const handleTypeClick = (brand) => {
        setSelectedBrand(brand);
    }

    console.log(deviceBrands);

    return (
        <ul className="sideBar__list">
            <h2 className="sideBar__title">Choose device brand</h2>
            {deviceBrands && deviceBrands.map((brand) =>
                <li
                    onClick={() => handleTypeClick(brand.name)}
                    active={selectedBrand === brand.name ? "true" : "false"}
                    key={brand.id}
                    className={selectedBrand === brand.name
                        ? "sideBar__item selected"
                        : "sideBar__item"}
                >
                    {brand.name}
                </li>
            )}
        </ul >
    )
}