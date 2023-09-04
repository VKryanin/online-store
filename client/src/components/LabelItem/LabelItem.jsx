import React from "react";

export const LabelItem = ({ title, name, type, onChange, values, errors }) => {
    return (<>
        <label className="createItem__label">
            <span className="createItem__span"></span>
            <input
                className="createItem__input"
                type={type}
                name={name}
                placeholder={`Write to the device ${title}`}
                value={values[name] || ''}
                onChange={onChange}
                autoComplete={name}
                required
            />
            <span className='createItem__error'>{errors[name]}</span>
        </label>
    </>);
};