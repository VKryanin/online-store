import React, { useState } from "react";

export const BrandBar = ({ deviceBrands, setFilter }) => {
    const [selectedBrand, setSelectedBrand] = useState();

    const handleTypeClick = (brand) => {
        if (selectedBrand === brand.name) {
            setSelectedBrand(undefined);
            setFilter(prev => ({
                ...prev,
                brandId: undefined
            }))
        } else {
            setSelectedBrand(brand.name);
            setFilter(prev => ({
                ...prev,
                brandId: brand.id
            }))
        }
    }

    return (
        <ul className="sideBar__list brands">
            {deviceBrands && deviceBrands.map((brand) =>
                <li
                    className={
                        selectedBrand === brand.name
                            ? "sideBar__item selected brand"
                            : "sideBar__item brand"
                    }
                    active={
                        selectedBrand === brand.name
                            ? "true"
                            : "false"
                    }
                    key={brand.id}
                    onClick={() => handleTypeClick(brand)}
                >
                    {brand.name}
                </li>
            )}
        </ul >
    )
}