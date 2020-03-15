//初始化收藏数据
const initialState = {
    collect: [] //收藏的id值
}
//收藏
export const changecollect = (id) => {
    return {
        type: 'collect',
        id: id
    }
}
//取消收藏
export const changecancel = (id) => {
    return {
        type: 'cancel',
        id: id
    }
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'collect':
            return {
                ...state,
                collect: [
                    ...state.collect,
                    action.id
                ]
            }
        case 'cancel':
            var collect = [...state.collect];
            var index = collect.findIndex(item => item === action.id)
            collect.splice(index, 1)
            return {
                ...state,
                collect: collect
            }
        default:
            return {
                ...state
            }
    }
}
//导出收藏的id，用来判断详情页的收藏标志
export var getcollectid = (state) => state.collect.collect

export var getCollect = (state) => {
    const homenew = state.homenews.homenews
    const collect = state.collect.collect
       return collect.map(item => {
            var i = homenew.findIndex(i => i.id === item)
            return homenew[i]
        })
}

export default reducer
