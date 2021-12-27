import React, { Fragment } from 'react'
import Application from './Application/Application'
import Carousel from './Carousel/carousel'
import MovieTheater from './MovieTheater/MovieTheater'
import News from './News/news'
import ShowTime from './ShowTime/showTime'

export default function HomePage() {
    return (
        <Fragment>
            <Carousel />
            <ShowTime />
            <MovieTheater />
            <News />
            <Application />
        </Fragment>
    )
}
