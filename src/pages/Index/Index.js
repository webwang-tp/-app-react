import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';
import { Drawer, List, NavBar } from 'antd-mobile';
import { latestNews } from '../../util/API'
//改写成容器型组件
import { connect } from "react-redux"
import { gethomenew, requersthomenew, getflag, changeflag, requerstbeforenews, getnum, changenum } from '../../store/home'
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
            indexnavtitle: '首页',//头部导航文字提示
        }
        this.newbox = React.createRef();
        this.indexheader = React.createRef()
    }
    num = 1

    componentDidMount() {
        this.props.requesthomeNews()//redux获取数据,今日新闻
        this.props.requestbeforeNews(this.props.num)//过去新闻
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
                this.props.requestnum(this.props.num + 1)
                this.props.requestbeforeNews(this.props.num)
            }
            // 头部导航文字提示
            var titles = document.querySelectorAll('.homenewsitem');
            var index = 0;
            for (var i = 0; i < titles.length; i++) {
                if (titles[i].getBoundingClientRect().top < 56){
                   index=i;
                    this.setState({
                        ...this.state,
                        indexnavtitle:index===0?'首页':titles[index].innerHTML
                    })
                }
            }
        }
    }
    componentWillUnmount() {
        window.onscroll = null;
    }
    onOpenChange() {
        this.setState({ open: !this.state.open });
    }
    render() {
        const { homenews } = this.props
        const { indexnavtitle}=this.state
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
                    <IndexNav onOpenChange={this.onOpenChange.bind(this)} indexnavtitle={indexnavtitle} ref={this.indexheader}></IndexNav>
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
                        {
                            homenews.map(item => {
                                return <div key={item.title}>
                                    <p className='homenewsitem'>{item.title}</p>
                                    {
                                        item.data.map(item => {
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
        flag: getflag(state),
        num: getnum(state)
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requesthomeNews: () => dispatch(requersthomenew()),
        requestbeforeNews: (params) => dispatch(requerstbeforenews(params)),
        requestflag: (params) => dispatch(changeflag(params)),
        requestnum: (params) => dispatch(changenum(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)