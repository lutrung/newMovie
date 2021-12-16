import React from 'react'
import logo from '../../Assets/Images/logo.png'
export default function Header() {
    return (
        <div className='header'>
            <a href='#' className='header-logo'>
                <img src={logo} />
            </a>
            <ul className='header-menu'>
                <li className='header-item'><a href='#showTime'>Lịch chiếu</a></li>
                <li className='header-item'><a href='#'>Cụm rạp</a></li>
                <li className='header-item'><a href='#news'>Tin tức</a></li>
                <li className='header-item'><a href='#application'>Ứng dụng</a></li>
            </ul>
            <ul className='header-user'>
                <li className='header-item'><a href='#'>Đăng nhập</a></li>
                <li className='header-item'><a href='#'>Đăng ký</a></li>
            </ul>
        </div>
    )
}
