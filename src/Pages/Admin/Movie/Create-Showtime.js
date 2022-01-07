/* eslint-disable react-hooks/rules-of-hooks */
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShowTime, getTheTheaterClusterByCode } from '../../../Redux/Actions/MovieManagerActions';
const theaterCluster = [
    {
        value: 'BHDStar',
        label: 'BHDStar',
    },
    {
        value: 'CGV',
        label: 'CGV',
    },
    {
        value: 'CineStar',
        label: 'CineStar',
    },
    {
        value: 'Galaxy',
        label: 'Galaxy',
    },
    {
        value: 'LotteCinima',
        label: 'LotteCinima',
    },
    {
        value: 'MegaGS',
        label: 'MegaGS',
    },
];
function CreateShowTime({ open, handleClose, movieCode }) {
    const dispatch = useDispatch()
    const cinemaByCode = useSelector(state => state.MovieManagerReducer.cinemaByCode)
    const [date, setDate] = React.useState(null);
    const [formCreate, setFormCreate] = useState({
        maPhim: null,
        ngayChieuGioChieu: '',
        maRap: '',
        giaVe: null,
        maHeThongRap: ''
    });
    const onSelectDate = (newDate) => {
        let newDataMovie = { ...formCreate, ngayChieuGioChieu: moment(newDate).format('DD/MM/YYYY hh:mm:ss') }
        setDate(newDate)
        setFormCreate(newDataMovie)
    }
    const onChangeInput = (event) => {
        let { name, value } = event.target
        if (name === 'maHeThongRap') {
            dispatch(getTheTheaterClusterByCode(value))
        }
        let newFormCrate = { ...formCreate, [name]: value }
        setFormCreate(newFormCrate)
    }
    const onSubmit = () => {
        delete formCreate.maHeThongRap
        dispatch(createShowTime(formCreate))
        handleClose()
    }
    useEffect(() => {
        if (movieCode) {
            let newFormCrate = {
                maPhim: movieCode,
                ngayChieuGioChieu: '',
                maRap: '',
                giaVe: null,
                maHeThongRap: ''
            }
            setFormCreate(newFormCrate)
        }
    }, [movieCode])
    return (
        <Dialog
            fullWidth
            maxWidth='sm'
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle sx={{ fontSize: '30px' }}>{"Tạo lịch chiếu"}</DialogTitle>
            <DialogContent dividers>
                <Box sx={{
                    '& .MuiTextField-root': { mb: 2, width: '100%' },
                    '& .MuiOutlinedInput-root, .MuiInputLabel-root': { fontSize: '15px' },
                }}>
                    <TextField name='maPhim' label="Mã Phim" disabled variant="outlined" value={movieCode} defaultValue='0' />
                    <TextField
                        id="outlined-select-currency"
                        select
                        name='maHeThongRap'
                        label="Cụm rạp"
                        value={formCreate.maHeThongRap}
                        onChange={onChangeInput}
                    >
                        {theaterCluster.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        select
                        name='maRap'

                        label="Mã rạp"
                        value={formCreate.maRap}
                        onChange={onChangeInput}
                    >
                        {cinemaByCode.map((option, index) => (
                            <MenuItem key={index} value={option.maCumRap}>
                                {option.maCumRap}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField name='giaVe' label="Giá vé" variant="outlined" value={formCreate.giaVe} onChange={onChangeInput} />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            label="Ngày giờ chiếu"
                            value={date}
                            name='ngayChieuGioChieu'
                            onChange={(newDate) => onSelectDate(newDate)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='error' onClick={handleClose}>Hủy</Button>
                <Button variant='contained' color='primary' onClick={onSubmit} type='submit'>Tạo</Button>
            </DialogActions>
        </Dialog>

    );
};
export default React.memo(CreateShowTime)