import { createSlice } from "@reduxjs/toolkit";

const TO_DO_LIST_SLICE_NAME = "todoList";

const initState = [
    {id: 1, name:"Learn Yoga", completed: false, priority:0},
    {id: 2, name:"Learn HTML", completed: false, priority:0},
    {id: 3, name:"Learn CSS", completed: true, priority:0},
    {id: 4, name:"Learn JS", completed: false, priority:0},
];

const todoListReducer = {
    addTodo: (state, action) => {
        state.unshift(action.payload);
    },
    delTodo: (state, action) => {
        state.splice(state.findIndex(obj => obj.id === action.payload), 1);
    },
    editTodo: (state, action) => {
        const editingTodo = state.find(todo => todo.id === action.payload.id);
        if(editingTodo) {
            editingTodo.name = action.payload.name;
        }
    },
    toggleTodoPriority: (state, action) => {
        const currentTodo = state.find(todo => todo.id === action.payload);
        if(currentTodo) {
            currentTodo.priority = 1-currentTodo.priority;
        }
    },
    toggleTodoStatus: (state, action) => {
        const currentTodo = state.find(todo => todo.id === action.payload);
        if(currentTodo) {
            currentTodo.completed = !currentTodo.completed;
        }
    },
};

export default createSlice({
    name: TO_DO_LIST_SLICE_NAME,
    initialState: initState,
    reducers: todoListReducer
});