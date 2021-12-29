import Axios from 'axios'
import Swal from 'sweetalert2'
import { BOOKING_SUCCESS, CHANGE_CODE_CINEMA, GET_BANNER_LIST, GET_CINEMA_BY_CODE, GET_CINEMA_SYSTEM, GET_MOVIES_LIST, GET_MOVIE_DETAILS, GET_SHOW_SCHEDULE, GET_TICKET_ROOM } from '../Const/MovieManagerConst'
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
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieCode}`,
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
export const getTicketRoom = (showtimeCode) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${showtimeCode}`,
                method: 'GET',
                headers: {
                    TokenCybersoft: token
                }
            }).then((result) => {
                dispatch({
                    type: GET_TICKET_ROOM,
                    ticketRoom: result.data.content
                })
            })

        } catch (error) {
            console.log('Thất bại', error.response)
        }
    }
}
export const bookTicketsAction = (tickets) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe',
                method: 'POST',
                data: tickets,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            }).then((result) => {
                dispatch(getTicketRoom(tickets.maLichChieu))
                Swal.fire('Thông báo', 'Đặt vé thành công', 'success')
                dispatch({
                    type: BOOKING_SUCCESS,
                })
            })
        } catch (error) {
            Swal.fire('Thông báo', 'Mua vé thất bại', 'error')
        }
    }
}
export const deleteMovie = (movieCode) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${movieCode}`,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            }).then((result) => {
                dispatch(getMovieList())
                Swal.fire('Thông báo', 'Xóa thành công', 'success')
            }).catch((error) => {
                console.log(error);
            })
        } catch (error) {
            Swal.fire('Thông báo', 'Đăng ký thất bại', 'error')
        }
    }
}