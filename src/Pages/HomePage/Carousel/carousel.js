import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React from 'react';
import { useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import playIcon from '../../../Assets/Images/playIcon.png';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
};
export default function Carousel() {

    const bannerList = useSelector(state => state.MovieManagerReducer.bannerList)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <div className='carousel'>
            <Slider {...settings}>
                {bannerList.map((banner, index) => {
                    return <div key={index} className='carousel-item'>
                        <img src={banner.hinhAnh} style={{ width: '100%', height: 800 }} />
                        <Button className='carousel-play' onClick={handleOpen}><img src={playIcon} style={{ width: '100%', }} /></Button>
                    </div>
                })}
            </Slider>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                    </iframe>
                </Box>
            </Modal>
        </div>
    )
}
