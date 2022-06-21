import moment from 'moment'
import React, { useEffect } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import background from '../../Assets/Images/backapp.jpg'
function Info({ movieDetails }) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className='movieDetailsInfo' >
            <div className='movieDetailsInfo-blur' style={{ backgroundImage: `url(${background})` }}></div>
            <div className='movieDetailsInfo-container'>
                <div className='movieDetailsInfo-left'>
                    <div className='left-img'></div>
                    <div className='left-info'>
                        <p className='info-date'>{moment(movieDetails.ngayKhoiChieu).format('DD/MM/YYYY')}</p>
                        <div className='info-name'>
                            <p>C18</p>{movieDetails.tenPhim}
                        </div>
                        <p className='info-times'>109 phút - 6.3 IMDb - 2D</p>
                        <a className='info-btn' href='#ShowTimeDetails'>Mua vé</a>
                    </div>
                </div>
                <div className='movieDetailsInfo-right'>
                    <CircularProgressbar strokeWidth={5} className='right-circular' value={movieDetails.danhGia} maxValue={10} text={`${movieDetails.danhGia}`} />
                    <div className='right-star'>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <span className='right-reviews'>
                        102 người đánh giá
                    </span>
                </div>
            </div>
        </div>
    )
}
export default React.memo(Info);
