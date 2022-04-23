import React from 'react';
import { ToDo } from '../interfaces';
import ToDoItem from './ToDoItem';

interface Props {
    todos: ToDo[];
    handleAdd: (value: string) => void;
    handleUpdate: (todo: ToDo) => void;
    handleDelete: (id: string) => void;
}

const ToDoList = ({ todos, handleAdd, handleUpdate, handleDelete }: Props) => {
    const placeholder = todos.length > 0 ? 'Type your next to do...' : 'Type your first to do...';
    
    return (
        <div id='list-container'>
            <h2>To Do List</h2>
            {todos.map(todo => (
                <ToDoItem
                    key={todo.id}
                    placeholder=''
                    initialValue={todo.item}
                    editing={false}
                    handleSubmit={(val) => handleUpdate({ ...todo, item: val })}
                    handleDelete={() => handleDelete(todo.id)}
                />
            ))}
            <ToDoItem
                placeholder={placeholder}
                initialValue=''
                editing={true}
                handleSubmit={handleAdd}
            />
        </div>
    );
}

export default ToDoList;