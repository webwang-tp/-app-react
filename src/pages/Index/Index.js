import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import { Drawer, List, NavBar } from 'antd-mobile';
import { latestNews } from '../../util/API'
//改写成容器型组件
import { connect } from "react-redux"
import { gethomenew, requersthomenew, getbeforenew, requerstbeforenews, getflag, changeflag } from '../../store/home'
import './Index.css'
import IndexNav from '../../components/IndexNav/IndexNav'
import Newsitem from '../../components/Newsitem/Newsitem'
import Sidebar from '../../components/Sidebar/Sidebar'



class Index extends Component {
    constructor() {
        super()
        this.state = {
            indexBanner: [],//轮播图数据
            newsDate: [],//新闻的数据
            open: false,//抽屉状态
        }
        this.newbox = React.createRef();
        this.num = 1//过去新闻的天数
    }


    componentDidMount() {
        this.props.requesthomeNews()//redux获取数据
        var n = this.getRequestTime(this.num)
        this.props.requestbeforeNews(n)
        const { indexBanner, newsDate } = this.state
        latestNews({}).then(res => {
            for (var item of res.data.top_stories) {
                indexBanner.push(item)
            }
            this.setState({
                indexBanner
            })
            for (var item of res.data.stories) {
                newsDate.push(item)
            }
            this.setState({
                newsDate
            })
        })

        window.onscroll = () => {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            var cH = document.documentElement.clientHeight;
            var offsetH = document.documentElement.offsetHeight;
            if (scrollTop + cH + 120 >= offsetH && this.props.flag) {
                this.props.requestflag(false)
                this.num += 1
                var n = this.getRequestTime(this.num)
                this.props.requestbeforeNews(n)
            }
            // console.log(scrollTop,cH,offsetH)
        }
    }
    onOpenChange() {
        this.setState({ open: !this.state.open });
    }
    getRequestTime(n) {
        var newdate = new Date().getTime();
        var beforedate = newdate - (n - 1) * 24 * 60 * 60 * 1000;
        var beforeDate = new Date(beforedate);
        var beforeY = beforeDate.getFullYear();
        var beforeM = (beforeDate.getMonth() + 1 + '').padStart(2, '0');
        var beforeD = (beforeDate.getDate() + '').padStart(2, '0');
        return beforeY + beforeM + beforeD
    }
    beforetime(data) {
        console.log(data)
        var d = new Date().getTime(parseInt(data));
        console.log(d)
        var D = new Date(d)
        console.log(D)
        var y = (D.getMonth() + 1 + '').padStart(2, '0');
        var r = D.getDate()
        return y + '月' + r + '日'
    }
    render() {
        const { homenews, beforenews } = this.props
        console.log(beforenews)
        const sidebar = (
            <Sidebar></Sidebar>
        )
        return (
            <div className='wrap'>
                {/* 抽屉 */}
                <Drawer
                    className="my-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    enableDragHandle
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange.bind(this)}>
                    {/* 头部导航 */}
                    <IndexNav onOpenChange={this.onOpenChange.bind(this)}></IndexNav>
                    {/* 轮播图 */}
                    <div className='bannerwarp'>
                        {
                            <WingBlank>
                                <Carousel autoplay={true} infinite={true}>
                                    {this.state.indexBanner.map(item => (
                                        <a href={item.url} key={item.id}>
                                            <img src={item.image} alt="" />
                                            <p className='bannerwarp-bannertitle'>{item.title}</p>
                                        </a>
                                    ))}
                                </Carousel>
                            </WingBlank>
                        }
                    </div>
                    {/* 新闻列表 */}
                    <div className='indexnews' ref={this.newbox}>
                        <p>今日新闻</p>
                        {
                            this.state.newsDate.map(item => {
                                return <Newsitem key={item.id} item={item}></Newsitem>
                            })
                        }
                        {
                            beforenews.map(item => {
                                return <div key={item.date}>
                                    {/* <p>{item.date}</p> */}
                                    <p>{this.beforetime(item.date)}</p>
                                    {
                                        item.stories.map(item => {
                                            return <Newsitem key={item.id} item={item}></Newsitem>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </Drawer>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        homenews: gethomenew(state),
        beforenews: getbeforenew(state),
        flag: getflag(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requesthomeNews: () => dispatch(requersthomenew()),
        requestbeforeNews: (time) => dispatch(requerstbeforenews(time)),
        requestflag: (params) => dispatch(changeflag(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)