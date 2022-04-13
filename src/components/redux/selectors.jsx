import { createSelector } from '@reduxjs/toolkit'

export const searchTextSelector = state => state.filters.search;
export const filterStatusSelector = state => state.filters.status;
export const filterPrioritySelector = state => state.filters.priority;
export const todoListSelector = state => state.todoList;


export const todosRemainingSelector = createSelector(
    todoListSelector,
    searchTextSelector,
    filterStatusSelector,
    filterPrioritySelector,
    (todoList, searchText, status, priority) => {
        let condition = ''
        return todoList.filter((todo) => {
            let todoSearchCondition = todo.name.toLowerCase().includes(searchText.toLowerCase());
            let condition = '';
            if(status === 1) {
                condition = (
                    priority ? todoSearchCondition
                    && priority === todo.priority
                    : todoSearchCondition
                );
                return condition;
            }
            condition = todoSearchCondition
            && (status === 2 ? todo.completed: !todo.completed)
            && (priority ? priority === todo.priority: true);

            return condition;
        })
    }
)


