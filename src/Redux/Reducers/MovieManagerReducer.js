import { CHANGE_CODE_CINEMA, GET_BANNER_LIST, GET_CINEMA_BY_CODE, GET_CINEMA_SYSTEM, GET_MOVIES_LIST, GET_MOVIE_DETAILS, GET_SHOW_SCHEDULE, GET_TICKET_ROOM } from "../Const/MovieManagerConst";

const stateDefault = {
    bannerList: [],
    moviesList: [],
    cinemaSystem: [],
    cinemaByCode: [],
    showTimes: [],
    codeCinema: 'BHDStar',
    movieDetails: {},
    ticketRoom: {},
    listBookingSeat: []
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
        case GET_MOVIE_DETAILS: {
            state.movieDetails = action.movieDetails
            return { ...state }
        }
        case GET_TICKET_ROOM: {
            state.ticketRoom = action.ticketRoom
            return { ...state }
        }
        case "BOOKING_SEAT": {
            let mangGheDaDang = [...state.listBookingSeat]
            let index = mangGheDaDang.findIndex(gheDangDat => gheDangDat.maGhe === action.gheDangDat.maGhe)
            if (index !== -1) {
                mangGheDaDang.splice(index, 1)
            } else {
                mangGheDaDang.push(action.gheDangDat)
            }
            state.listBookingSeat = mangGheDaDang
            return { ...state };
        }
        default: return { ...state }
    }
}

export default MovieManagerReducer;