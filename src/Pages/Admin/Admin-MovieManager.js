import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Input, Table } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteMovie } from '../../Redux/Actions/MovieManagerActions';
import AddMovie from './AddMovie';
import EditMovie from './EditMovie';

export default function AdminMovieManager() {
    const [movieCode, setMovieCode] = useState()

    // DIALOG
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setMovieCode()
    };


    const dispatch = useDispatch()
    const { Search } = Input;
    const [data, setData] = useState()
    const moviesList = useSelector(state => state.MovieManagerReducer.moviesList)
    useEffect(() => {
        if (moviesList) {
            setData(moviesList)
        }
    }, [moviesList])
    const onSearch = (keyWord) => {
        if (keyWord) {
            let newData = moviesList.filter((item) => {
                return item.tenPhim.toLowerCase().indexOf(keyWord) !== -1
            })
            setData(newData)
        } else {
            setData(moviesList)
        }

    }
    const onDelete = (movieCode) => {
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
                dispatch(deleteMovie(movieCode))
            }
        })
    }
    const editMovie = (movieCode) => {
        setOpen(true);
        setMovieCode(movieCode)
    }
    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'maPhim',
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend'],
            width: "15%",
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            width: "15%",
            render: (hinhAnh, index) => {
                return <img key={index} src={hinhAnh} alt={hinhAnh} width={60} height={80} />
            }
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            defaultSortOrder: 'descend',
            width: '25%',
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            width: '25%',
            render: (moTa) => {
                return <Fragment>
                    {moTa.length > 50 ? moTa.substr(0, 100) + '...' : moTa}
                </Fragment>
            }
        },
        {
            title: 'Chỉnh sửa',
            className: 'adminEdit',
            dataIndex: 'maPhim',
            width: '20%',
            render: (maPhim) => {
                return <div className='adminEdit'>
                    <IconButton color='primary' aria-label="primary" size="large" onClick={() => editMovie(maPhim)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color='error' aria-label="delete" size="large" onClick={() => onDelete(maPhim)}>
                        <DeleteIcon />
                    </IconButton>

                </div>
            }
        },
    ];



    return (
        <div className='adminMovieManager'>
            <h2 className='titile'>Quản lý phim</h2>
            <Button variant="contained" onClick={handleClickOpen}>
                Thêm phim
            </Button>
            {movieCode ? <EditMovie open={open} handleClose={handleClose} movieCode={movieCode} /> : <AddMovie open={open} handleClose={handleClose} />}
            <Search
                className='mt-4 mb-4'
                placeholder="Tìm kiếm"
                enterButton={<SearchIcon />}
                size="large"
                onSearch={(keyWord) => onSearch(keyWord)}
            />
            <Table pagination={{ defaultPageSize: 5 }} columns={columns} dataSource={data} />
        </div>
    )
}
