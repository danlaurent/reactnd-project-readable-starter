import React, { Component } from 'react'
import { Form, Input, Select, Button } from 'antd'
import { connect } from 'react-redux'
import { newPost } from '../actions'

class NewPost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      timestamp: new Date().getTime(),
      title: '',
      author: '',
      message: '',
      post_category: ''
    }
  }

  generateId = () => (
    Math.random().toString(36).substr(-8)
  )

  componentDidMount() {
    this.setState({
      id: this.generateId(),
      timestamp: new Date().getTime()
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, timestamp, title, message, author, post_category } = this.state
    const { addPost } = this.props
    addPost(id, timestamp, title, message, author, post_category)
  }

  handleChange = (e, dest, cont) => {
    this.setState({
      [dest]: cont
    })
  }

  render() {
    const {forum} = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <div style={{margin: '2em 0'}}>
        <Form>
          <Form.Item {...formItemLayout} label="Title">
            <Input onChange={(e, dest, cont) => this.handleChange(e, 'title', e.target.value)} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Author">
            <Input onChange={(e, dest, cont) => this.handleChange(e, 'author', e.target.value)} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Message">
            <Input type="textarea" onChange={(e, dest, cont) => this.handleChange(e, 'message', e.target.value)} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Post category">
            <Select placeholder="Please select a category" onChange={(e) => this.handleChange(e, 'post_category', e)}>
              {forum.categories.map(category => (
                <Select.Option key={category.name} value={category.name} style={{textTransform: 'capitalize'}}>{category.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Button type="primary" onClick={e => this.handleSubmit(e)}>Post</Button>
        </Form>
      </div>
    )
  }
}

function mapStateToProps({forum}) {
  return {forum}
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (id, timestamp, title, message, author, post_category) => dispatch(newPost(id, timestamp, title, message, author, post_category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)