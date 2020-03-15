import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

//引入路由组件
import Index from './pages/Index/Index'
import Detail from './pages/Detail/Detail'
import Collect from './pages/Collect/Collect'
import Comment from './pages/Comment/Comment'

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/index' component={Index}></Route>
          <Route path='/detail:id' component={Detail}></Route>
          <Route path='/collect' component={Collect}></Route>
          <Route path='/comment' component={Comment}></Route>
          <Redirect to='/index'></Redirect>
        </Switch>
      </div>
    )
  }
}

