import React, { Fragment, useEffect, useState } from 'react'
import { Table, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { deleteMovie } from '../../Redux/Actions/MovieManagerActions';
import Swal from 'sweetalert2';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AdminMovieManager() {
    const dispatch = useDispatch()
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
    const { Search } = Input;
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
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
                    <IconButton color='primary' aria-label="primary" size="large">
                        <EditIcon />
                    </IconButton>
                    <IconButton color='error' aria-label="delete" size="large" onClick={() => onDelete(maPhim)}>
                        <DeleteIcon />
                    </IconButton>

                </div>
            }
        },
    ];


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='adminMovieManager'>
            <h2 className='titile'>Quản lý phim</h2>
            <Button variant="contained" onClick={handleClickOpen}>
                Thêm phim
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
            <Search
                className='mt-5 mb-5'
                placeholder="Tìm kiếm"
                enterButton="Tìm kiếm"
                size="large"
                onSearch={(keyWord) => onSearch(keyWord)}
            />
            <Table pagination={{ defaultPageSize: 5 }} columns={columns} dataSource={data} onChange={onChange} />
        </div>
    )
}
