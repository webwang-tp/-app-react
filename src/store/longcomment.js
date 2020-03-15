//引入api接口
import { longcomments} from '../util/API'
//初始化仓库数据
const initialState={
    longcommemt:[]
}
//同步action
const changeLongcomment = (data) => {
    return {
        type: 'changeLongcomment',
        longCommemt: data
    }
}
//异步action
export const requestlongcomment = (params) => {
    return (dispatch) => {
        longcomments(params).then(res => {
            return dispatch(changeLongcomment(res.data.comments))
        })
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'changeLongcomment':
            return {
                ...state,
                longcommemt: action.longCommemt
            }
        default:
            return {
                ...state
            }
    }
}


export var getlongcom = (state) => state.longcomment.longcommemt

export default reducer