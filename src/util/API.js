import axios from 'axios'

axios.interceptors.response.use(res=>{
    console.log("这次请求的接口：", res.config.url);
    console.log(res);
    return res;
})
//最新的新闻数据
export var latestNews=(params)=>{
    return axios({
        url:'/api/4/stories/latest',
        method:'get'
    })
}
//过去的新闻数据
export var beforeNews=(params)=>{
    return axios({
        url:'/api/4/stories/before/'+params
    })
}
//文章详情
export var detailNews=(params)=>{
    return axios({
        url:'/api/4/story/'+params,
        method:'get',
    })
}
//文章长评
export var longcomments=(params)=>{
    return axios({
        url:'/api/4/story/'+params+'/long-comments',
        method:'get'
    })
}
//文章短平
export var shortcomments = (params) => {
    return axios({
        url: '/api/4/story/' + params +'/short-comments',
        method: 'get'
    })
}