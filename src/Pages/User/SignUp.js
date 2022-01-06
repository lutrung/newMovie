import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import background from '../../Assets/Images/background-signIn.jpg';
import logo from '../../Assets/Images/logo.png';
import { signUpAction } from '../../Redux/Actions/UserManagerActions';
const signUpUserSchema = yup.object().shape({
    taiKhoan: yup.string().required('*Tài khoản không được bỏ trống!'),
    matKhau: yup.string().required('*Mật khẩu không được bỏ trống!'),
    email: yup.string().required('*Email không được bỏ trống!'),
    hoTen: yup.string().required('*Họ tên không được bỏ trống!'),
    soDt: yup.string().required('*Số điện không được bỏ trống!'),
})
export default function SignUp() {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = React.useState(false);
    const onShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (accounts) => {
        dispatch(await signUpAction(accounts))
    }
    return (
        <div className='signInUp'
            style={{ backgroundImage: `url(${background})` }}
        >
            <Formik initialValues={{
                taiKhoan: '',
                matKhau: '',
                email: '',
                hoTen: '',
                soDt: '',
                maNhom: 'GP01',
            }}
                validationSchema={signUpUserSchema}
                onSubmit={handleSubmit}
                render={(formikProps) => (
                    <Form className='signInUp_form'>
                        <img className='signInUp_form-logo' alt='...' src={logo} />
                        <h2 className='signInUp_form-title'>Đăng ký</h2>
                        {/* Tài Khoản */}
                        <div className="signInUp_form-input">
                            <div className='input-container'>
                                <i className="fa fa-user-alt"></i>
                                <Field name='taiKhoan' className="form-control" aria-describedby="taiKhoan" placeholder="Tài khoản" onChange={formikProps.handleChange} />
                            </div>
                            <span className='error-message'><ErrorMessage name="taiKhoan" /></span>
                        </div>
                        {/* Mật Khẩu */}
                        <div className="signInUp_form-input">
                            <div className='input-container'>
                                <i className="fa fa-lock"></i>
                                <Field type={!showPassword ? 'password' : 'text'} name='matKhau' className="form-control" aria-describedby="matKhau" placeholder="Mật khẩu" onChange={formikProps.handleChange} />
                                <div onClick={() => onShowPassword()}>
                                    {!showPassword ? <i className="fa fa-eye" style={{ cursor: 'pointer' }}></i> : <i className="fa fa-eye-slash" style={{ cursor: 'pointer' }}></i>}

                                </div>
                            </div>
                            <span className='error-message'><ErrorMessage name="matKhau" /></span>
                        </div>
                        {/* Email */}
                        <div className="signInUp_form-input">
                            <div className='input-container'>
                                <i className="fas fa-envelope"></i>
                                <Field name='email' className="form-control" aria-describedby="email" placeholder="Email" onChange={formikProps.handleChange} />
                            </div>
                            <span className='error-message'><ErrorMessage name="email" /></span>
                        </div>
                        {/* Họ Tên */}
                        <div className="signInUp_form-input">
                            <div className='input-container'>
                                <i className="fas fa-envelope"></i>
                                <Field name='hoTen' className="form-control" aria-describedby="hoTen" placeholder="Họ tên" onChange={formikProps.handleChange} />
                            </div>
                            <span className='error-message'><ErrorMessage name="hoTen" /></span>
                        </div>
                        {/* Số Điện Thoại */}
                        <div className="signInUp_form-input">
                            <div className='input-container'>
                                <i className="fas fa-envelope"></i>
                                <Field name='soDt' className="form-control" aria-describedby="soDt" placeholder="Số điện thoại" onChange={formikProps.handleChange} />
                            </div>
                            <span className='error-message'><ErrorMessage name="soDt" /></span>
                        </div>
                        <button className='btn_signInUp' type='submit'>Đăng ký</button>
                        <div className="signInUp_form-note">
                            <p>Bạn đã có tài khoản? &nbsp;</p>
                            <NavLink className='signUp' to='/dangnhap'>Đăng nhập</NavLink>
                        </div>
                    </Form>)} />
        </div>
    )
}
