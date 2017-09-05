/**
 * 文本新闻列表组件
 */
import React, {Component, PropTypes} from 'react'
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'

export default class NewsBlock extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  }

  state = {
    newsArr: null
  }

  componentDidMount () {
    // 发送ajax请求, 得到新闻列表数据
    const {type, count} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        const newsArr = response.data.map(({uniquekey, title})=> ({uniquekey, title}))
        // 更新状态
        this.setState({newsArr})
      })
  }

  render () {
    const {newsArr} = this.state
    const {type} = this.props
    const contentUI = !newsArr
      ? <h2>没有任意新闻</h2>
      : (
          <ul>
            {
              newsArr.map((news, index) => (
                <li key={index}>
                  <Link to={`/news_detail/${news.uniquekey}/${type}`}>{news.title}</Link>
                </li>
              ))
            }
          </ul>
        )
    return (
      <Card className="topNewsList">
        {
          contentUI
        }
      </Card>
    )
  }
}