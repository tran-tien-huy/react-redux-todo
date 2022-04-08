import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../Filters/filterSlice";
import todoListSlice from "../TodoList/todoSlice";

const store = configureStore({
    reducer: {
        filters: filterSlice.reducer,
        todoList: todoListSlice.reducer
    }
});

export default store;