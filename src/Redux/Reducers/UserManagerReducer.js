import { SIGN_IN } from "../Const/MovieManagerConst"

let userSignIn = {}
if (localStorage.getItem("USER_SIGNIN")) {
    userSignIn = JSON.parse(localStorage.getItem("USER_SIGNIN"));
}
const stateDefault = {
    userSignIn: userSignIn
}
const UserManagerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SIGN_IN: {
            state.userSignIn = action.userSignIn
            return { ...state }
        }
        default: return { ...state }
    }
}

export default UserManagerReducer;