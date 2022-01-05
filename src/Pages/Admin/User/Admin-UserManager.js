import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteUser, getUserList } from '../../../Redux/Actions/UserManagerActions';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';

export default function AdminUserManager() {
    const dispatch = useDispatch()

    const [user, setUser] = useState()
    const [userList, setUserList] = useState()
    const [open, setOpen] = React.useState(false);
    const userListRedux = useSelector(state => state.UserManagerReducer.userList)
    const { Search } = Input;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setUser()
        setOpen(false);
    };
    const onSearch = (keyWord) => {
        console.log(keyWord);
        if (keyWord) {
            let newData = userList.filter((item) => {
                return item.taiKhoan.toLowerCase().indexOf(keyWord) !== -1
            })
            setUserList(newData)
        } else {
            setUserList(userListRedux)
        }
    }
    const onDelete = (account) => {
        Swal.fire({
            title: 'Bạn có chắc muốn xóa ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(account))
            }
        })
    }
    const editMovie = (userCode) => {
        setUser(userCode)
        setOpen(true);
    }
    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            width: "15%",
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            width: "10%",
        },
        {
            title: 'Loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            width: '10%',
            sorter: (a, b) => {
                let loaiNguoiDungA = a.maLoaiNguoiDung.toLowerCase().trim()
                let loaiNguoiDungB = b.maLoaiNguoiDung.toLowerCase().trim()
                if (loaiNguoiDungA > loaiNguoiDungB) {
                    return 1
                }
                return -1
            },
        },
        {
            title: 'Họ Tên',
            dataIndex: 'hoTen',
            width: '20%',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            width: '10%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: '15%',
        },
        {
            title: 'Chỉnh sửa',
            className: 'adminEdit',
            dataIndex: 'taiKhoan',
            width: '20%',
            render: (taiKhoan, index) => {
                return <div key={index} className='adminEdit'>
                    <IconButton color='primary' aria-label="primary" size="large" onClick={() => editMovie(taiKhoan)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color='error' aria-label="delete" size="large" onClick={() => onDelete(taiKhoan)}>
                        <DeleteIcon />
                    </IconButton>

                </div>
            }
        },

    ];
    useEffect(() => {
        setUserList(userListRedux)
    }, [userListRedux])
    useEffect(() => {
        dispatch(getUserList())
    }, [])
    return (
        <div className='adminMovieManager'>
            <h2 className='titile'>Quản người dùng</h2>
            <Button variant="contained" onClick={handleClickOpen}>
                Thêm người dùng
            </Button>
            {user ? <UpdateUser open={open} handleClose={handleClose} user={user} /> : <AddUser open={open} handleClose={handleClose} />}
            <Search
                className='mt-4 mb-4'
                placeholder="Nhập tài khoản cần tìm"
                enterButton='Tìm kiếm'
                size="large"
                onSearch={(keyWord) => onSearch(keyWord)}
            />
            <Table pagination={{ defaultPageSize: 8 }} columns={columns} dataSource={userList} />
        </div>
    )
}
