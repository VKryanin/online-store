import React, { useState, useCallback } from "react";

export const useFormValidation = (
    initialValues = {},
    initialErrors = {},
    initialValid = false
) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialErrors);
    const [isValid, setValid] = useState(initialValid);

    const handleChange = useCallback((evt) => {
        const target = evt.target;
        const name = target.name;
        const value = target.value;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: target.validationMessage
        }));
        setValid(target.closest("form").checkValidity());
    }, []);

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setValid(newIsValid);
        },
        []
    );

    return { values, errors, isValid, handleChange, resetForm, setValues };
};