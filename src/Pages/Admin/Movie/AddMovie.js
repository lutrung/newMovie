/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import imgEmpty from '../../../Assets/Images/unnamed.png'
import moment from 'moment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';



import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useDispatch } from 'react-redux';
import { addMovie } from '../../../Redux/Actions/MovieManagerActions';


export default function AddMovie({ open, handleClose }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({
        tenPhim: {
            error: false,
            message: 'Tên phim không được bỏ trống',
        },
        trailer: {
            error: false,
            message: 'Trailer không được bỏ trống',
        },
        ngayKhoiChieu: {
            error: false,
            message: 'Ngày khởi chiếu được bỏ trống',
        },
        danhGia: {
            error: false,
            message: 'Đánh giá không được bỏ trống',
        },
        moTa: {
            error: false,
            message: 'Mô tả không được bỏ trống',
        },
        hinhAnh: {
            error: false,
            message: 'Hình ảnh không được bỏ trống',
        },
        biDanh: {
            error: false,
            message: 'Bí danh không được bỏ trống',
        },
    })
    const [dataMovie, setDataMovie] = useState({
        tenPhim: '',
        trailer: '',
        ngayKhoiChieu: new Date(),
        danhGia: null,
        moTa: '',
        hinhAnh: {},
        biDanh: '',
        maNhom: 'GP01',
    })
    const inputAdd = useRef(null);
    const onAdd = () => {
        inputAdd.current.click();
    };
    const [imgSrc, setImgSrc] = useState(imgEmpty);
    const onSelectDate = (newDate) => {
        console.log(newDate);
        let newDataMovie = { ...dataMovie, ngayKhoiChieu: newDate }
        setDataMovie(newDataMovie)
    }
    const onChangeInput = (event) => {
        let { name, value } = event.target
        if (name === 'hinhAnh') {
            let newImgSrc = event.target.files[0]
            if (newImgSrc.type === 'image/png' || newImgSrc.type === 'image/jpg' || newImgSrc.type === 'image/gif' || newImgSrc.type === 'image/jpeg') {
                let newDataMovie = { ...dataMovie, [name]: newImgSrc }
                setDataMovie(newDataMovie)
                setImgSrc(URL.createObjectURL(newImgSrc))
            }
        } else if (name === 'danhGia') {
            let newDataMovie = { ...dataMovie, [name]: value }
            setDataMovie(newDataMovie)
            if (value < 0 || value > 10) {
                let newDataMovie = { ...dataMovie, [name]: 0 }
                setDataMovie(newDataMovie)
                let newErrors = { ...errors }
                newErrors[name].error = true
                newErrors[name].message = 'Đánh giá từ 0 - 10'
                setErrors(newErrors)
            } else if (!value) {
                let newErrors = { ...errors }
                newErrors[name].error = true
                setErrors(newErrors)
            } else {
                let newErrors = { ...errors }
                newErrors[name].error = false
                newErrors[name].message = 'Đánh giá không được bỏ trống'
                setErrors(newErrors)
            }
        } else {
            let newDataMovie = { ...dataMovie, [name]: value }
            setDataMovie(newDataMovie)
            if (!value) {
                let newErrors = { ...errors }
                newErrors[name].error = true
                setErrors(newErrors)
            } else {
                let newErrors = { ...errors }
                newErrors[name].error = false
                setErrors(newErrors)
            }
        }
    }
    const resetForm = () => {
        setDataMovie({
            tenPhim: '',
            trailer: '',
            ngayKhoiChieu: new Date(),
            danhGia: 0,
            moTa: '',
            hinhAnh: {},
            biDanh: '',
            maNhom: 'GP01',
        })
        setErrors({
            tenPhim: {
                error: false,
                message: 'Tên phim không được bỏ trống',
            },
            trailer: {
                error: false,
                message: 'Trailer không được bỏ trống',
            },
            ngayKhoiChieu: {
                error: false,
                message: 'Ngày khởi chiếu được bỏ trống',
            },
            danhGia: {
                error: false,
                message: 'Đánh giá không được bỏ trống',
            },
            moTa: {
                error: false,
                message: 'Mô tả không được bỏ trống',
            },
            hinhAnh: {
                error: false,
                message: 'Hình ảnh không được bỏ trống',
            },
            biDanh: {
                error: false,
                message: 'Bí danh không được bỏ trống',
            },
        })
        setImgSrc(imgEmpty)
    }
    const checkEmpty = (text) => {
        return !/[^\s]/.test(text);
    }
    const checkValidation = (data) => {
        let outPut = { ...errors };
        Object.keys(errors)?.forEach((item) => {
            if (checkEmpty(data[item])) {
                outPut[item].error = true;
            } else if (data[item] === null) {
                outPut[item].error = true;
            } else {
                outPut[item].error = false;
            }
        });
        setErrors(outPut);
        const isError = Object.values(outPut)?.some((item) => item.error);
        return isError;
    };
    const trimValues = (data) => {
        return Object.keys(data).map((key) => {
            if (key !== 'hinhAnh' && key !== 'danhGia') {
                return data[key] = String(data[key]).trim()
            }
        });
    }
    const onSubmit = () => {
        let checkError = checkValidation(dataMovie)
        if (checkError) {
            return
        } else {
            dataMovie.ngayKhoiChieu = moment(dataMovie.ngayKhoiChieu).format('DD/MM/YYYY')
            trimValues(dataMovie)
            let form_data = new FormData();
            for (let key in dataMovie) {
                form_data.append(key, dataMovie[key]);
            }
            dispatch(addMovie(form_data))
            resetForm()
            handleClose()
        }
    }

    useEffect(() => {
        if (!open) {
            resetForm()
        }
    }, [open])
    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ fontSize: '30px' }}>{"Thêm phim"}</DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    '& .MuiTextField-root': { mb: 2, width: '100%' },
                    '& .MuiOutlinedInput-root, .MuiInputLabel-root': { fontSize: '15px' },
                    '& .form-left': { width: '60%' },
                    '& .form-right': { width: '37%' },
                    '& .MuiButton-root': { display: 'block', mb: 2, fontSize: '15px', backgroundColor: '#d7d7d7', color: '#616161', width: '100%' },
                }}>
                    <div className='form-left'>
                        <TextField
                            required
                            name='tenPhim'
                            label="Tên Phim"
                            variant="outlined"
                            onChange={onChangeInput}
                            value={dataMovie.tenPhim}
                            error={errors.tenPhim.error}
                            helperText={errors.tenPhim.error ? errors.tenPhim.message : ''}
                        />
                        <TextField
                            required
                            name='trailer'
                            label="Trailer"
                            variant="outlined"
                            onChange={onChangeInput}
                            value={dataMovie.trailer}
                            error={errors.trailer.error}
                            helperText={errors.trailer.error ? errors.trailer.message : ''}
                        />
                        <TextField
                            required
                            name='biDanh'
                            label="Bí Danh"
                            variant="outlined"
                            onChange={onChangeInput}
                            value={dataMovie.biDanh}
                            error={errors.biDanh.error}
                            helperText={errors.biDanh.error ? errors.biDanh.message : ''}
                        />
                        <TextField
                            required
                            name='danhGia'
                            label="Đánh giá"
                            variant="outlined"
                            type='number'
                            onChange={onChangeInput}
                            value={dataMovie.danhGia}
                            error={errors.danhGia.error}
                            helperText={errors.danhGia.error ? errors.danhGia.message : ''}
                            InputProps={{
                                inputProps: {
                                    max: 10, min: 0
                                }
                            }}
                        />
                        <TextField
                            name='maNhom'
                            label="Mã nhóm"
                            value='GP01'
                            disabled
                            variant="outlined"
                            onChange={onChangeInput}
                        />
                        <TextField
                            required
                            name='moTa'
                            label="Mô tả"
                            multiline
                            rows={3}
                            variant="outlined"
                            onChange={onChangeInput}
                            value={dataMovie.moTa}
                            error={errors.moTa.error}
                            helperText={errors.moTa.error ? errors.moTa.message : ''}
                        />
                    </div>
                    <div className='form-right'>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Ngày khởi chiếu"
                                value={new Date(dataMovie.ngayKhoiChieu)}
                                name='ngayKhoiChieu'
                                onChange={(newDate) => onSelectDate(newDate)}
                                disablePast
                                renderInput={(params) => <TextField {...params}
                                    required
                                    error={errors.ngayKhoiChieu.error}
                                    helperText={errors.ngayKhoiChieu.error ? errors.ngayKhoiChieu.message : ''}
                                />}
                            />
                        </LocalizationProvider>
                        <Button variant='contained' onClick={() => onAdd()} >
                            Tải ảnh lên
                        </Button>
                        <input name='hinhAnh' type='file' hidden ref={inputAdd} onChange={onChangeInput} />
                        <img style={{ width: '100%' }} src={imgSrc} alt='...' />
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='error' onClick={handleClose} >Hủy</Button>
                <Button variant='contained' color='primary' onClick={onSubmit} type='submit'>Thêm</Button>
            </DialogActions>
        </Dialog>

    );
};