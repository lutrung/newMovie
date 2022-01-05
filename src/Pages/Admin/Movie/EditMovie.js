/* eslint-disable react-hooks/rules-of-hooks */
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoMovie, updateMovie } from '../../../Redux/Actions/MovieManagerActions';


export default function EditMovie({ open, handleClose, movieCode }) {
    const movieInfo = useSelector(state => state.MovieManagerReducer.movieInfo)
    const dispatch = useDispatch()
    const [imgSrc, setImgSrc] = useState();
    const [date, setDate] = React.useState(null);
    const [dataMovie, setDataMovie] = useState({
        tenPhim: '',
        trailer: '',
        ngayKhoiChieu: '',
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
    const onSelectDate = (newDate) => {
        let newDataMovie = { ...dataMovie, ngayKhoiChieu: moment(newDate).format('DD/MM/YYYY') }
        setDate(newDate)
        setDataMovie(newDataMovie)
    }
    const onChangeInput = (event) => {
        let { name, value } = event.target
        if (name !== 'hinhAnh') {
            let newDataMovie = { ...dataMovie, [name]: value }
            setDataMovie(newDataMovie)
        } else {
            let newImgSrc = event.target.files[0]
            if (newImgSrc.type === 'image/png' || newImgSrc.type === 'image/jpg' || newImgSrc.type === 'image/gif' || newImgSrc.type === 'image/jpeg') {
                let newDataMovie = { ...dataMovie, [name]: newImgSrc }
                setDataMovie(newDataMovie)
                setImgSrc(URL.createObjectURL(newImgSrc))
            }
        }
    }
    const onSubmit = async () => {
        // ------xoa khoang trang thua
        Object.keys(dataMovie).map((key) => {
            return dataMovie[key] = String(dataMovie[key]).trim()
        });
        // ---------------------------
        let form_data = new FormData();
        for (let key in dataMovie) {
            form_data.append(key, dataMovie[key]);
        }
        dispatch(await updateMovie(form_data))
        // handleClose()
    }
    useEffect(() => {
        if (!isEmpty(movieInfo)) {
            let newDataUpdate = {
                tenPhim: movieInfo.tenPhim,
                trailer: movieInfo.trailer,
                ngayKhoiChieu: moment(movieInfo.ngayKhoiChieu).format('DD/MM/YYYY'),
                danhGia: movieInfo.danhGia,
                moTa: movieInfo.moTa,
                hinhAnh: movieInfo.hinhAnh,
                biDanh: movieInfo.biDanh,
                maNhom: movieInfo.maNhom,
            }
            setImgSrc(movieInfo.hinhAnh)
            setDate(moment(movieInfo.ngayKhoiChieu).format())
            setDataMovie(newDataUpdate)
        }
    }, [movieInfo])
    useEffect(() => {
        if (movieCode) {
            async function fetchData() {
                dispatch(await getInfoMovie(movieCode))
            }
            fetchData();
        }
    }, [movieCode])
    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ fontSize: '30px' }}>{"Sửa phim"}</DialogTitle>
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
                        <TextField name='tenPhim' id="outlined-basic" label="Tên Phim" variant="outlined" onChange={onChangeInput} value={dataMovie.tenPhim} defaultValue='Loading...' />
                        <TextField name='trailer' id="outlined-basic" label="Trailer" variant="outlined" onChange={onChangeInput} value={dataMovie.trailer} defaultValue='Loading...' />
                        <TextField name='biDanh' id="outlined-basic" label="Bí Danh" variant="outlined" onChange={onChangeInput} value={dataMovie.biDanh} defaultValue='Loading...' />
                        <TextField name='danhGia' id="outlined-basic" label="Đánh giá" variant="outlined" type='number' onChange={onChangeInput} value={dataMovie.danhGia} defaultValue='0' />
                        <TextField name='maNhom' id="outlined-basic" label="Mã nhóm" value='GP01' disabled variant="outlined" onChange={onChangeInput} />
                        <TextField name='moTa' id="outlined-basic" label="Mô tả" multiline rows={3} variant="outlined" onChange={onChangeInput} value={dataMovie.moTa} defaultValue='Loading...' />
                    </div>
                    <div className='form-right'>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Ngày khởi chiếu"
                                value={date}
                                name='ngayKhoiChieu'
                                onChange={(newDate) => onSelectDate(newDate)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <Button variant='contained' onClick={() => onAdd()} >
                            Tải ảnh lên
                        </Button>
                        <input name='hinhAnh' type='file' hidden ref={inputAdd} onChange={onChangeInput} />
                        <img style={{ width: '100%' }} src={imgSrc} alt='thumbnail' />
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