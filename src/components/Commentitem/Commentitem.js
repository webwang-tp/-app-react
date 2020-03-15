import React, { Component } from 'react'
import './Commentitem.css'
export default class Commentitem extends Component {
    render() {
        const { item } = this.props

        return (
            <div className='commentitem'>
                <div className='commentlogin'>
                    <img src={item.avatar} alt="" />
                </div>
                <div className='commentcon'>
                    <div className='commentit'><h3>{item.author}</h3><i className='iconfont icon-praise'></i></div>
                    <p>{item.content}</p>
                    <span>{item.time}</span>
                </div>
            </div>


        )
    }
}
