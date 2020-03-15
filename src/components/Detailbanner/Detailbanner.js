import React, { Component } from 'react'
import './Detailbanner.css'
export default class Detailbanner extends Component {
    render() {
        const { detailImg, detailTitle, detailsoare } = this.props
        return (
            <div className='detailbanner'>
                <img src={detailImg} alt="" />
                <p>{detailTitle}</p>
                <span>{detailsoare}</span>
            </div>
        )
    }
}
