import { createSlice } from "@reduxjs/toolkit";

const initState = {
    search:"",
    status: 1,
    priority: 0,
};

const filterReducer = {
    searchFilterChange: (state, action) => {
        state.search = action.payload;
    },
    statusFilterChange: (state, action) => {
        state.status = action.payload;
    },
    prioritiesFilterChange: (state, action) => {
        state.priority = action.payload;
    }
}

export default createSlice(
    {
        name:"filters",
        initialState: initState,
        reducers: filterReducer
    }
);