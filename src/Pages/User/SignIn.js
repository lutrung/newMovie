import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import background from '../../Assets/Images/background-signIn.jpg';
import logo from '../../Assets/Images/logo.png';
import { signInAction } from '../../Redux/Actions/UserManagerActions';
const signInUserSchema = yup.object().shape({
    taiKhoan: yup.string().required('*Tài khoản không được bỏ trống!'),
    matKhau: yup.string().required('*Mật khẩu không được bỏ trống!'),
})
export default function SignIn() {
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = React.useState(false);
    const onShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (accounts) => {
        dispatch(await signInAction(accounts))
    }
    return (
        <div className='signInUp'
            style={{ backgroundImage: `url(${background})` }}
        >
            <Formik initialValues={{
                taiKhoan: '',
                matKhau: '',
            }}
                validationSchema={signInUserSchema}
                onSubmit={handleSubmit}
                render={(formikProps) => (
                    <Form className='signInUp_form'>
                        <img className='signInUp_form-logo' alt='...' src={logo} />
                        <h2 className='signInUp_form-title'>Đăng nhập</h2>
                        <div className="signInUp_form-input">
                            <div className='input-container'>
                                <i className="fa fa-user-alt"></i>
                                <Field name='taiKhoan' className="form-control" aria-describedby="taiKhoan" placeholder="Tài khoản" onChange={formikProps.handleChange} />
                            </div>
                            <span className='error-message'><ErrorMessage name="taiKhoan" /></span>
                        </div>
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
                        <button className='btn_signInUp' type='submit'>Đăng nhập</button>
                        <div className="signInUp_form-note">
                            <p>Bạn chưa có tài khoản? &nbsp;</p>
                            <NavLink className='signUp' to='/dangky'>Đăng ký</NavLink>
                        </div>
                    </Form>)} />
        </div>
    )
}
