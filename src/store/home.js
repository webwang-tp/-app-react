import { latestNews, beforeNews } from '../util/API'

const initialState = {
    homenews: [],//最新新闻
    flag: true,//用来判断数据请求是否完成，false不能发起请求
    num: 1//过去新闻的天数
}
const changehome = (data) => {
    return {
        type: 'changehomenew',
        homenews: data
    }
}
const changebeford = (data) => {
    return {
        type: 'changebeforenew',
        beforenews: data 
    }
}
export const changeflag = (data) => {
    return {
        type: 'changeflag',
        state: data
    }
}
export const changenum = (data)=>{
    return{
        type:'changenum',
        num:data
    }
}
//最新新闻
export var requersthomenew = () => {
    return (dispatch,getState) => {
        const {homenews} = getState();
        if (homenews.homenews.length>0){
            return
        }
        latestNews().then(res => {
            return dispatch(changehome(res.data.stories))
        })
    }
}
//过去的新闻
export var requerstbeforenews = (n) => {
    return (dispatch,getState) => {
        const { homenews } = getState();
        console.log(homenews)
        console.log(n)
        console.log(getRequestTime(n).time)
        if (homenews.num < homenews.homenews.length){
            return
        }
        beforeNews(getRequestTime(n).time).then(res => {
            return dispatch(changebeford(res.data.stories))
        })
    }
}
function getRequestTime(n) {
    var newdate = new Date().getTime();
    var beforedate = newdate - (n - 1) * 24 * 60 * 60 * 1000;
    var beforeDate = new Date(beforedate);
    var beforeY = beforeDate.getFullYear();
    var beforeM = (beforeDate.getMonth() + 1 + '').padStart(2, '0');
    var beforeD = (beforeDate.getDate() + '').padStart(2, '0');
    var time = beforeY + beforeM + beforeD

    var ctime = new Date().getTime();
    var ctimebefore = ctime - n * (24 * 60 * 60 * 1000);
    var ctimebeforeDate = new Date(ctimebefore);
    var ctimeM = (ctimebeforeDate.getMonth() + 1 + '').padStart(2, '0');
    var ctimeD = (ctimebeforeDate.getDate() + '').padStart(2, '0');
    var times = ctimeM + '月' + ctimeD + '日'
    return {
        time,
        times
    }
}
var arr = []
var arrtime = []
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'changehomenew':
            return {
                ...state,
                homenews: [
                    ...state.homenews,
                    {
                        title: '今日新闻',
                        data: action.homenews
                    }
                ]
            }
        case 'changebeforenew':
            return {
                ...state,
                homenews:[
                    ...state.homenews,
                    {
                        title: getRequestTime(state.num).times,
                        data: action.beforenews
                    }
                ],
                flag: true
            }
        case 'changeflag':
            return {
                ...state,
                flag: action.state
            }
        case 'changenum':
            return{
                ...state,
                num:action.num
            }
        default:
            return {
                ...state
            }
    }
}

export var gethomenew = (state) => state.homenews.homenews
export var getflag = (state) => state.homenews.flag
export var getnum = (state) => state.homenews.num

export default reducer