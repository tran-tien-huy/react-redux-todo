// const initState = {
//         search:"",
//         status: "All",
//         priorities: []
// }
// const filtersReducer = (state = initState, action) => {
//     console.log("fiter reducer");
//     console.log("State ban dau", state);
//     console.log("Action ban dau", action);
//     switch(action.type) {
//         case "filters/searchFilterChange":
//             return {
//                 ...state,
//                 search: action.payload               
//             }
//         case "filters/statusFilterChange":
//             return {
//                 ...state,
//                 status: action.payload
//             }
//         case "filters/prioritiesFilterChange":
//             return {
//                 ...state,
//                 priorities: action.payload
//             }
//         default:
//             return state;
//     }
// }



import { createSlice } from "@reduxjs/toolkit";

const initState = {
    search:"",
    status: "All",
    priorities: []
};

const filterReducer = {
    searchFilterChange: (state, action) => {
        state.search = action.payload;
    },
    statusFilterChange: (state, action) => {
        state.status = action.payload;
    },
    prioritiesFilterChange: (state, action) => {
        state.priorities = action.payload;
    }
}

export default createSlice(
    {
        name:"filters",
        initialState: initState,
        reducers: filterReducer
    }
);