/* eslint-disable react-hooks/rules-of-hooks */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { addUser, getUserUpdate, updateUser } from '../../../Redux/Actions/UserManagerActions';
import { isEmpty } from 'lodash';
const loaiNguoiDung = [
    {
        value: 'KhachHang',
        label: 'Khách Hàng',
    },
    {
        value: 'QuanTri',
        label: 'Quản trị',
    }
];
export default function UpdateUser({ open, handleClose, user }) {
    const dispatch = useDispatch()
    const userUpdate = useSelector(state => state.UserManagerReducer.userUpdate)
    const [formUser, setFormUser] = useState({
        taiKhoan: 'Loading...',
        matKhau: 'Loading...',
        hoTen: 'Loading...',
        soDt: 0,
        email: 'Loading...',
        maLoaiNguoiDung: '',
        maNhom: 'Loading...',
    })

    const onChangeInput = (event) => {
        let { name, value } = event.target
        let newUser = { ...formUser, [name]: value }
        setFormUser(newUser)
    }

    const onSubmit = () => {
        dispatch(updateUser(formUser))
        handleClose()
    }
    useEffect(() => {
        if (!isEmpty(userUpdate)) {
            let newFormUser = {
                taiKhoan: userUpdate.taiKhoan,
                matKhau: userUpdate.matKhau,
                hoTen: userUpdate.hoTen,
                soDt: userUpdate.soDT,
                email: userUpdate.email,
                maLoaiNguoiDung: userUpdate.loaiNguoiDung?.maLoaiNguoiDung,
                maNhom: userUpdate.maNhom,
            }
            setFormUser(newFormUser)
        }
    }, [userUpdate])
    useEffect(() => {
        if (!isEmpty(user)) {
            dispatch(getUserUpdate(user))
        }
    }, [user])
    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ fontSize: '30px' }}>{"Cập nhật người dùng"}</DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    '& .MuiTextField-root': { mb: 2, width: '100%' },
                    '& .MuiOutlinedInput-root, .MuiInputLabel-root': { fontSize: '15px' },
                    '& .form-left': { width: '49%' },
                    '& .form-right': { width: '49%' },
                    '& .MuiButton-root': { display: 'block', mb: 2, fontSize: '15px', backgroundColor: '#d7d7d7', color: '#616161', width: '100%' },
                }}>
                    <div className='form-left'>
                        <TextField name='taiKhoan' id="outlined-basic" label="Tài khoản" variant="outlined" disabled onChange={onChangeInput} value={formUser.taiKhoan} />
                        <TextField name='matKhau' id="outlined-basic" label="Mật khẩu" variant="outlined" onChange={onChangeInput} value={formUser.matKhau} />
                        <TextField name='hoTen' id="outlined-basic" label="Họ tên" variant="outlined" onChange={onChangeInput} value={formUser.hoTen} />
                        <TextField name='email' id="outlined-basic" label="Email" variant="outlined" onChange={onChangeInput} value={formUser.email} />
                    </div>
                    <div className='form-right'>
                        <TextField name='soDt' id="outlined-basic" label="Số điện thoại" variant="outlined" type='number' onChange={onChangeInput} value={formUser.soDt} />
                        <TextField
                            id="outlined-select-currency"
                            name='maLoaiNguoiDung'
                            select
                            label="Loại người dùng"
                            value={formUser.maLoaiNguoiDung}
                            onChange={onChangeInput}
                        >
                            {loaiNguoiDung.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField name='maNhom' id="outlined-basic" label="Mã nhóm" value={formUser.maNhom} disabled variant="outlined" onChange={onChangeInput} />
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='error' onClick={handleClose} >Hủy</Button>
                <Button variant='contained' color='primary' onClick={onSubmit} type='submit'>Cập nhật</Button>
            </DialogActions>
        </Dialog>

    );
};