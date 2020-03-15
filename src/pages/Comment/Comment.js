import React, { Component } from 'react'
import './Comment.css'
//引入组件
import Navgo from '../../components/Navgo/Navgo'
import Commentitem from '../../components/Commentitem/Commentitem'
import Commentno from '../../components/CommentNo/CommentNo'
//antd框架
import { Accordion } from 'antd-mobile';
//改写成数值型组件
import { connect } from 'react-redux'
import { getlongcom } from '../../store/longcomment'
import { getshortcom } from '../../store/shortcomment'
import CommentNo from '../../components/CommentNo/CommentNo'
class Comment extends Component {
    onChange = (key) => {
        console.log(key);
    }
    render() {
        const { getlongcom, getshortcom } = this.props
        return (
            <div>
                <div className='commentNav'>
                    <Navgo></Navgo>
                    <p>{getlongcom.length + getshortcom.length}条点评</p>
                </div>
                <div style={{ marginTop: 1 + 'rem' }}>
                    <Accordion accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header={getlongcom.length + '条长评'} className="pad">
                            {getlongcom.length > 0 ? '' : <CommentNo></CommentNo>}
                            {
                                getlongcom.map(item => {
                                    return <Commentitem key={item.id} item={item}></Commentitem>
                                })
                            }
                        </Accordion.Panel>
                        <Accordion.Panel header={getshortcom.length + '条短评'} className="pad">
                            {getshortcom.length > 0 ? '' : <CommentNo></CommentNo>}
                            {
                                getshortcom.map(item => {
                                    return <Commentitem key={item.id} item={item}></Commentitem>
                                })
                            }
                        </Accordion.Panel>
                    </Accordion>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        getlongcom: getlongcom(state),
        getshortcom: getshortcom(state)
    }
}

export default connect(mapStateToProps)(Comment)