import { createSelector } from '@reduxjs/toolkit'

export const searchTextSelector = state => state.filters.search;
export const filterStatusSelector = state => state.filters.status;
export const filterPrioritesSelector = state => state.filters.priorities;
export const todoListSelector = state => state.todoList;


export const todosRemainingSelector = createSelector(
    todoListSelector,
    searchTextSelector,
    filterStatusSelector,
    filterPrioritesSelector,
    (todoList, searchText, status, priorities) => {
        let condition = ''
        return todoList.filter((todo) => {
            if(status=='All') {
                condition = (
                    priorities.length ? 
                    todo.name.toLowerCase().includes(searchText.toLowerCase()) 
                    && priorities.includes(todo.priority) :
                    todo.name.includes(searchText)
                );
                return condition;
            }
            condition = (
                todo.name.includes(searchText) 
                && (status==="Completed" ? todo.completed : !todo.completed)
                && (priorities.length ? priorities.includes(todo.priority): true)
            );
            return condition;
        })
    }
)


