import React, { useState } from 'react';

interface Props {
    placeholder: string;
    initialValue: string;
    editing: boolean;
    handleSubmit: (value: string) => void;
    handleDelete?: () => void;
}

const ToDoItem = ({
    placeholder,
    initialValue,
    editing,
    handleSubmit,
    handleDelete
}: Props) => {
    const [value, setValue] = useState<string>(initialValue);
    const [editMode, setEditMode] = useState<boolean>(editing);
    const handleChange = (e: any) => {
        setValue(e.target.value);
    }
    const handleBlur = () => {
        if (value.length > 0 && editMode) {
            handleSubmit(value);
            setValue('');
        }
    }
    return editMode ? (
        <input
            className='to-do'
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            onBlur={handleBlur}
        />
    ) : (
        <div className='to-do'>
            <i className='fa fa-asterisk bullet' />
            <div className='text'>{value}</div>
            <button className='icon-button'>
                <i className='fa fa-check' />
            </button>
            <button className='icon-button' onClick={handleDelete}>
                <i className='fa fa-trash' />
            </button>
        </div>
    )
}

export default ToDoItem;