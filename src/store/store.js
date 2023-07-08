import { createStore } from "redux"
import taskReducer from "./task"

export function configureStore() {
    return createStore(taskReducer)
}
