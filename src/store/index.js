import { createStore, applyMiddleware,combineReducers} from 'redux'
import thunk from 'redux-thunk'


import homenews from './home'
import longcomment from './longcomment'
import shortcomment from './shortcomment'
import collect from './collect'


const reducer=combineReducers({
    homenews,
    longcomment,
    shortcomment,
    collect
})





const store = createStore(reducer,applyMiddleware(thunk))




export default store