/**
 * 用户中心路由组件
 */
import React, {Component} from 'react'
import {Row, Col, Tabs, Card, Upload, Icon, Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'

const TabPane = Tabs.TabPane

export default class UserCenter extends Component {

  state = {
    collections: null,
    comments: null,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  }

  componentDidMount () {

    const userId = localStorage.getItem('userId')

    // ajax请求收藏列表数据
    let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
      .then(response => {
        const collections = response.data
        this.setState({collections})
      })
    // ajax请求评论列表数据
    url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
    axios.get(url)
      .then(response => {
        const comments = response.data
        this.setState({comments})
      })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  // 显示预览图片(显示 modal)
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  // 选择上传图片
  handleChange = ({ fileList }) => this.setState({ fileList })


  render () {
    const {collections, comments} = this.state

    const collectionList = !collections
      ? <h3>没有任何收藏, 立即去收藏文章</h3>
      : collections.map((collection, index) => (
          <Card key={index} title={collection.uniquekey}
                extra={<Link to={`/news_detail/${collection.uniquekey}/top`}>查看</Link>}>
            {collection.Title}
          </Card>
        ))

    const commentList = !comments
      ? <h3>没有任何评论</h3>
      : comments.map((comment, index) => (
      <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
            extra={<Link to={`/news_detail/${comment.uniquekey}/top`}>查看</Link>}>
        {comment.Comments}
      </Card>
    ))

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <Tabs>
            <TabPane key="1" tab="我的收藏列表">
              {collectionList}
            </TabPane>
            <TabPane key="2" tab="我的评论列表">
              {commentList}
            </TabPane>
            <TabPane key="3" tab="头像设置">
              <div className="clearfix">
                <Upload
                  action="http://jsonplaceholder.typicode.com/photos"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}>
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={1}></Col>
      </Row>
    )
  }
}