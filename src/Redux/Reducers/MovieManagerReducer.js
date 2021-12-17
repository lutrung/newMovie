import { CHANGE_CODE_CINEMA, GET_BANNER_LIST, GET_CINEMA_BY_CODE, GET_CINEMA_SYSTEM, GET_MOVIES_LIST, GET_SHOW_SCHEDULE } from "../Const/MovieManagerConst";

const stateDefault = {
    bannerList: [],
    moviesList: [],
    cinemaSystem: [],
    cinemaByCode: [],
    showTimes: [],
    codeCinema: 'BHDStar'
}
const MovieManagerReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_BANNER_LIST: {
            state.bannerList = action.bannerList
            return { ...state }
        }
        case GET_MOVIES_LIST: {
            state.moviesList = action.moviesList
            return { ...state }
        }
        case GET_CINEMA_SYSTEM: {
            state.cinemaSystem = action.cinemaSystem
            return { ...state }
        }
        case GET_CINEMA_BY_CODE: {
            state.cinemaByCode = action.cinemaByCode
            return { ...state }
        }
        case GET_SHOW_SCHEDULE: {
            state.showTimes = action.showTimes
            return { ...state }
        }
        case CHANGE_CODE_CINEMA: {
            state.codeCinema = action.newCode
            return { ...state }
        }
        default: return { ...state }
    }
}

export default MovieManagerReducer;