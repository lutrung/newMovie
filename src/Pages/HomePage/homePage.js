import React, { Fragment, useState } from 'react'
import Application from './Application/Application'
import Carousel from './Carousel/carousel'
import MovieTheater from './MovieTheater/MovieTheater'
import News from './News/news'
import ShowTime from './ShowTime/showTime'
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
export default function HomePage() {
    const [visible, setVisible] = useState(false)
    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 1000) {
            setVisible(true)
        }
        else if (scrolled <= 1000) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
        });
    };

    window.addEventListener('scroll', toggleVisible);
    return (
        <Fragment>
            <Carousel />
            <ShowTime />
            <MovieTheater />
            <News />
            <Application />
            <Button id='backToTop' variant='contained' onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }}>
                <KeyboardArrowUpIcon className='icon' />
            </Button>
        </Fragment>
    )
}
