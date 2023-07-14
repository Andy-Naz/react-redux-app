export function logger(store) {
    return function wrapDispatch(next) {
        return function handleAction(action) {
            // console.log(store)
            // console.log(next)
            // console.log(action)

            return next(action)
        }
    }
}
