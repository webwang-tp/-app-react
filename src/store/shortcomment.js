//引入api接口
import { shortcomments } from '../util/API'
//初始化仓库数据
const initialState = {
    shortcommemt: []
}
//同步action 请求
const changeShortcomment = (data) => {
    return {
        type: 'changeShortcomment',
        shortCommemt: data
    }
}
//异步action 请求
export const requestshortcomment = (params) => {
    return (dispatch) => {
        shortcomments(params).then(res => {
            return dispatch(changeShortcomment(res.data.comments))
        })
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'changeShortcomment':
            return {
                ...state,
                shortcommemt: action.shortCommemt
            }
        default:
            return {
                ...state
            }
    }
}
// 
export var getshortcom = (state) => state.shortcomment.shortcommemt

export default reducer