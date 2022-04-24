import React, { useReducer } from 'react';
import { ToDoReducer, initialState } from '../state/reducers/to-do-reducer';
import ToDoList from './ToDoList';

const Main = () => {
    const [state, dispatch] = useReducer(ToDoReducer, initialState);
    const addToDo = (value: string) => {
        dispatch({ type: 'add', payload: value });
    }
    const deleteToDo = (id: string) => {
        dispatch({ type: 'delete', payload: id });
    }
    const toggleDone = (id: string) => {
        dispatch({ type: 'toggle', payload: id });
    }
    return (
        <ToDoList
            todos={state.todos}
            handleAdd={addToDo}
            handleDelete={deleteToDo}
            toggleDone={toggleDone}
        />
    )
}

export default Main;