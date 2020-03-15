import React, { Component } from 'react'
import './IndexNav.css'
export default class IndexNav extends Component {
    render() {
        return (
            <div className='indexNav'>
                <div className='indexLeft'>
                    <i className='iconfont icon-hanbao2' onClick={() => this.props.onOpenChange()}></i>
                     <span>首页</span>
                </div>
                <div className='indexRight'>
                    <i className='iconfont icon-lingdang1'></i>
                    <i className='iconfont icon-more'></i>
                </div>
            </div>
        )
    }
}
