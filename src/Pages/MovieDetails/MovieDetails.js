import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from '../../Redux/Actions/MovieManagerActions';
import Info from './Info';
import ShowTimeDetails from './ShowTime-details';

export default function MovieDetails(props) {
    const movieCode = props.match.params.movieCode
    const dispatch = useDispatch()
    const movieDetails = useSelector(state => state.MovieManagerReducer.movieDetails)
    useEffect(() => {
        async function fetchData() {
            if (movieCode) {
                dispatch(await getMovieDetails(movieCode))
            }
        }
        fetchData();
    }, [movieCode])
    return (
        <div className='movieDetails'>
            <Info movieDetails={movieDetails} />
            <ShowTimeDetails movieDetails={movieDetails} />
        </div>
    )
}
