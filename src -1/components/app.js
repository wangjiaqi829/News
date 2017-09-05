/**
 * 根路由组件
 */
import React, {Component} from 'react'
import NewsHeader from './news_header'
import NewsFooter from './news_footer'
import '../componentsCss/pc.css'

export default class App extends Component {
  render () {
    return (
      <div>
        <NewsHeader />
        {this.props.children}
        <NewsFooter />
      </div>
    )
  }
}