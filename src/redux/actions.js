export const SET_TASKS = 'SET_TASKS';
export const SET_MONTH = 'SET_MONTH';
export const SET_YEAR = 'SET_YEAR';
export const SELECT_DAY = 'SELECT_DAY';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const SET_DATES_ARRAY = 'SET_DATES_ARRAY';


export function setTasks(tasks) {
    return {
        type: SET_TASKS,
        payload: {
            tasks,
        }
    }
}

export function setMonth(month) {
    return {
        type: SET_MONTH,
        payload: {
            month,
        }
    }
}

export function setYear(year) {
    return {
        type: SET_YEAR,
        payload: {
            year,
        }
    }
}

export function selectDay(date) {
    return {
        type: SELECT_DAY,
        payload: {
            selected: date,
        }
    }
}

export function clearSelection() {
    return {
        type: CLEAR_SELECTION,
        payload: {}
    }
}
