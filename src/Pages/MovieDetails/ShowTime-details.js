import { Tabs } from 'antd';
import moment from 'moment';
import React from 'react';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;
function ShowTimeDetails({ movieDetails }) {
    const onChangeCluster = (key) => {
        let listLogoItem = document.getElementsByClassName('logo-item')
        let lengthListLogoItem = listLogoItem.length
        for (let i = 0; i < lengthListLogoItem; i++) {
            if (listLogoItem[i].classList.contains('active')) {
                listLogoItem[i].classList.remove('active')
            }
            if (key === i) {
                listLogoItem[i].classList.add('active')
            }
        }
        let listCinema = document.getElementsByClassName('cinemaByCode-item')
        let lengthListCinema = listCinema.length
        for (let i = 0; i < lengthListCinema; i++) {
            listCinema[i].classList.remove('active')

        }
    }
    return (
        <div id='ShowTimeDetails' className='movieDetailsShowTime'>
            <div className='movieDetailsShowTime-container'>
                <Tabs className='showTime-details' defaultActiveKey="1" >
                    <TabPane tab="Lịch chiếu" key="1">
                        <div className='showTime-container'>
                            <div className=" nav flex-column nav-pills  showTime-logo" >
                                {movieDetails.heThongRapChieu?.map((theaterSystem, index) => {
                                    return (
                                        <a key={index} className={`logo-item ${index === 0 ? 'active' : null}`} id={theaterSystem.maHeThongRap + "-tab"} data-bs-toggle="pill" href={`#${theaterSystem.maHeThongRap}`}
                                            role="tab" aria-controls={theaterSystem.maHeThongRap} aria-selected="true" onClick={() => onChangeCluster(index)}>
                                            <img src={theaterSystem.logo} alt='logo' height={50} width={50} />
                                        </a>
                                    )
                                })}
                            </div>
                            <div className=" showTime-cinema">
                                <div className="tab-content" id="v-pills-tabContent">
                                    {movieDetails.heThongRapChieu?.map((theaterSystem, index) => {
                                        return (
                                            <div key={index} className={`tab-pane fade show ${index === 0 ? 'active' : null}`}
                                                id={theaterSystem.maHeThongRap} role="tabpanel" aria-labelledby={theaterSystem.maHeThongRap + "-tab"}>
                                                {theaterSystem.cumRapChieu?.map((theater, index) => {
                                                    return <div key={index} className='theater-item'>
                                                        <div className='info-top'>
                                                            <img src={theater.hinhAnh} alt='...' />
                                                            <div>
                                                                <h3 className='top-name'>{theater.tenCumRap}</h3>
                                                                <p className='top-rate'>157 phút - TIX 0 - IMDb 6.8</p>
                                                            </div>
                                                        </div>
                                                        <div className='info-bottom'>
                                                            <h4>Suất chiếu:</h4>
                                                            {theater.lichChieuPhim?.slice(0, 7).map((time, index) => {
                                                                return <NavLink to={'/phongve/' + time.maLichChieu} key={index} className='btn-time' variant="outlined">{moment(time.ngayChieuGioChieu).format('hh:mm')}</NavLink>
                                                            })}
                                                        </div>
                                                    </div>
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Thông tin" key="2">
                        <div className='row info-content'>
                            <div className='col-6 info-content-left'>
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className='title'>Ngày công chiếu</span>
                                    </div>
                                    <div className='col-6'>
                                        <span className='content'>{moment(movieDetails.ngayKhoiChieu).format('MM-DD-YYYY')}</span>
                                    </div>
                                </div>
                                {/* ------------- */}
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className='title'>Đạo diễn</span>
                                    </div>
                                    <div className='col-6'>
                                        <span className='content'>Lư Trung</span>
                                    </div>
                                </div>
                                {/* ------------- */}
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className='title'>Diễn viên</span>
                                    </div>
                                    <div className='col-6'>
                                        <span className='content'>Lư Trung</span>
                                    </div>
                                </div>
                                {/* ------------- */}
                                <div className='row'>
                                    <div className='col-6'>
                                        <span className='title'>Thể loại</span>
                                    </div>
                                    <div className='col-6'>
                                        <span className='content'>Đồ án</span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 info-content-right'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <span className='title'>Nội dung</span>
                                    </div>
                                    <div className='col-12'>
                                        <span className='content'>{movieDetails.moTa}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}
export default React.memo(ShowTimeDetails);