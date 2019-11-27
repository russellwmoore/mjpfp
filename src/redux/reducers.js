import { combineReducers } from 'redux';
import {
    SET_TASKS,
    SET_MONTH,
    SET_YEAR,
    SELECT_DAY,
    CLEAR_SELECTION,
} from './actions'


const initCalendarState = {
    year: 0,
    month: 0,
    selected: null,
    datesArr: [],
}

const initTasksState = {
    tasks: [],
}

function calendarReducer(state = initCalendarState, action) {
    switch (action.type) {
        case SET_MONTH:
            return {...state, month: action.payload.month};
        case SET_YEAR:
            return {...state, year: action.payload.year};
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
            return {...state, tasks: action.payload.tasks};
        default:
            return state;
    }
}

export default combineReducers({tasks: tasksReducer, calendar: calendarReducer});
