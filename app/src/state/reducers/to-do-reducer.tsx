import { v4 } from 'uuid';
import { ToDo } from '../../interfaces';

export const initialState = {
    todos: [] as ToDo[],
    persist: false
};

interface State {
    todos: ToDo[];
    persist: boolean;
}

interface Action {
    type: string;
    payload?: any;
}

const persistLocally = (state: State) => {
    window.localStorage.setItem('as_todo_keeper_state', JSON.stringify(state));
}

const destroyLocally = () => {
    window.localStorage.removeItem('as_todo_keeper_state');
}

const readLocally = () => {
    const state = window.localStorage.getItem('as_todo_keeper_state');
    if (state) { return JSON.parse(state); }
}

export const ToDoReducer = (state: State, action: Action) => {
    let newState;
    let newToDos;
    switch(action.type) {
        case 'fetch':
            newState = readLocally() || initialState;
            break;
        case 'add':
            newState = { ...state, todos: [ ...state.todos, { id: v4(), item: action.payload, done: false } ] };
            break;
        case 'update':
            newToDos = state.todos.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            newState = { ...state, todos: newToDos };
            break;
        case 'delete':
            newState = { ...state, todos: state.todos.filter(item => item.id !== action.payload) };
            break;
        case 'toggle':
            newToDos = state.todos.map(item => {
                if (item.id === action.payload) {
                    return { ...item, done: !item.done };
                }
                return item;
            })
            newState = { ...state, todos: newToDos };
            break;
        case 'persist':
            newState = { ...state, persist: action.payload };
            break;
        default:
            newState = Object.assign({}, state);
            break;
    }
    if (newState.persist) {
        persistLocally(newState);
    } else if (action.type === 'persist') {
        destroyLocally();
    }
    return newState;
}