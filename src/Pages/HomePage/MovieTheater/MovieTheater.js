/* eslint-disable array-callback-return */
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import background from '../../../Assets/Images/back-news.png';
import { getCinemaSystem } from '../../../Redux/Actions/MovieManagerActions';
function MovieTheater() {
    const dispatch = useDispatch()
    // He Thong Rap
    const cinemaSystem = useSelector(state => state.MovieManagerReducer.cinemaSystem)
    // Ma He Thong Rap
    const [codeCinema, setCodeCinema] = useState('BHDStar')
    // Rap Theo Ma
    // Lich Chieu
    const showTimes = useSelector(state => state.MovieManagerReducer.showTimes)
    const [showTimeByTheater, setShowTimeByTheater] = useState('bhd-star-cineplex-pham-hung')
    const onChangeCluster = (key, codeOfCinema) => {
        setCodeCinema(codeOfCinema)
        let listLogoItem = document.getElementsByClassName('logo-item')
        let lengthListLogoItem = listLogoItem.length
        for (let i = 0; i < lengthListLogoItem; i++) {
            if (listLogoItem[i].classList.contains('active')) {
                listLogoItem[i].classList.remove('active')
            }
            if (key === i) {
                listLogoItem[i].classList.add('active')
            }
        }
        let listCinema = document.getElementsByClassName('cinemaByCode-item')
        let lengthListCinema = listCinema.length
        for (let i = 0; i < lengthListCinema; i++) {
            listCinema[i].classList.remove('active')

        }
        setShowTimeByTheater('')
    }
    const onChangeShowTime = (key, showTime) => {
        let listCinema = document.getElementsByClassName('cinemaByCode-item')
        let listLength = listCinema.length
        for (let i = 0; i < listLength; i++) {
            if (listCinema[i].classList.contains('active')) {
                listCinema[i].classList.remove('active')
            }
            if (key === i) {
                listCinema[i].classList.add('active')
            }
        }
        setShowTimeByTheater(showTime)
    }
    useEffect(() => {
        async function fetchData() {
            dispatch(await getCinemaSystem())
        }
        fetchData()
    }, [codeCinema, dispatch]);
    console.log(cinemaSystem);
    return (
        <div id='cumrap' className='movieTheater' style={{ backgroundImage: `url(${background})` }}>
            <div className='movieTheater-container'>
                <div className='theater-logo'>
                    {cinemaSystem?.map((item, index) => {
                        return (
                            <div key={index} className={`logo-item ${index === 0 ? 'active' : null}`} onClick={() => onChangeCluster(index, item.maHeThongRap)}>
                                <img src={item.logo} width={50} height={50} alt='...' />
                            </div>
                        )
                    })}
                </div>
                <div className='theater-cluster'>
                    {cinemaSystem?.map((item2) => {
                        if (item2.maHeThongRap == codeCinema) {
                            return item2.lstCumRap.slice(0, 10).map((item, index) => {
                                return <div key={index} className='cinemaByCode-item' onClick={() => onChangeShowTime(index, item.maCumRap)}>
                                    <img className='cinemaByCode-logo' src='https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png' alt='...' />
                                    <div className='cinemaByCode-info'>
                                        <p title={item.tenCumRap} className='info-name'>{item.tenCumRap}</p>
                                        <p title={item.diaChi} className='info-address'>{item.diaChi}</p>
                                        <p className='info-detail'>[Chi tiết]</p>
                                    </div>
                                </div>
                            })
                        }
                    })}

                </div>
                <div className='theater-showtime'>
                    {cinemaSystem?.map((item2) => {
                        if (item2.maHeThongRap == codeCinema) {
                            return item2.lstCumRap.map((cinema, index) => {
                                if (cinema.maCumRap == showTimeByTheater) {
                                    return cinema.danhSachPhim?.slice(0, 10).map((movieInfo, indeMovieInfo) => {
                                        return <div key={indeMovieInfo} className='item-info'>
                                            <div className='info-top'>
                                                <img src={movieInfo?.hinhAnh} alt='...' />
                                                <div>
                                                    <h3 className='top-name'>{movieInfo.tenPhim}</h3>
                                                    <p className='top-rate'>157 phút - TIX 0 - IMDb 6.8</p>
                                                </div>
                                            </div>
                                            <div className='info-bottom'>
                                                <h4>Suất chiếu:</h4>
                                                {movieInfo.lstLichChieuTheoPhim?.slice(0, 7).map((time, index) => {
                                                    return <NavLink to={'/phongve/' + time.maLichChieu} key={index} className='btn-time' variant="outlined">{moment(time.ngayChieuGioChieu).format('hh:mm')}</NavLink>
                                                })}
                                            </div>
                                        </div>
                                    })
                                }
                            })
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
export default React.memo(MovieTheater)
