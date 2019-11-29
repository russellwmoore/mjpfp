import { combineReducers } from 'redux';
import {
    SET_TASKS,
    SET_DATE,
    SELECT_DAY,
    CLEAR_SELECTION,
} from './actions'


const initCalendarState = {
    date: 0,
    selected: null,
}

const initTasksState = {
    taskList: [],
}

function calendarReducer(state = initCalendarState, action) {
    switch (action.type) {
        case SET_DATE:
            return {...state, date: action.payload.date};
        case SELECT_DAY:
            return {...state, selected: action.payload.selected};
        case CLEAR_SELECTION:
            return {...state, selected: null};
        default:
            return state;

    }
}

function tasksReducer(state = initTasksState, action) {
    switch (action.type) {
        case SET_TASKS:
            return {...state, taskList: action.payload.taskList};
        default:
            return state;
    }
}

export default combineReducers({tasks: tasksReducer, calendar: calendarReducer});
