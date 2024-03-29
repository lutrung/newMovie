import Axios from "axios"
import Swal from "sweetalert2"
import { history } from '../../Util/history'
import { PERSONAL_INFO, SIGN_IN, USER_LIST, USER_UPDATE } from "../Const/MovieManagerConst"

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNSIsIkhldEhhblN0cmluZyI6IjAzLzA2LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTc1MDQwMDAwMCIsIm5iZiI6MTY1NzczMTYwMCwiZXhwIjoxNjg1ODk4MDAwfQ.KXn1XtehbphvfW3OSUFlLIzSrEtSLDtDQG4BgF38Cus'

export const signInAction = (accounts) => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
                method: 'POST',
                data: accounts,
                headers: {
                    TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNSIsIkhldEhhblN0cmluZyI6IjAzLzA2LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTc1MDQwMDAwMCIsIm5iZiI6MTY1NzczMTYwMCwiZXhwIjoxNjg1ODk4MDAwfQ.KXn1XtehbphvfW3OSUFlLIzSrEtSLDtDQG4BgF38Cus'
                }
            })
            localStorage.setItem("USER_SIGNIN", JSON.stringify(result.data.content));
            localStorage.setItem("ACCESSTOKEN", result.data.content.accessToken);
            Swal.fire('Thông báo', 'Đăng nhập thành công', 'success')
            dispatch({
                type: SIGN_IN,
                userSignIn: result.data.content,
            })
            if (result.data.content.maLoaiNguoiDung === 'QuanTri') {
                history.push('/admin')
            } else {
                history.push('/')
            }
        } catch (err) {
            console.log(err);
            Swal.fire('Thông báo', 'Tài khoản hoặc mật khẩu không đúng', 'error')
        }
    }
}
export const signUpAction = (accounts) => {
    return async () => {
        try {
            await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
                method: 'POST',
                data: accounts,
                headers: {
                    TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNSIsIkhldEhhblN0cmluZyI6IjAzLzA2LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTc1MDQwMDAwMCIsIm5iZiI6MTY1NzczMTYwMCwiZXhwIjoxNjg1ODk4MDAwfQ.KXn1XtehbphvfW3OSUFlLIzSrEtSLDtDQG4BgF38Cus'
                }
            }).then((result) => {
                Swal.fire('Thông báo', 'Đăng ký thành công', 'success')
                history.push('/dangnhap')
            })
        } catch (error) {
            Swal.fire('Thông báo', 'Đăng ký thất bại', 'error')
            console.log(error);
        }
    }
}
// export const signInAction2 = (accounts) => {
//     return async (dispatch) => {
//         try {
//             let result = await Axios({
//                 url: 'https://movie0706.cybersoft.edu.vn/api/quanlynguoidung/dangnhap',
//                 method: 'POST',
//                 data: accounts,
//                 // headers: {
//                 //     TokenCybersoft: token
//                 // }
//             })
//             console.log(result.data);
//             localStorage.setItem("USER_SIGNIN", JSON.stringify(result.data));
//             localStorage.setItem("ACCESSTOKEN", result.data.accessToken);
//             Swal.fire('Thông báo', 'Đăng nhập thành công', 'success')
//             dispatch({
//                 type: SIGN_IN,
//                 userSignIn: result.data,
//             })
//             if (result.data === 'QuanTri') {
//                 history.push('/admin')
//             } else {
//                 history.push('/')
//             }
//         } catch (err) {
//             console.log(err);
//             Swal.fire('Thông báo', 'Tài khoản hoặc mật khẩu không đúng', 'error')
//         }
//     }
// }
// export const signUpAction2 = (accounts) => {
//     return async () => {
//         try {
//             await Axios({
//                 url: 'https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy',
//                 method: 'POST',
//                 data: accounts,
//                 // headers: {
//                 //     TokenCybersoft: token
//                 // }
//             }).then((result) => {
//                 Swal.fire('Thông báo', 'Đăng ký thành công', 'success')
//                 history.push('/dangnhap')
//             })
//         } catch (error) {
//             Swal.fire('Thông báo', 'Đăng ký thất bại', 'error')
//         }
//     }
// }
export const getUserList = () => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP05',
                method: 'GET',
                headers: {
                    TokenCybersoft: token
                }
            })
            dispatch({
                type: USER_LIST,
                userList: result.data.content,
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const deleteUser = (account) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`,
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            })
            dispatch(getUserList())
            Swal.fire('Thông báo', 'Xóa thành công', 'success')
        } catch (error) {
            Swal.fire('Thông báo', 'Xóa thất bại', 'error')
            console.log(error);
        }
    }
}
export const addUser = (formUser) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung',
                method: 'POST',
                data: formUser,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            })
            dispatch(getUserList())
            Swal.fire('Thông báo', 'Thêm thành công', 'success')
        } catch (error) {
            Swal.fire('Thông báo', 'Thêm thất bại', 'error')
            console.log(error);
        }
    }
}
export const getUserUpdate = (user) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: `hhttps://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayThongTinNguoiDung?TaiKhoan=${user}`,
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            }).then((result) => {
                dispatch({
                    type: USER_UPDATE,
                    userUpdate: result.data,
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const updateUser = (formUser) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
                method: 'POST',
                data: formUser,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            })
            dispatch(getUserList())
            Swal.fire('Thông báo', 'Cập nhật thành công', 'success')
        } catch (error) {
            Swal.fire('Thông báo', 'Cập nhật thất bại', 'error')
            console.log(error);
        }
    }
}
export const getPersonalInfo = () => {
    return async (dispatch) => {
        try {
            let result = await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan',
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            })
            dispatch({
                type: PERSONAL_INFO,
                personalInfo: result.data.content
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const updateInfo = (formUser) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
                method: 'PUT',
                data: formUser,
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("ACCESSTOKEN"),
                    TokenCybersoft: token
                }
            })
            dispatch(getPersonalInfo())
            Swal.fire('Thông báo', 'Cập nhật thành công', 'success')
        } catch (error) {
            Swal.fire('Thông báo', 'Cập nhật thất bại', 'error')
            console.log(error);
        }
    }
}