/**
 * 用户中心路由组件
 */
import React, {Component} from 'react'
import {Row, Col, Tabs, Card, Upload, Icon, Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'

const TabPane = Tabs.TabPane


export default class MobileUserCenter extends Component{

  //初始化
  state ={
    userCollectionsList:[] ,//收藏列表
    userCommentsList:[], //评论列表
  }

  componentDidMount(){
     //获取用户id
    const userId =localStorage.getItem('userId')

    let url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + userId
    axios.get(url)
      .then(response=>{
         const userCollectionsList =response.data
         this.setState({userCollectionsList})
      })

    url = "http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + userId
    axios.get(url)
      .then(response=>{
        const userCommentsList =response.data
        this.setState({userCommentsList})
      })
    }

  render(){
    const {userCollections, userComments} = this.state

    const userCollectionsList =userCollections.length
    ?userCollections.map((uc,index)=>{
        <Card key={index} title={uc.uniqueKey}>
          extra={<Link to={`/news_detail/${uc.uniquekey}`}>查看</Link>}>
        </Card>

      })
      :'还没有收藏任何东西'

    const userCommentsList = userComments.length
      ? userComments.map((comment,index)=>(
        <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
              extra={<Link to={`/news_detail/${comment.uniquekey}`}>查看</Link>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      : '您还没有发表过任何评论。'

    return (
      <div>
        <Tabs>
          <TabPane tab='我的评论列表' key="1">
            {userCollectionsList}
          </TabPane>
          <TabPane tab="我的收藏列表"key="2">
            {userCommentsList}
          </TabPane>
          <TabPane tab="头像上传" key="3"></TabPane>

        </Tabs>
      </div>
    )
  }
}