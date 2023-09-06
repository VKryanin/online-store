import React, { useState } from "react";

export const AddRating = ({ setIsOpen, handleAddRating, deviceInfo }) => {
    const [rating, setRating] = useState(1);
    const handleInputChange = (event) => {
        const value = event.target.value;
        const filteredValue = value.replace(/[^\d]/g, "");
        const validatedValue = Math.min(Math.max(filteredValue, 1), 5);
        setRating(validatedValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(rating, deviceInfo.id, 'AddRating popup');
        handleAddRating({ rating: rating, id: deviceInfo.id })
    };

    return (
        <div className="popup__rate">
            <form className="popup__form_rate" onSubmit={handleSubmit}>
                <input
                    className="popup__form_rate_input"
                    type="text"
                    placeholder="Оцените товар"
                    value={rating}
                    onChange={handleInputChange}
                    required
                />
                <div className="devicePage__button_wrapper">
                    <button className="devicePage__button" type="submit">
                        Добавить оценку
                    </button>
                    <span></span>
                    <button
                        className="devicePage__button_close"
                        onClick={() => setIsOpen(false)}
                    >
                        Закрыть
                    </button>
                </div>
            </form>
        </div>
    );
};