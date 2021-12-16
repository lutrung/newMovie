import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { Fragment, useState } from 'react';
import playIcon from '../../../Assets/Images/playIcon.png'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
};
export default function ShowTimeItem({ item, showing }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <iframe width="100%" height="100%" src={item.trailer} frameborder="0" allowfullscreen>
                    </iframe>
                    <p>{item.trailer}</p>
                </Box>
            </Modal>
            <div className='showTime-item'>
                <div className='item-thumbnail' style={{ backgroundImage: `url(${item.hinhAnh})` }}>
                    <div className='item-overlay'></div>
                    <button className='item-play' onClick={handleOpen}>
                        <img src={playIcon} style={{ width: '100%' }} />
                    </button>
                </div>
                <div className='item-info'>
                    {showing ? <Fragment><div className='item-name' title={item.tenPhim}>
                        <span className='item-age'>C13 </span>
                        {item.tenPhim}
                    </div>
                        <div className='item-buyTickets'>
                            Mua vé
                        </div></Fragment> : <div className='item-name2' title={item.tenPhim}>
                        <span className='item-age'>C13 </span>
                        {item.tenPhim}
                    </div>}

                </div>
            </div>
        </div>
    )
}