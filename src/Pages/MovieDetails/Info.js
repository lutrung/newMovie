import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieDetails } from '../../Redux/Actions/MovieManagerActions'
import background from '../../Assets/Images/backapp.jpg'
import image from '../../Assets/Images/slide15.jpg'
function Info(props) {
    // const dispatch = useDispatch()
    // const movieDetails = useSelector(state => state.MovieManagerReducer.movieDetails)
    // console.log(movieDetails);
    // const movieCode = props.movieCode
    // useEffect(async () => {
    //     if (movieCode) {
    //         dispatch(await getMovieDetails(movieCode))
    //     }
    // }, [movieCode])
    return (
        <div className='movieDetails' >
            <div className='movieDetails-blur' style={{ backgroundImage: `url(${background})` }}></div>
            <div className='movieDetails-container'>
                <div className='movieDetails-left'>
                    <div className='left-img' style={{ backgroundImage: `url(${image})` }}></div>
                    <div className='left-info'>
                        <p className='info-date'>17.12.2021</p>
                        <div className='info-name'>
                            <p>C18</p>Ám Thuật: Xác Sống Săn Mồi - The Cursed: Dead Man's Grey
                        </div>
                        <p className='info-times'>109 phút - 6.3 IMDb - 2D</p>
                        <a className='info-btn' href='/#'>Mua vé</a>
                    </div>
                </div>
                <div className='movieDetails-right'>

                </div>
            </div>
        </div>
    )
}
export default React.memo(Info);

