import React from 'react';
import { ToDo } from '../interfaces';
import ToDoItem from './ToDoItem';

interface Props {
    todos: ToDo[];
    handleAdd: (value: string) => void;
    handleDelete: (id: string) => void;
    toggleDone: (id: string) => void;
    togglePersist: () => void;
    persist: boolean;
}

const ToDoList = ({ todos, handleAdd, handleDelete, toggleDone, togglePersist, persist }: Props) => {
    const placeholder = todos.length > 0 ? 'Type your next to do...' : 'Type your first to do...';
    const generateActions = (todo: ToDo) => [
        { label: 'Delete', onClick: () => handleDelete(todo.id) },
        { label: `${todo.done ? 'Revert' : 'Mark Done'}`, onClick: () => toggleDone(todo.id) }
    ];
    
    return (
        <div id='list-container'>
            <div className='in-a-row'>
                <h2>To Do List</h2>
                <label>save<input type='checkbox' checked={persist} onChange={togglePersist}/></label>
            </div>
            {todos.map(todo => (
                <ToDoItem
                    key={todo.id}
                    placeholder=''
                    initialValue={todo.item}
                    editing={false}
                    actions={generateActions(todo)}
                    complete={todo.done}
                />
            ))}
            <br/>
            <ToDoItem
                placeholder={placeholder}
                initialValue=''
                editing={true}
                handleSubmit={handleAdd}
                complete={false}
            />
        </div>
    );
}

export default ToDoList;