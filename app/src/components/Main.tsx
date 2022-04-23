import React, { useReducer } from 'react';
import { ToDoReducer, initialState } from '../state/reducers/to-do-reducer';
import ToDoList from './ToDoList';
import { ToDo } from '../interfaces';

const Main = () => {
    const [state, dispatch] = useReducer(ToDoReducer, initialState);
    const addToDo = (value: string) => {
        dispatch({ type: 'add', payload: value });
    }
    const updateToDo = (todo: ToDo) => {
        dispatch({ type: 'update', payload: todo });
    }
    const deleteToDo = (id: string) => {
        dispatch({ type: 'delete', payload: id });
    }
    return <ToDoList todos={state.todos} handleAdd={addToDo} handleUpdate={updateToDo} handleDelete={deleteToDo}/>
}

export default Main;