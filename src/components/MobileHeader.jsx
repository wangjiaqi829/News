import React,{Component} from 'react'

import {Icon, Button, Modal, Tabs, Form, Input, message} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'

import logo from '../images/logo.png'

const TabPane = Tabs.TabPane
const FormItem = Form.Item


 class MobileHeader extends Component{

  state={
    username:null,
    modalVisible:false
  }

 /*生命周期函数*/
   componentWillMount = () => {

   //读取保存的数据
   const username=localStorage.getItem('username')
   if (username){
     //更新状态
     this.setState({username})
   }
 }

//更新状态modalVisible
  setModalVisible = (modalVisible) => {
    this.setState({modalVisible})
  }
  //提交处理登录业务
  handleSubmit = (isRegist, event) => {
   //阻止表单默认行为
    event.preventDefault()

    //收集输入数据，准备url
    const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
    const action = isRegist ? 'register' : 'login'
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`

    axios.get(url)
      .then(response=>{
        const result=response.data
        if (isRegist){
          message.success('注册成功')
        }else{
          if(!result){//登录失败
            message.error('登录失败')
          }else{
            message.success('登录成功')
            const userId =result.UserId
            const username =result.NickUsername

            //更新状态
            this.setState({username})
            //保存到localStorage
            localStorage.setItem('userId',userId)
            localStorage.setItem('username',username)
          }
        }
      })
    //更新modalVisible
    this.setState({modalVisible:false})
  }

  render() {
    const {username, modalVisible} = this.state
    const {getFieldDecorator} = this.props.form

    const userItem = username
      ? <Link to='/user_center'>
        <Icon type="inbox"/>
      </Link>
      : <Icon type="setting" onClick={this.setModalVisible.bind(this, true)}/>

    return (
      <div id="mobileheader">
        <header>
          <div>
            <Link to='/'>
              <img src={logo} alt="logo"/>
              <span>ReactNews2</span>
            </Link>
            {userItem}
          </div>
        </header>
        <Modal title="用户中心"
               visible={modalVisible}
               onOk={this.setModalVisible.bind(this, false)}
               onCancel={this.setModalVisible.bind(this, false)}
               okText='关闭'>
          <Tabs type="card" onChange={() => this.props.form.resetFields()}>
            <TabPane tab="登陆" key="1">
              <Form onSubmit={this.handleSubmit.bind(this, false)}>
                <FormItem label='账户'>
                  {
                    getFieldDecorator('username')(
                      <Input placeholder="请输入账号"/>
                    )
                  }
                </FormItem>
                <FormItem label='密码'>
                  {
                    getFieldDecorator('password')(
                      <Input type='password' placeholder="请输入密码"/>
                    )
                  }
                </FormItem>
                <Button type='primary' htmlType="submit">登陆</Button>
              </Form>
            </TabPane>
            <TabPane tab="注册" key="2">
              <Form onSubmit={this.handleSubmit.bind(this, true)}>
                <FormItem label='账户'>
                  {
                    getFieldDecorator('r_userName')(
                      <Input placeholder="请输入账号"/>
                    )
                  }
                </FormItem>
                <FormItem label='密码'>
                  {
                    getFieldDecorator('r_password')(
                      <Input type='password' placeholder="请输入密码"/>
                    )
                  }
                </FormItem>
                <FormItem label='确认密码'>
                  {
                    getFieldDecorator('r_confirmPassword')(
                      <Input type='password' placeholder="请输入确认密码"/>
                    )
                  }
                </FormItem>
                <Button type='primary' htmlType="submit">注册</Button>
              </Form>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(MobileHeader)