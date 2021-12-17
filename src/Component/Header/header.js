import React from 'react'
import logo from '../../Assets/Images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
export default function Header() {
    return (
        <div className='header'>
            <a href='#' className='header-logo'>
                <img src={logo} />
            </a>
            <ul className='header-menu'>
                <li className='header-item'><a href='#showTime'>Lịch chiếu</a></li>
                <li className='header-item'><a href='#movieTheater'>Cụm rạp</a></li>
                <li className='header-item'><a href='#news'>Tin tức</a></li>
                <li className='header-item'><a href='#application'>Ứng dụng</a></li>
            </ul>
            <ul className='header-user'>
                <li className='header-item'><a href='#'>Đăng nhập</a></li>
                <li className='header-item'><a href='#'>Đăng ký</a></li>
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
                            <i className="fa fa-user-circle login-icon"></i>
                            <a href='/#' className='login-user'>Đăng nhập</a>
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
                </nav>
            </div>

        </div>
    )
}
