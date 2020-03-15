import { latestNews, beforeNews } from '../util/API'

const initialState = {
    homenews: [],//最新新闻
    beforenews: [],//过去的新闻
    flag: true//用来判断数据请求是否完成，false不能发起请求
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
export var requersthomenew = () => {
    return (dispatch) => {
        latestNews().then(res => {
            return dispatch(changehome(res.data.stories))
        })
    }
}
//过去的新闻
export var requerstbeforenews = (time) => {
    return (dispatch) => {
        beforeNews(time).then(res => {
            return dispatch(changebeford(res.data))
        })
    }
}
var beforetime = (data) => {
    var d = new Date().getTime(data);
    var D = new Date(d)
    var y = D.getFullYear()
    var m = (D.getMonth() + 1 + '').padStart(2, '0');
    var r = (D.getDate() + '').padStart(2, '0');
    return y + '年' + m + '月' + r + '日'
    // return D
}
var arr = []
var arrtime = []
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'changehomenew':
            return {
                ...state,
                homenews: action.homenews
            }
        case 'changebeforenew':
            // var arrtime =  action.beforenews.map(item => item.date = beforetime(Number(item.date)))
            // console.log(arrtime)
            // arrtime.push(action.beforenews) 
            // arrtime.map(item => item.date = beforetime(Number(item.date)))
            // console.log(arrtime)

            // arrtime.push(action.beforenews)
            // arrtime.map(item => item.date = beforetime(Number(item.date)))
            // console.log(arrtime)
            // console.log(action.beforenews.date)
            // action.beforenews.date = beforetime(Number(action.beforenews.date))
            // console.log(action.beforenews.date)
            // arr.push(action.beforenews)
            // arr.map(item => item.date = beforetime(Number(item.date)))

            // console.log(arr)
            return {
                ...state,
                beforenews: [
                    ...state.beforenews,
                    action.beforenews
                ],
                flag: true
            }
        case 'changeflag':
            return {
                ...state,
                flag: action.state
            }
        default:
            return {
                ...state
            }
    }
}

export var gethomenew = (state) => state.homenews.homenews
export var getbeforenew = (state) => state.homenews.beforenews
export var getflag = (state) => state.homenews.flag
export default reducer