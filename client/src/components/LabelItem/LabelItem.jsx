import React from "react";

export const LabelItem = ({ title, name }) => {
    return (<>
        <label className="createItem__label">
            <span className="createItem__span"></span>
            <input className="createItem__input" name={name} placeholder={`Write to the device ${title}`}/>
            <span className='createItem__error'></span>
        </label>
    </>)
}