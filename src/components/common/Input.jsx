import React from 'react';
import s from './common.module.css';

const Input = ({register, name, header, placeholder, warning, removeSort}) => {
    const removeInput = () => {
        name = name.split('.')[1];
        removeSort(name);
    }

    return (
        <div className={s.inputWrapper}>
            <label>
                <div className={s.header}>{header}</div>
                <div className={s.input}>
                    <input {...register(name)} placeholder={placeholder} autoComplete='off'/>
                    {typeof(removeSort) !== 'undefined' && <button className={s.removeBtn} onClick={() => {removeInput(name)}}>X</button>}
                </div>
            </label>
            {warning && <div className={s.warning}>{warning}</div>}
        </div>
    );
}

export default Input;