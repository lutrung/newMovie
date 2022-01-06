import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { bookTicketsAction } from '../../../Redux/Actions/MovieManagerActions'

function TicketInfo({ showtimeCode }) {
    const dispatch = useDispatch()
    const ticketRoom = useSelector(state => state.MovieManagerReducer.ticketRoom)
    const listBookingSeat = useSelector(state => state.MovieManagerReducer.listBookingSeat)

    const bookTickets = () => {
        let tickets = {
            "maLichChieu": showtimeCode,
            "danhSachVe": listBookingSeat.map((item) => {
                return {
                    "maGhe": item.seatCode,
                    "giaVe": item.ticketPrice
                }
            })
        }
        Swal.fire({
            title: 'Thông tin đặt vé sẽ được gửi qua email',
            text: "Hãy kiểm tra thông tin trước khi xác nhận!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(bookTicketsAction(tickets))
            }
        })
    }
    return (
        <div className='ticketInfo'>
            <div className='ticketInfo-top'>
                <h2 className='ticketInfo-price'>{listBookingSeat.reduce((total, seat) => {
                    return total += seat.ticketPrice
                }, 0).toLocaleString()} VND</h2>
                <div className='ticketInfo-details'>
                    <img className='details-left' src={ticketRoom.thongTinPhim?.hinhAnh} alt='...' />
                    <div className='details-right'>
                        <h2 className='right-nameMovie'>{ticketRoom.thongTinPhim?.tenPhim}</h2>
                        <div>
                            <div className='right-nameTheater right-item'>
                                Tên rạp:
                                <p>{ticketRoom.thongTinPhim?.tenCumRap} - {ticketRoom.thongTinPhim?.tenRap}</p>
                            </div>
                            <div className='right-showTime right-item'>
                                Ngày giờ chiếu:
                                <p>{ticketRoom.thongTinPhim?.ngayChieu}</p>
                            </div>
                            <div className='ticketInfo-seatMoblie right-item'>
                                {listBookingSeat.length === 0 ? 'Vui lòng chọn ghế !' : 'Ghế:'}
                                &ensp;
                                <div className='seatList'>
                                    {listBookingSeat?.map((seat, index) => {
                                        return <p key={index}>&ensp;{seat.stt}</p>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ticketInfo-seat'>
                    {listBookingSeat.length === 0 ? 'Vui lòng chọn ghế !' : 'Ghế:'}
                    &ensp;
                    <div className='seatList'>
                        {listBookingSeat?.map((seat, index) => {
                            return <p key={index}>&ensp;{seat.stt}</p>
                        })}
                    </div>
                </div>
            </div>
            <button disabled={listBookingSeat.length === 0 ? 'disabled' : ''} className='ticketInfo-btn' onClick={() => bookTickets()}>Đặt vé</button>
        </div>
    )
}
export default React.memo(TicketInfo)
