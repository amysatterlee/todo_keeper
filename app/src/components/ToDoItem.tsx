import React, { useState } from 'react';

interface Action {
    label: string;
    onClick: () => void;
}

interface Props {
    placeholder: string;
    initialValue: string;
    editing: boolean;
    handleSubmit?: (value: string) => void;
    actions?: Action[];
    complete: boolean;
}

const ToDoItem = ({
    placeholder,
    initialValue,
    editing,
    handleSubmit,
    actions,
    complete
}: Props) => {
    const [value, setValue] = useState<string>(initialValue);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [left, setLeft] = useState<number>(0);
    const handleChange = (e: any) => {
        setValue(e.target.value);
    }
    const handleBlur = () => {
        if (value.length > 0 && editing) {
            handleSubmit(value);
            setValue('');
        }
    }

    const handleMouseDown = (e: any) => {
        setLeft(e.clientX);
        setMenuOpen(true);
    }

    const handleKeyDown = (e: any) => {
        if (value.length > 0 && e.key === 'Enter') {
            handleSubmit(value);
            setValue('');
        }
    }

    const handleClick = (fnctn: () => void) => {
        setMenuOpen(false);
        fnctn();
    }
    return editing ? (
        <input
            className='to-do'
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
        />
    ) : (
        <>
            <div className={`to-do ${complete ? 'done': null}`} onMouseDown={handleMouseDown}>
                <i className='bullet'>*</i>
                <div className='text'>{value}</div>
            </div>
            {menuOpen && (
                <>
                    <div className='transparent-film' onClick={() => setMenuOpen(false)}/>
                    <div className='item-dropdown' style={{ left: `${left}px` }}>
                        {actions.map(item => (
                            <div
                                key={item.label}
                                className='action-item'
                                onClick={() => handleClick(item.onClick)}
                            >
                                {item.label}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default ToDoItem;