import React, { Component } from 'react'
import './DetailNav.css'
import {Link} from 'react-router-dom'
import Navgo from '../Navgo/Navgo'
export default class DetailNav extends Component {
    //收藏
    render() {
        const { short, long, flag } = this.props
        return (
            <div className='detailNav'>
                <div className='detailLeft'>
                    <Navgo></Navgo>
                </div>
                <div className='detailRight'>
                    <span><i className='iconfont icon-fenxiang3'></i></span>
                    {/* <span><i className='iconfont icon-start-copy' style={{ color: 'yellow' }} onClick={this.props.cancel}></i></span>
                    <span><i className='iconfont icon-start-copy' onClick={this.props.collect}></i></span> */}
                    {flag ? <span><i className='iconfont icon-start-copy' style={{ color: 'yellow' }} onClick={this.props.cancel}></i></span> : <span><i className='iconfont icon-start-copy' onClick={this.props.collect}></i></span>}
                    <span><Link to='/comment'><i className='iconfont icon-xinxi1'>{short.length + long.length}</i></Link></span>
                    
                    <span><i className='iconfont icon-praise'></i></span>
                </div>
            </div>
        )
    }
}
