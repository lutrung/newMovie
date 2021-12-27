import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../../Assets/Images/logo.png'
import Swal from 'sweetalert2'
import { getTicketRoom } from '../../../Redux/Actions/MovieManagerActions'
import ChooseSeat from './ChooseSeat'
import TicketInfo from './TicketInfo'
function TicketRoom({ props }) {
    const dispatch = useDispatch()
    const showtimeCode = props.match.params.showtimeCode
    const ticketRoom = useSelector(state => state.MovieManagerReducer.ticketRoom)
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(5)
    function resetTime() {
        if (minutes === 0 && seconds === 0) {
            Swal.fire({
                title: 'Đã hết thời gian giữ ghế.',
                text: "Vui chọn ghế trong thời hạn 5 phút",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đặt vé lại',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                } else {
                    props.history.push('/')
                }
            })
        }
        else {
            if (seconds === 0) {
                setMinutes(minutes => minutes - 1);
                setSeconds(59);
            } else {
                setSeconds(seconds => seconds - 1);
            }
        }
    }
    useEffect(() => {
        const token = setTimeout(resetTime, 1000)
        return function cleanUp() {
            clearTimeout(token);
        }
    })
    useEffect(async () => {
        if (showtimeCode) {
            dispatch(await getTicketRoom(showtimeCode))
        }
    }, [])
    return (
        <div className='ticketRoom'>
            <div className='ticketRoom-left'>
                <div className='left-header'>
                    <div className='header-info'>
                        <a href='/' className='header-logo'>
                            <img src={logo} alt='...' />
                        </a>
                        <div className='header-address'>
                            <h4>{ticketRoom.thongTinPhim?.tenCumRap}</h4>
                            <p>{ticketRoom.thongTinPhim?.diaChi}</p>
                        </div>
                    </div>

                    <div className='header-countDown'>
                        <p>Thời gian giữ ghế</p>
                        <span>{String(Math.floor(minutes)).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
                    </div>
                </div>
                <div className='left-body'>
                    <ChooseSeat />
                </div>
            </div>
            <div className='ticketRoom-right'>
                <TicketInfo showtimeCode={showtimeCode} />
            </div>
        </div>
    )
}
export default React.memo(TicketRoom);

