import Axios from "axios"
import Swal from "sweetalert2"
import { history } from '../../Util/history'
import { SIGN_IN } from "../Const/MovieManagerConst"

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAxNSIsIkhldEhhblN0cmluZyI6IjIwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NTY4MzIwMDAwMCIsIm5iZiI6MTYyNjI4MjAwMCwiZXhwIjoxNjU1ODMwODAwfQ.p47FFJpArherjwlM71xTzdulAQIW37pR6fRGD3t3Ji0'
export const signInAction = (accounts) => {
    return async (dispatch) => {
        try {
            await Axios({
                url: 'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
                method: 'POST',
                data: accounts,
                headers: {
                    TokenCybersoft: token
                }
            }).then((result) => {
                localStorage.setItem("USER_SIGNIN", JSON.stringify(result.data.content));
                localStorage.setItem("ACCESSTOKEN", result.data.content.accessToken);
                Swal.fire('Thông báo', 'Đăng nhập thành công', 'success')
                console.log(result.data.content);
                dispatch({
                    type: SIGN_IN,
                    userSignIn: result.data.content,
                })
                history.push('/trangchu')
            })
        } catch (err) {
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
                    TokenCybersoft: token
                }
            }).then((result) => {
                Swal.fire('Thông báo', 'Đăng ký thành công', 'success')
                history.push('/dangnhap')
            })
        } catch (error) {
            Swal.fire('Thông báo', 'Đăng ký thất bại', 'error')
        }
    }
}
