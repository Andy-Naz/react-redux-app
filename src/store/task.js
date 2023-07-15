import { createSlice } from "@reduxjs/toolkit"
import todosService from "../services/todos.service"
import { setError } from "./errors"
const initialState = { entities: [], isLoading: true }

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        received(state, action) {
            // console.log("state", state)
            // console.log("received/action", action)
            state.entities = action.payload
            state.isLoading = false
            // console.log("received", state.entities)
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex((el) => el.id === action.payload.id)
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload,
            }
            // console.log("update", state.entities)
            // console.log("update index", state.entities[elementIndex])
        },
        add(state, action) {
            state.entities.push(action.payload)
            // state.isLoading = false
            // console.log("add", state.entities)
        },
        remove(state, action) {
            state.entities = state.entities.filter((el) => el.id !== action.payload.id)
            // console.log("remove", state.entities)
        },
        taskRequested(state) {
            state.isLoading = true
        },
        taskRequestFailed(state, action) {
            state.isLoading = false
        },
    },
})
const { actions, reducer: taskReducer } = taskSlice
const { update, remove, received, taskRequested, taskRequestFailed, add } = actions

export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested())
    try {
        const data = await todosService.fetch()
        dispatch(received(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const createTask = (task) => async (dispatch) => {
    // dispatch(taskRequested())
    try {
        const data = await todosService.create(task)
        dispatch(add(data))
    } catch (error) {
        dispatch(taskRequestFailed())
        dispatch(setError(error.message))
    }
}

export const completeTask = (id) => (dispatch, getState) => {
    dispatch(update({ id, completed: true }))
}

export function titleChanged(id) {
    return update({ id, title: `New title for ${id}` })
}
export function taskDeleted(id) {
    return remove({ id })
}

// export const getTasks = () => (state) => state.tasks.entities
export const getTasks = (state) => state.tasks.entities

// export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading
export const getTasksLoadingStatus = (state) => state.tasks.isLoading

export default taskReducer
