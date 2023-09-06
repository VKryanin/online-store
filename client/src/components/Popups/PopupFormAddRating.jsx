import React, { useState } from "react";

export const AddRating = ({ setIsOpen, handleAddRating, deviceInfo, handleSubmit }) => {
    const [rating, setRating] = useState(1);
    const handleInputChange = (event) => {
        const value = event.target.value;
        const filteredValue = value.replace(/[^\d]/g, "");
        const validatedValue = Math.min(Math.max(filteredValue, 1), 5);
        setRating(validatedValue);
    };



    return (
        <div className="popup__rate">
            <form className="popup__form_rate" onSubmit={(event) => handleSubmit(event, rating, deviceInfo.id)}>
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