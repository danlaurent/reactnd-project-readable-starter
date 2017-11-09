import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'


class NewComment extends Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const { handleChange, handleSubmit, handleUpdate, bodyContent, authorName, updateMode } = this.props
    return (
      <div style={{margin: '2em 0'}}>
        <Form>
          <Form.Item {...formItemLayout} label="Author">
            <Input onChange={(e, dest, cont) => handleChange(e, 'author', e.target.value)} value={authorName} />
          </Form.Item>
          <Form.Item {...formItemLayout} label="Message">
            <Input type="textarea" onChange={(e, dest, cont) => handleChange(e, 'message', e.target.value)} value={bodyContent} />
          </Form.Item>
          {updateMode
            ? (
                <Button type="primary" onClick={e => handleUpdate(e)}>Update Comment</Button>
              )
            : (
                <Button type="primary" onClick={e => handleSubmit(e)}>Comment</Button>
              )
          }
        </Form>
      </div>
    )
  }
}

export default NewComment