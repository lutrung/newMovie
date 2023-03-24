import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BOOKING_SEAT } from '../../../Redux/Const/MovieManagerConst'
import screen from '../../../Assets/Images/screen.png'

function ChooseSeat() {
    const dispatch = useDispatch()
    const ticketRoom = useSelector(state => state.MovieManagerReducer.ticketRoom)
    const listBookingSeat = useSelector(state => state.MovieManagerReducer.listBookingSeat)
    return (<Fragment>
        <img className='screen' src={screen} alt='screen' />
        <div className='chooseSeat'>
            {ticketRoom.danhSachGhe?.map((seat, index) => {
                let vipSeatsCss = seat.loaiGhe === 'Thuong' ? '' : 'vipSeats';
                let bookedSeatsCss = seat.daDat === true ? 'bookedSeats' : '';
                let disable = seat.daDat ? 'disable' : '';
                let seatNumberCss = seat.daDat ? 'X' : seat.stt;
                let indexBookingSeat = listBookingSeat.findIndex(bookingSeat => seat.maGhe === bookingSeat.seatCode)
                let bookingSeatCss = indexBookingSeat !== -1 ? 'bookingSeat' : '';
                return <Fragment key={index}>
                    <button onClick={() => {
                        dispatch({
                            type: BOOKING_SEAT,
                            bookingSeat: {
                                seatCode: seat.maGhe,
                                ticketPrice: seat.giaVe,
                                stt: seat.stt
                            }
                        })
                    }} disabled={`${disable}`} className={`seat ${vipSeatsCss} ${bookedSeatsCss} ${bookingSeatCss} `}>{seatNumberCss}</button>
                    {(index + 1) % 16 === 0 ? <br /> : ''}
                </Fragment>
            })}
        </div>
        <div className='typeOfSeat'>
            <div className='typeOfSeat-item'>
                <button className='seat'></button>
                <span>Ghế thường</span>
            </div>
            <div className='typeOfSeat-item'>
                <button className='seat vipSeats'></button>
                <span>Ghế VIP</span>
            </div>
            <div className='typeOfSeat-item'>
                <button className='seat bookedSeats'>X</button>
                <span>Ghế đã được đặt</span>
            </div>
            <div className='typeOfSeat-item'>
                <button className='seat bookingSeat'></button>
                <span>Ghế đang chọn</span>
            </div>
        </div>
    </Fragment>
    )
}
export default React.memo(ChooseSeat)

