import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShowSchedule } from '../../../Redux/Actions/MovieManagerActions'
import Button from '@mui/material/Button';
import moment from 'moment';
export default function Showtimes({ code, theaterCode }) {
    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(await getShowSchedule(code))
    }, [code])
    const showTimes = useSelector(state => state.MovieManagerReducer.showTimes)
    return (
        <div className='showtimes'>
            {showTimes.map((item, index) => {
                return <Fragment key={index}>
                    {item.lstCumRap?.map((cinema, cinemaIndex) => {
                        if (cinema.maCumRap === theaterCode) {
                            return <Fragment key={cinemaIndex}>
                                {cinema.danhSachPhim?.slice(0, 10).map((movieInfo, index) => {
                                    return <div key={index} className='item-info'>
                                        <div className='info-top'>
                                            <img src={movieInfo.hinhAnh} />
                                            <div>
                                                <h3 className='top-name'>{movieInfo.tenPhim}</h3>
                                                <p className='top-rate'>157 phút - TIX 0 - IMDb 6.8</p>
                                            </div>
                                        </div>
                                        <div className='info-bottom'>
                                            <h3>Suất chiếu:</h3>
                                            {movieInfo.lstLichChieuTheoPhim?.slice(0, 7).map((time, index) => {
                                                return <Button key={index} className='btn-time' variant="outlined">{moment(time.ngayChieuGioChieu).format('hh:mm')}</Button>

                                            })}
                                        </div>
                                    </div>
                                })}
                            </Fragment>
                        }
                    })}
                </Fragment>
            })}
        </div>
    )
}
