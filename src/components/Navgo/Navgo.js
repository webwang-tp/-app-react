import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class Navgo extends Component {
    navgo() {
        this.props.history.go(-1)
    }
    render() {
        return (
            <div>
                <i className='iconfont icon-iconfontzuojiantou' onClick={this.navgo.bind(this)}></i>
            </div>
        )
    }
}
export default withRouter(Navgo)