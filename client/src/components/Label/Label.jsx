import React from 'react';

export const Label = ({title, name, pattern, minLength, maxLength}) => {
    return (
        <label className='label'>
            <span className='label__input-name'></span>
            <input className='label__input'  type={name} name={name} minLength={minLength || null} maxLength={maxLength || null}  placeholder={`Write ${title}`} pattern={pattern} required/>
            <span className='label__span-error'></span>
        </label>
    )
}