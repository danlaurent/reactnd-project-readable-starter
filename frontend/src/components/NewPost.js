import React, { Component } from 'react'
import { Form, Input, Select, Button, notification } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { newPost, updatePost, formPostNormal, formPostEdit } from '../actions'
import { generateId } from '../utils/Helpers'

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

  componentDidMount() {
    const { match, formUpdate, forum } = this.props
    if (match) {
      formUpdate()
      forum.posts.filter(p => p.id === match.params.id).map(post => (
        this.setState({
          id: post.id,
          title: post.title,
          message: post.body
        })
      ))
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { title, message, author, post_category } = this.state
    const { addPost, history } = this.props
    const id = generateId()
    const timestamp = new Date().getTime()
    if (title !== '' && message !== '' && author !== '' && post_category !== '') {
      addPost(id, timestamp, title, message, author, post_category)
      history.push('/')
      notification['success']({
        message: 'Post created!',
        description: `Post "${title}" succesfully created!`,
      });
    } else {
      notification['error']({
        message: 'Error!',
        description: 'You need to fill all the fields',
      });
    }
  }

  handleUpdate = (e) => {
    e.preventDefault()
    const { id, title, message } = this.state
    const { updatePost, history, formNormal, match } = this.props
    if (title !== '' && message !== '') {
      updatePost(id, title, message)
      formNormal()
      this.setState({
        id: '',
        title: '',
        message: ''
      })
      history.push(`/${match.params.category}/${match.params.id}`)
      notification['success']({
        message: 'Success!',
        description: `Post updated!`,
      });
    } else {
      notification['error']({
        message: 'Error!',
        description: 'You need to fill all the fields',
      });
    }
  }

  handleChange = (e, dest, cont) => {
    this.setState({
      [dest]: cont
    })
  }

  render() {
    const { title, message } = this.state
    const { editMode } = this.props
    const {forum} = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <div style={{margin: '2em 0'}}>
        <div style={{margin: '2em 0', display: 'flex', width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Link to="/">
            <Button type="primary" icon="left">To Home</Button>
          </Link>
        </div>
        {editMode
          ? (
            <Form>
              <Form.Item {...formItemLayout} label="Title">
                <Input onChange={(e, dest, cont) => this.handleChange(e, 'title', e.target.value)} value={title} />
              </Form.Item>
              <Form.Item {...formItemLayout} label="Message">
                <Input type="textarea" onChange={(e, dest, cont) => this.handleChange(e, 'message', e.target.value)} value={message} />
              </Form.Item>
              <Button type="primary" onClick={e => this.handleUpdate(e)}>Edit Post</Button>
            </Form>
            )
          :
            (
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
            )
        }
      </div>
    )
  }
}

function mapStateToProps({forum, formMode}) {
  return {
    forum,
    editMode: formMode.postEditMode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (id, timestamp, title, message, author, post_category) => dispatch(newPost(id, timestamp, title, message, author, post_category)),
    updatePost: (id, title, message) => dispatch(updatePost(id, title, message)),
    formUpdate: () => dispatch(formPostEdit()),
    formNormal: () => dispatch(formPostNormal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)