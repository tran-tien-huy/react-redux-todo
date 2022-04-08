import { createSlice } from "@reduxjs/toolkit";

const TO_DO_LIST_SLICE_NAME = "todoList";

const initState = [
    {id: 1, name: "Learn Yoga", completed: false, priority:"High"},
    {id: 2, name: "Learn HTML", completed: false, priority:"High"},
    {id: 3, name: "Learn CSS", completed: true, priority:"Medium"},
    {id: 4, name: "Learn JS", completed: false, priority:"Low"},
];

const todoListReducer = {
    addTodo: (state, action) => {
        state.push(action.payload);
    },
    delTodo: (state, action) => {
        state.splice(state.findIndex(obj => obj.id === action.payload), 1);
    },
    editTodo: (state, action) => {
        const editingTodo = state.find(todo => todo.id === action.payload.id);
        if(editingTodo) {
            editingTodo.name = action.payload.name;
            editingTodo.priority = action.payload.priority;
        }
    },
    toggleTodoStatus: (state, action) => {
        const currentTodo = state.find(todo => todo.id === action.payload);
        if(currentTodo) {
            currentTodo.completed = !currentTodo.completed;
        }
    },
    duplicateTodo : () => {}
    
};

export default createSlice({
    name: TO_DO_LIST_SLICE_NAME,
    initialState: initState,
    reducers: todoListReducer
});