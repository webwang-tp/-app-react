import React, { Component } from 'react'
import './IndexNav.css'
export default class IndexNav extends Component {
    constructor(){
        super()
        this.indexheader = React.createRef()
    }
    render() {
        const { indexnavtitle , ref} = this.props
        return (
            <div className='indexNav' ref={ref}>
                <div className='indexLeft'>
                    <i className='iconfont icon-hanbao2' onClick={() => this.props.onOpenChange()}></i>
                    <span>{indexnavtitle}</span>
                </div>
                <div className='indexRight'>
                    <i className='iconfont icon-lingdang1'></i>
                    <i className='iconfont icon-more'></i>
                </div>
            </div>
        )
    }
}
