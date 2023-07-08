import { createAction } from "@reduxjs/toolkit"

const update = createAction("task/updated")
const remove = createAction("task/removed")

export function taskCompleted(id) {
    return update({ id, completed: true })
}
export function titleChanged(id) {
    return update({ id, title: `New title for ${id}` })
}
export function taskDeleted(id) {
    return remove({ id })
}

function taskReducer(state = [], action) {
    switch (action.type) {
        case update.type: {
            const elementIndex = state.findIndex((el) => el.id === action.payload.id)
            state[elementIndex] = {
                ...state[elementIndex],
                ...action.payload,
            }
            return state
        }
        case remove.type: {
            return state.filter((el) => el.id !== action.payload.id)
        }
        default:
            return state
    }
}

export default taskReducer
