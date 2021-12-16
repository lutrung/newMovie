import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getBannerList, getCinemaSystem, getMovieList } from '../../Redux/Actions/MovieManagerActions'
import Application from './Application/Application'
import Carousel from './Carousel/carousel'
import MovieTheater from './MovieTheater/MovieTheater'
import News from './News/news'
import ShowTime from './ShowTime/showTime'

export default function HomePage() {
    const dispatch = useDispatch()
    useEffect(async () => {
        dispatch(await getMovieList())
        dispatch(await getBannerList())
    }, [])
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
