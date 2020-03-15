import React, { Component } from 'react'
import './CommentNo.css'
import commentimg from '../../assets/images/comment.jpg'
export default class CommentNo extends Component {
  
    render() {
        return (
            <div className='commentno'>
                <img src={commentimg} alt=""/>
            </div>
        )
    }
}
