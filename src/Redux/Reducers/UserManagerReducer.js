import { PERSONAL_INFO, SIGN_IN, USER_LIST, USER_UPDATE } from "../Const/MovieManagerConst"

let userSignIn = {}
if (localStorage.getItem("USER_SIGNIN")) {
    userSignIn = JSON.parse(localStorage.getItem("USER_SIGNIN"));
}
const stateDefault = {
    userSignIn: userSignIn,
    userList: [],
    userUpdate: {},
    personalInfo: {}
}
const UserManagerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SIGN_IN: {
            state.userSignIn = action.userSignIn
            return { ...state }
        }
        case USER_LIST: {
            state.userList = action.userList
            return { ...state }
        }
        case USER_UPDATE: {
            state.userUpdate = action.userUpdate
            return { ...state }
        }
        case PERSONAL_INFO: {
            state.personalInfo = action.personalInfo
            return { ...state }
        }
        default: return { ...state }
    }
}

export default UserManagerReducer;