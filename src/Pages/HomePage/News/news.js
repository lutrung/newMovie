import React from 'react'
import background from '../../../Assets/Images/back-news.png'
import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import Film24h from './film24h';
const { TabPane } = Tabs;
export default function News() {
    return (
        <div id='tintuc' className='news' style={{ backgroundImage: `url(${background})` }}>
            <Tabs className='news-tabs' defaultActiveKey="1" >
                <TabPane tab="Điện Ảnh 24h" key="1">
                    <Film24h />
                </TabPane>
                <TabPane tab="Review" key="2">
                    <Film24h />
                </TabPane>
                <TabPane tab="Khuyến mãi" key="3">
                    <Film24h />
                </TabPane>
            </Tabs>
        </div>
    )
}
