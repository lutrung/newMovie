import { Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import background from '../../../Assets/Images/back-news.png';
import { getCinemaSystem } from '../../../Redux/Actions/MovieManagerActions';
import CinemaByCode from './CinemaByCode';

const { TabPane } = Tabs;
export default function MovieTheater() {
    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(await getCinemaSystem())
    }, [])
    const cinemaSystem = useSelector(state => state.MovieManagerReducer.cinemaSystem)
    const [code, setCode] = useState('BHDStar')
    const onChangeCinema = (newCode) => {
        setCode(newCode)
    }
    return (
        <div className='movieTheater' style={{ backgroundImage: `url(${background})` }}>
            <Tabs className='movieTheater-container' tabPosition='left'>
                {cinemaSystem.map((cinema, index) => {
                    return <TabPane tab={<div style={{ padding: 20 }} onClick={() => onChangeCinema(cinema.maHeThongRap)}><img src={cinema.logo} width={50} height={50} /></div>} key={index} >
                        <CinemaByCode code={code} />
                    </TabPane>
                })}
            </Tabs>
        </div>
    )
}
