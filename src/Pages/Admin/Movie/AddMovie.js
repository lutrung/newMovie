/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState } from 'react';
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
    const [date, setDate] = React.useState(null);
    const [imgSrc, setImgSrc] = useState(imgEmpty);

    const onSelectDate = (newDate) => {
        let newDataMovie = { ...dataMovie, ngayKhoiChieu: moment(newDate).format('DD/MM/YYYY') }
        setDate(newDate);
        setDataMovie(newDataMovie)
    }
    const onChangeInput = (event) => {
        let { name, value } = event.target
        if (name !== 'hinhAnh') {
            let newDataMovie = { ...dataMovie, [name]: value.trim() }
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

        let form_data = new FormData();
        for (let key in dataMovie) {
            form_data.append(key, dataMovie[key]);
        }
        dispatch(await addMovie(form_data))
        handleClose()
    }
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
                        <TextField name='tenPhim' label="Tên Phim" variant="outlined" onChange={onChangeInput} value={dataMovie.tenPhim} />
                        <TextField name='trailer' label="Trailer" variant="outlined" onChange={onChangeInput} value={dataMovie.trailer} />
                        <TextField name='biDanh' label="Bí Danh" variant="outlined" onChange={onChangeInput} value={dataMovie.biDanh} />
                        <TextField name='danhGia' label="Đánh giá" variant="outlined" type='number' onChange={onChangeInput} value={dataMovie.danhGia} />
                        <TextField name='maNhom' label="Mã nhóm" value='GP01' disabled variant="outlined" onChange={onChangeInput} />
                        <TextField name='moTa' label="Mô tả" multiline rows={3} variant="outlined" onChange={onChangeInput} value={dataMovie.moTa} />
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