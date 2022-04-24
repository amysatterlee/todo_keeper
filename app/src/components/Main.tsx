import React, { useReducer, useEffect } from 'react';
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
    const togglePersist = () => {
        dispatch({ type: 'persist', payload: !state.persist })
    }
    useEffect(() => {
        dispatch({ type: 'fetch' });
    }, []);
    return (
        <ToDoList
            todos={state.todos}
            handleAdd={addToDo}
            handleDelete={deleteToDo}
            toggleDone={toggleDone}
            togglePersist={togglePersist}
            persist={state.persist}
        />
    )
}

export default Main;