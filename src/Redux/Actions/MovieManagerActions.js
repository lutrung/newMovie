import Axios from 'axios'
import { CHANGE_CODE_CINEMA, GET_BANNER_LIST, GET_CINEMA_BY_CODE, GET_CINEMA_SYSTEM, GET_MOVIES_LIST, GET_MOVIE_DETAILS, GET_SHOW_SCHEDULE } from '../Const/MovieManagerConst'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNSIsIkhldEhhblN0cmluZyI6IjIwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NTY4MzIwMDAwMCIsIm5iZiI6MTYyNjI4MjAwMCwiZXhwIjoxNjU1ODMwODAwfQ.p47FFJpArherjwlM71xTzdulAQIW37pR6fRGD3t3Ji0'
export const getBannerList = () => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner',
                method: 'GET',
                headers: {
                    TokenCybersoft: token
                }

            }).then((result) => {
                dispatch({
                    type: GET_BANNER_LIST,
                    bannerList: result.data.content
                })
            })
        } catch (err) {
            console.log('Thất bại', err.response)
        }
    }
}
export const getMovieList = () => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
                method: 'GET',
                headers: {
                    TokenCybersoft: token
                }
            })
            dispatch({
                type: GET_MOVIES_LIST,
                moviesList: result.data.content
            })
        } catch (error) {
            console.log('Thất bại', error.response)
        }
    }
}
export const getCinemaSystem = () => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap',
                method: 'GET',
                headers: {
                    TokenCybersoft: token
                }
            })
            dispatch({
                type: GET_CINEMA_SYSTEM,
                cinemaSystem: result.data.content
            })
        } catch (error) {
            console.log('Thất bại', error.response)
        }
    }
}
export const getTheTheaterClusterByCode = (code) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${code}`,
                method: 'GET',
                headers: {
                    TokenCybersoft: token
                }
            })
            dispatch({
                type: GET_CINEMA_BY_CODE,
                cinemaByCode: result.data.content
            })
        } catch (error) {
            console.log('Thất bại', error.response)
        }
    }
}
export const getShowSchedule = (code) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${code}&maNhom=GP01`,
                method: 'GET',
                headers: {
                    TokenCybersoft: token
                }
            })
            dispatch({
                type: GET_SHOW_SCHEDULE,
                showTimes: result.data.content
            })
        } catch (error) {
            console.log('Thất bại', error.response)
        }
    }
}
export const changeCodeCluster = (newCode) => {
    return {
        type: CHANGE_CODE_CINEMA,
        newCode
    }
}
export const getMovieDetails = (movieCode) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieCode}`,
                method: 'GET',
                headers: {
                    TokenCybersoft: token
                }
            }).then((result) => {
                dispatch({
                    type: GET_MOVIE_DETAILS,
                    movieDetails: result.data.content
                })
            })
        } catch (error) {
            console.log('Thất bại', error.response)

        }
    }
}
