import React, { useEffect, useState, useContext } from "react";
import { LabelItem } from "../LabelItem/LabelItem";
import { useFormValidation } from "../../utils/validation";

export const PopupAddType = ({
    setFormHidden,
    setPopupList,
    handleAddType }) => {
    const { values, errors, isValid, handleChange } = useFormValidation();
    const HideForm = () => {
        setFormHidden(true);
        setPopupList(prev => ({
            ...prev,
            addType: false
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        const { name } = values;
        handleAddType({ name: name })
        HideForm()
    }

    return (
        <form
            name='Add Type'
            className="createItem__form"
            onSubmit={handleSubmit}>
            <h3 className="createItem__title">Form add type</h3>
            <LabelItem
                title={"type"}
                name='name'
                type='name'
                onChange={handleChange}
                values={values}
                errors={errors} />
            <div>
                <button
                    disabled={!isValid ? true : false}
                    className={!isValid
                        ? 'createItem__button createItem__button_disabled'
                        : 'createItem__button'}
                    type="submit">
                    Add
                </button>
                <button
                    className="createItem__button"
                    onClick={() => HideForm()}>
                    Close
                </button>
            </div>
        </form>
    );
};