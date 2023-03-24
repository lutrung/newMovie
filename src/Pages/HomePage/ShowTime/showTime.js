import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import ShowTimeItem from './showTime-item';
const { TabPane } = Tabs;
function ShowTime() {
    const settings = {
        rows: 2,
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        // autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const moviesList = useSelector(state => state.MovieManagerReducer.moviesList)
    return (
        <Tabs id='lichchieu' className='showTime' defaultActiveKey="1" >
            <TabPane tab="Đang chiếu" key="1">
                <Slider {...settings}>
                    {moviesList?.map((item, index) => {
                        return (
                            <ShowTimeItem key={index} item={item} showing={true} />
                        )
                    })}
                </Slider>
            </TabPane>
            <TabPane tab="Sắp chiếu" key="2">
                <Slider {...settings}>
                    {moviesList?.slice(15).map((item, index) => {
                        return (
                            <ShowTimeItem key={index} item={item} showing={false} />
                        )
                    })}
                </Slider>
            </TabPane>
        </Tabs>
    )
}
export default React.memo(ShowTime)