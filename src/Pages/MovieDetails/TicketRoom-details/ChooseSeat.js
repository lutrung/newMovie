import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
function ChooseSeat({ }) {
    const dispatch = useDispatch()
    const ticketRoom = useSelector(state => state.MovieManagerReducer.ticketRoom)
    const listBookingSeat = useSelector(state => state.MovieManagerReducer.listBookingSeat)
    return (
        <div className='ChooseSeat'>
            {ticketRoom.danhSachGhe?.map((seat, index) => {
                let classVipSeats = seat.loaiGhe === 'Thuong' ? '' : 'vipSeats';
                let classBookedSeats = seat.daDat ? 'bookedSeats' : '';
                let disable = seat.daDat ? 'disable' : '';
                let seatNumber = seat.daDat ? 'X' : seat.stt;
                let indexGheDangDat = listBookingSeat.findIndex(gheDangDat => seat.maGhe === gheDangDat.maGhe)
                let classGheDangDat = indexGheDangDat !== -1 ? 'gheDangDat' : '';
                return <Fragment key={index}>
                    <button onClick={() => {
                        dispatch({
                            type: "BOOKING_SEAT",
                            gheDangDat: {
                                maGhe: seat.maGhe,
                                giaVe: seat.giaVe,
                                stt: seat.stt
                            }
                        })
                    }} disabled={`${disable}`} className={`seat ${classVipSeats} ${classBookedSeats} `}>{seatNumber}</button>
                    {(index + 1) % 16 === 0 ? <br /> : ''}
                </Fragment>
            })}
        </div>
    )
}
export default React.memo(ChooseSeat)

