export const SET_TASKS = 'SET_TASKS';
export const SELECT_DAY = 'SELECT_DAY';
export const CLEAR_SELECTION = 'CLEAR_SELECTION';
export const SET_DATE = 'SET_DATE';


export function setTasks(taskList) {
    return {
        type: SET_TASKS,
        payload: {
            taskList,
        }
    }
}

export function setDate(date) {
    return {
        type: SET_DATE,
        payload: {
            date,
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
