import React, { Fragment } from 'react'
import logo from '../../Assets/Images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
export default function Header() {
    const userSignIn = useSelector(state => state.UserManagerReducer.userSignIn)
    const SignOut = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn đăng xuất?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Có',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                window.location.href = '/';
            }
        })
    }
    return (
        <div className='header'>
            <div className='header-logo'>
                <a href='/' >
                    <img src={logo} alt='...' />
                </a>
            </div>
            <ul className='header-menu'>
                <li className='header-item'><a href='#lichchieu'>Lịch chiếu</a></li>
                <li className='header-item'><a href='#cumrap'>Cụm rạp</a></li>
                <li className='header-item'><a href='#tintuc'>Tin tức</a></li>
                <li className='header-item'><a href='#ungdung'>Ứng dụng</a></li>
            </ul>
            <ul className='header-user'>
                {userSignIn.hoTen ? <Fragment>
                    <img className='user-logo' src='https://picsum.photos/35/35' alt='' style={{ borderRadius: '50%' }} />
                    <li className='header-item'><NavLink title={userSignIn.maLoaiNguoiDung === 'QuanTri' ? 'Admin' : 'Thông tin cá nhân'} className='header-item-signin' to={userSignIn.maLoaiNguoiDung === 'QuanTri' ? '/admin' : '/thongtincanhan'}>Hello {userSignIn.hoTen}</NavLink></li>
                    <li className='header-item' onClick={() => SignOut()}>Đăng Xuất</li>
                </Fragment>
                    :
                    <Fragment>
                        <i className="fa fa-user-circle user-logo"></i>
                        <li className='header-item'><NavLink to='/dangnhap'>Đăng nhập</NavLink></li>
                        <li className='header-item'><NavLink to='/dangky'>Đăng ký</NavLink></li>
                    </Fragment>}
            </ul>
            <div className='menu-mobile'>
                <label htmlFor='nav-mobile-input' >
                    <MenuIcon className='menu-icon' />
                </label>
                <input hidden type='checkbox' className='nav__input' id='nav-mobile-input' />
                <label htmlFor='nav-mobile-input' className='menu-overlay'></label>
                <nav className='nav__mobile'>
                    <div className='menu-login'>
                        <div className='login-left'>
                            {userSignIn.hoTen ? <Fragment>
                                <img className='user-logo' src='https://picsum.photos/35/35' alt='' style={{ borderRadius: '50%' }} />
                                <div className='user-name'>Hello {userSignIn.hoTen}</div>
                            </Fragment> : <Fragment>
                                <i className="fa fa-user-circle login-icon"></i>
                                <NavLink to='/dangnhap' className='login-user'>Đăng nhập</NavLink></Fragment>}
                        </div>
                        <label htmlFor='nav-mobile-input'><i className="fa fa-angle-right login-arrow"></i></label>

                    </div>
                    <ul className='menu-list'>
                        <li className='menu-item'>
                            <a href='#showTime' className='nav__mobile-link'>Lịch chiếu</a>
                        </li>
                        <li className='menu-item'>
                            <a href='#movieTheater' className='nav__mobile-link'>Cụm rạp</a>
                        </li>
                        <li className='menu-item'>
                            <a href='#news' className='nav__mobile-link'>Tin tức</a>
                        </li>
                        <li className='menu-item'>
                            <a href='#application' className='nav__mobile-link'>Ứng dụng</a>
                        </li>
                    </ul>
                    {userSignIn.hoTen ? <Button className='menu-logout' variant="contained" color='inherit' onClick={() => SignOut()}>
                        Đăng xuất &nbsp;<LogoutIcon />
                    </Button> : null}
                </nav>
            </div>
        </div>
    )
}
