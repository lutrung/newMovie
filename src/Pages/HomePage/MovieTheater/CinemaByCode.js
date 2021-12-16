import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTheTheaterClusterByCode } from '../../../Redux/Actions/MovieManagerActions';
import { Tabs } from 'antd';
import Showtimes from './Showtimes';
const { TabPane } = Tabs;

export default function CinemaByCode({ code }) {
    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(await getTheTheaterClusterByCode(code))
    }, [code])
    const cinemaByCode = useSelector(state => state.MovieManagerReducer.cinemaByCode)
    return (
        <div className='cinemaByCode'>
            <Tabs className='cinemaByCode-container' tabPosition='left'>
                {cinemaByCode.map((cinema, index) => {
                    return <TabPane tab={<div className='cinemaByCode-item'><img className='cinemaByCode-logo' src='https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png' />
                        <div className='cinemaByCode-info'>
                            <p title={cinema.tenCumRap} className='info-name'>{cinema.tenCumRap}</p>
                            <p title={cinema.diaChi} className='info-address'>{cinema.diaChi}</p>
                            <p className='info-detail'>[Chi tiết]</p>
                        </div></div>} key={index} >
                        <Showtimes code={code} theaterCode={cinema.maCumRap} />
                    </TabPane>
                })}
            </Tabs>
        </div>
    )
}
