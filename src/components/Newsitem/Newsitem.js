import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './Newsitem.css'
class Newsitem extends Component {
    detail(id){
       this.props.history.push('/detail'+id)
    }
    render() {
        const {item}=this.props
        return (
            <div className='newsitem' onClick={this.detail.bind(this,item.id)}>
                <div className='newsitem-title'>
                    <p>{item.title}</p>
                </div>
                <div className='newsitem-img'>
                    <img src={item.images} alt=""/>
                </div>
            </div>
        )
    }
}
export default withRouter(Newsitem)