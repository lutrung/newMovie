import { combineReducers } from "redux";
import MovieManagerReducer from './MovieManagerReducer'
import UserManagerReducer from './UserManagerReducer'
export const rootReducer = combineReducers({
    MovieManagerReducer,
    UserManagerReducer
})