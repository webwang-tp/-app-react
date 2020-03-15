import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'
export default class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <div className='sidebarlogin'>
                    <div className='sidebarimg'>
                        <img src="http://img0.imgtn.bdimg.com/it/u=2068836929,644581279&fm=26&gp=0.jpg" alt="" />
                    </div>
                    <span>王天鹏</span>
                </div>
                <div className='sidebarnav'>
                    <div className='sidebarLeft'>
                        <Link to='/collect'><i className='iconfont icon-start-copy'></i>我的收藏</Link>
                    </div>
                    <div className='sidebarRight'>
                        <i className='iconfont icon-xiazai'></i>
                        离线下载
                   </div>
                </div>
                <div className='sidebarList'>
                    <i className='iconfont icon-index-copy'></i>
                    首页
               </div>
            </div>
        )
    }
}
