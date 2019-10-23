import React, { useState } from 'react';

function UseForm(callback, data) {
    const [values, setValues] = useState(data);

    const handleChange = event => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        callback(values);
    }

    return {
        handleChange,
        handleSubmit,
        values
    }
}

export default UseForm;