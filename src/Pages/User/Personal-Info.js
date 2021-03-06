import moment from 'moment'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getPersonalInfo, updateInfo } from '../../Redux/Actions/UserManagerActions'
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import Box from '@mui/material/Box';
import { isEmpty } from 'lodash'
import LogoutIcon from '@mui/icons-material/Logout';
function PersonalInfo() {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const personalInfo = useSelector(state => state.UserManagerReducer.personalInfo)

    const [formInfo, setFormInfo] = useState({
        taiKhoan: 'Loading...',
        matKhau: 'Loading...',
        hoTen: 'Loading...',
        soDt: 0,
        email: 'Loading...',
        maLoaiNguoiDung: '',
        maNhom: 'Loading...',
    })
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const onChangeInput = (event) => {
        let { name, value } = event.target
        let newFormInfo = { ...formInfo, [name]: value }
        setFormInfo(newFormInfo)
    }
    const onSubmit = () => {
        dispatch(updateInfo(formInfo))
        handleClose()
    }
    useEffect(() => {
        dispatch(getPersonalInfo())
    }, [dispatch])
    useEffect(() => {
        if (!isEmpty(personalInfo)) {
            let newFormInfo = {
                taiKhoan: personalInfo.taiKhoan,
                matKhau: personalInfo.matKhau,
                hoTen: personalInfo.hoTen,
                soDt: personalInfo.soDT,
                email: personalInfo.email,
                maLoaiNguoiDung: personalInfo.loaiNguoiDung?.maLoaiNguoiDung,
                maNhom: personalInfo.maNhom,
            }
            setFormInfo(newFormInfo)
        }
    }, [personalInfo])
    return (
        <div className='personalInfo'>
            <div className='personalInfo-left'>
                <h2 className='title'>Th??ng tin t??i kho???n</h2>
                <img className='left-avatar' src='https://picsum.photos/200/200' alt='' style={{ borderRadius: '50%' }} />
                <table className="table table-striped  left-table">
                    <tbody>
                        <tr>
                            <th scope="row">T??i kho???n :</th>
                            <td>{personalInfo.taiKhoan}</td>
                        </tr>
                        <tr>
                            <th scope="row">M???t kh???u :</th>
                            <td>{personalInfo.matKhau}</td>
                        </tr>
                        <tr>
                            <th scope="row">T??n :</th>
                            <td>{personalInfo.hoTen}</td>
                        </tr>
                        <tr>
                            <th scope="row">Email :</th>
                            <td>{personalInfo.email}</td>
                        </tr>
                        <tr>
                            <th scope="row">S??? ??i???n tho???i :</th>
                            <td>{personalInfo.soDT}</td>
                        </tr>
                        <tr>
                            <th scope="row">Lo???i ng?????i d??ng :</th>
                            <td>{personalInfo.loaiNguoiDung?.tenLoai}</td>
                        </tr>
                        <tr>
                            <th scope="row">M?? nh??m :</th>
                            <td>{personalInfo.maNhom}</td>
                        </tr>
                    </tbody>
                </table>
                <Button variant="contained" onClick={handleClickOpen}>
                    C???p nh???t
                </Button>
                <a className='left-goback' href='/'>
                    <Button variant="contained" color='inherit'>
                        Trang ch??? &nbsp;<LogoutIcon />
                    </Button>
                </a>
                <Dialog
                    fullWidth
                    maxWidth='md'
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle sx={{ fontSize: '30px' }}>{"C???p nh???t th??ng tin"}</DialogTitle>
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
                                <TextField name='taiKhoan' id="outlined-basic" label="T??i kho???n" variant="outlined" disabled onChange={onChangeInput} value={formInfo.taiKhoan} />
                                <TextField name='matKhau' id="outlined-basic" label="M???t kh???u" variant="outlined" onChange={onChangeInput} value={formInfo.matKhau} />
                                <TextField name='hoTen' id="outlined-basic" label="H??? t??n" variant="outlined" onChange={onChangeInput} value={formInfo.hoTen} />
                                <TextField name='email' id="outlined-basic" label="Email" variant="outlined" onChange={onChangeInput} value={formInfo.email} />
                            </div>
                            <div className='form-right'>
                                <TextField name='soDt' id="outlined-basic" label="S??? ??i???n tho???i" variant="outlined" type='number' onChange={onChangeInput} value={formInfo.soDt} />
                                <TextField name='maLoaiNguoiDung' id="outlined-basic" label="Lo???i ng?????i d??ng" variant="outlined" disabled value={formInfo.maLoaiNguoiDung === 'KhachHang' ? 'Kh??ch h??ng' : 'Qu???n tr???'} />
                                <TextField name='maNhom' id="outlined-basic" label="M?? nh??m" value={formInfo.maNhom} disabled variant="outlined" />
                            </div>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' color='error' onClick={handleClose} >H???y</Button>
                        <Button variant='contained' color='primary' onClick={onSubmit} type='submit'>C???p nh???t</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className='personalInfo-right'>
                <h2 className='title'>L???ch s??? ?????t v??</h2>
                <div className='right-table'>
                    <table className="table table-striped">
                        <thead>
                            <tr style={{ whiteSpace: 'nowrap' }}>
                                <th scope="col">STT</th>
                                <th scope="col">T??n phim</th>
                                <th scope="col">Th???i l?????ng</th>
                                <th scope="col">T??n r???p</th>
                                <th scope="col">Ph??ng</th>
                                <th scope="col">Gh???</th>
                                <th scope="col">Gi?? v??</th>
                                <th scope="col">M?? v??</th>
                                <th scope="col">Ng??y ?????t</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personalInfo.thongTinDatVe?.map((item, index) => {
                                return <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td style={{ whiteSpace: 'nowrap' }}>{item.tenPhim}</td>
                                    <td>{item.thoiLuongPhim}p</td>
                                    <td style={{ whiteSpace: 'nowrap' }}>{item.danhSachGhe?.[0].tenHeThongRap}</td>
                                    <td >{item.danhSachGhe?.[0].maCumRap}</td>
                                    <td style={{ width: 150, minWidth: 150 }}>{item.danhSachGhe?.map((item, index) => {
                                        return <Fragment key={index}>
                                            {item.tenGhe} &nbsp;
                                        </Fragment>
                                    })}</td>
                                    <td>{item.giaVe}</td>
                                    <td>{item.maVe}</td>
                                    <td>{moment(item.ngayDat).format('DD/MM/YYYY')}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default React.memo(PersonalInfo)
