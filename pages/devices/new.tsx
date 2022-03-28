import useFormData from 'hooks/useFormData';
import React from 'react'

const newDevice = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { form, formData, updateFormData } = useFormData(null);
    const submitForm = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <h2>New Device</h2>
            <form ref={form} onChange= {updateFormData} onSubmit={submitForm}>
                <input name='name' type='text'></input>
                <button></button>
            </form>
        </div>

    )
}

export default newDevice;
