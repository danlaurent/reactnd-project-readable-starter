import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd'
import { connect } from 'react-redux'

class NewPost extends Component {

  generateId = () => (
    Math.random().toString(36).substr(-8)
  )

  componentDidMount() {
    this.generateId()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  render() {
    console.log(this.props)
    const {posts} = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <div style={{margin: '2em 0'}}>
        <Form onSubmit={this.handleSubmit}>
          <Input value={this.generateId()} type="hidden" readOnly />
          <Input value={new Date().getTime()} type="hidden" readOnly />
          <Form.Item {...formItemLayout} label="Title">
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Author">
            <Input />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Message">
            <Input type="textarea"/>
          </Form.Item>
          <Form.Item {...formItemLayout} label="Post category">
            <Select placeholder="Please select a category">
              {posts.categories.map(category => (
                <Select.Option key={category.name} value={category.name} style={{textTransform: 'capitalize'}}>{category.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">Post</Button>
        </Form>
      </div>
    )
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

export default connect(mapStateToProps)(NewPost)