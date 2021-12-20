import React from 'react'
import background from '../../../Assets/Images/backapp.jpg'
import phone from '../../../Assets/Images/mobile.png'
import slide4 from '../../../Assets/Images/slide4.jpg'
import slide16 from '../../../Assets/Images/slide16.jpg'
import slide13 from '../../../Assets/Images/slide13.jpg'
import slide12 from '../../../Assets/Images/slide12.jpg'
import slide11 from '../../../Assets/Images/slide11.jpg'
import Slider from "react-slick";

export default function Application() {
    const listSlider = [
        {
            img: slide4
        },
        {
            img: slide12
        },
        {
            img: slide11
        },
        {
            img: slide16
        },
        {
            img: slide13
        }
    ]
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <div id='ungdung' className='application' style={{ background: `url(${background})` }}>
            <div className='app-container'>
                <div className='app-left'>
                    <h2>Ứng dụng tiện lợi dành cho người yêu điện ảnh</h2>
                    <p>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                    <a href='https://itunes.apple.com/us/app/123phim-mua-ve-lien-tay-chon/id615186197?mt=8' target='_blank' className='download'>App miễn phí - Tải về ngay!</a>
                </div>
                <div className='app-right'>
                    <img className='app-mobile' src={phone} />
                    <Slider className='app-slider'{...settings}>
                        {listSlider.map((slide, index) => {
                            return <div key={index} className='carousel-item'>
                                <img src={slide.img} />
                            </div>
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    )
}
