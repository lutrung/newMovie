import Axios from 'axios'
import Swal from 'sweetalert2'
import { BOOKING_SUCCESS, CHANGE_CODE_CINEMA, GET_BANNER_LIST, GET_CINEMA_BY_CODE, GET_CINEMA_SYSTEM, GET_INFO_MOVIE, GET_MOVIES_LIST, GET_MOVIE_DETAILS, GET_SHOW_SCHEDULE, GET_TICKET_ROOM } from '../Const/MovieManagerConst'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNSIsIkhldEhhblN0cmluZyI6IjAzLzA2LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTc1MDQwMDAwMCIsIm5iZiI6MTY1NzczMTYwMCwiZXhwIjoxNjg1ODk4MDAwfQ.KXn1XtehbphvfW3OSUFlLIzSrEtSLDtDQG4BgF38Cus'

export const getMovieList = () => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP11',
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
// export const getMovieList2 = () => {
//     return async (dispatch) => {
//         try {
//             let result = await Axios({
//                 url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01',
//                 method: 'GET',
//                 headers: {
//                     TokenCybersoft: token
//                 }
//             })
//             dispatch({
//                 type: GET_MOVIES_LIST,
//                 moviesList: result.data
//             })
//         } catch (error) {
//             console.log('Thất bại', error.response)
//         }
//     }
// }
export const getCinemaSystem = () => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP05',
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
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong`,
                method: 'GET',
                headers: {
                    TokenCybersoft: token
                }
            })
            // dispatch({
            //     type: GET_CINEMA_BY_CODE,
            //     cinemaByCode: result.data
            // })
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
            Swal.fire('Thông báo', `Mua vé thất bại ${error}`, 'error')
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
                Swal.fire('Thông báo', `Xóa thất bại ${error}`, 'error')
            })
        } catch (error) {
            console.log(error);
            Swal.fire('Thông báo', `Xóa thất bại ${error}`, 'error')
        }
    }
}
export const addMovie = (dataMovie) => {
    return async (dispatch) => {
        try {
            await Axios({
                // link api sai
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh',
                method: 'POST',
                data: dataMovie,
                headers: {
                    TokenCybersoft: token
                }
            }).then((result) => {
                dispatch(getMovieList())
                Swal.fire('Thông báo', 'Thêm phim thành công', 'success')
            })
        } catch (err) {
            console.log(err)
            Swal.fire('Thông báo', 'Thêm phim thất bại', 'error')
        }
    }
}
export const getInfoMovie = (movieCode) => {
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
                    type: GET_INFO_MOVIE,
                    movieInfo: result.data.content
                })
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const updateMovie = (dataMovie) => {
    return async () => {
        try {
            await Axios({
                // link api sai
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload',
                method: 'POST',
                data: dataMovie,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            })
            Swal.fire('Thông báo', 'Cập nhật thành công', 'success')
        } catch (error) {
            Swal.fire({
                title: 'Cập nhật thất bại',
                text: `${error}`,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok',
            })
        }
    }
}
export const createShowTime = (formCreate) => {
    return async () => {
        try {
            await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu',
                method: 'POST',
                data: formCreate,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            })
            Swal.fire('Thông báo', 'Tạo thành công', 'success')
        } catch (err) {
            Swal.fire('Thông báo', `Tạo thất bại ${err}`, 'error')

        }
    }
}