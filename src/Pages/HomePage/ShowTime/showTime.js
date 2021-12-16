import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import ShowTimeItem from './showTime-item';
const { TabPane } = Tabs;
export default function ShowTime() {
    const settings = {
        rows: 2,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
    };
    const moviesList = useSelector(state => state.MovieManagerReducer.moviesList)
    return (
        <Tabs id='showTime' className='showTime' defaultActiveKey="1" >
            <TabPane tab="Đang chiếu" key="1">
                <Slider {...settings}>
                    {moviesList.slice(0, 14).map((item, index) => {
                        return (
                            <ShowTimeItem key={index} item={item} showing={true} />
                        )
                    })}
                </Slider>
            </TabPane>
            <TabPane tab="Sắp chiếu" key="2">
                <Slider {...settings}>
                    {moviesList.slice(14).map((item, index) => {
                        return (
                            <ShowTimeItem key={index} item={item} showing={false} />
                        )
                    })}
                </Slider>
            </TabPane>
        </Tabs>
    )
}
