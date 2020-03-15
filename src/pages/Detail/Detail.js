import React, { Component } from 'react'
//改写数值型组件
import { connect } from 'react-redux'
import { getlongcom, requestlongcomment } from '../../store/longcomment'
import { getshortcom, requestshortcomment } from '../../store/shortcomment'
import { changecancel, changecollect, getcollectid } from '../../store/collect'

import { detailNews } from '../../util/API'
import './Detail.css'

import Detailbanner from '../../components/Detailbanner/Detailbanner'
import DetailNav from '../../components/DetailNav/DetailNav'



class Detail extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            htmlDate: '',
            cssDate: '',
            detailImg: '',
            detailTitle: '',
            detailsoare: ''
        }
    }
    componentDidMount() {
        var id = this.props.match.params.id;
        this.props.requestlongCom(id)
        this.props.requestshortCom(id)

        detailNews(this.props.match.params.id).then(res => {
            this.setState({
                id: res.data.id,
                htmlDate: res.data.body,
                cssDate: res.data.css,
                detailImg: res.data.image,
                detailTitle: res.data.title,
                detailsoare: res.data.image_source
            })
        })
    }
    //子传父,添加收藏
    collect(id) {
        this.props.requestcollect(id)
    }
    //取消收藏
    cancel(id) {
        this.props.requestcancel(id)
    }
    render() {
        const { id, htmlDate, cssDate, detailImg, detailTitle, detailsoare } = this.state
        const { shortcomment, longComment, collectDate } = this.props
        //判断当前id在不在收藏夹中
        var flag = collectDate.some(item => item === id)
        return (
            <div>
                <link rel="stylesheet" href={cssDate} />
                <DetailNav short={shortcomment} long={longComment} flag={flag} collect={this.collect.bind(this, id)} cancel={this.cancel.bind(this, id)}></DetailNav>
                <Detailbanner detailImg={detailImg} detailTitle={detailTitle} detailsoare={detailsoare}></Detailbanner>
                <div dangerouslySetInnerHTML={{ __html: htmlDate }} ></div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        longComment: getlongcom(state),//长评价
        shortcomment: getshortcom(state),//短评价
        collectDate: getcollectid(state)//收藏夹id
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestlongCom: (id) => dispatch(requestlongcomment(id)),
        requestshortCom: (id) => dispatch(requestshortcomment(id)),
        requestcollect: (id) => dispatch(changecollect(id)),
        requestcancel: (id) => dispatch(changecancel(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail)