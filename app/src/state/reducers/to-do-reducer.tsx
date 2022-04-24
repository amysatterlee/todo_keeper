import { v4 } from 'uuid';
import { ToDo } from '../../interfaces';

export const initialState = {
    todos: [] as ToDo[]
};

interface State {
    todos: ToDo[];
}

interface Action {
    type: string;
    payload: any;
}

export const ToDoReducer = (state: State, action: Action) => {
    let newState;
    let newToDos;
    switch(action.type) {
        case 'add':
            console.log('adding');
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
        default:
            newState = Object.assign({}, state);
            break;
    }
    return newState;
}