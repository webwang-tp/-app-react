import React, { Component } from 'react'
import Newsitem from '../../components/Newsitem/Newsitem'
import Navgo from '../../components/Navgo/Navgo'

import './Collect.css'
//改写数值型组件
import { connect } from 'react-redux'
import { getCollect } from '../../store/collect'

class Detail extends Component {
    constructor() {
        super()
        this.state = {
        }
    }
    componentDidMount() {
        console.log(this.props.collectDate)
    }

    render() {
        const { collectDate } = this.props
        return (
            <div>
                <div className='collectNav'>
                    <Navgo></Navgo>
                    <p>{collectDate.length}条收藏</p>
                </div>
                <div className='collectnew'>
                    {
                        collectDate.map(item => {
                            return <Newsitem item={item} key={item.id}></Newsitem>
                        })
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        collectDate: getCollect(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)