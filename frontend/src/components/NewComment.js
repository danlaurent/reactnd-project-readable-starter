import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { connect } from 'react-redux'


class NewComment extends Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const { handleChange, handleSubmit, handleUpdate, bodyContent, authorName, formMode } = this.props
    return (
      <div style={{margin: '2em 0'}}>
          {formMode
            ? (
                <Form>
                  <Form.Item {...formItemLayout} label="Message">
                    <Input type="textarea" onChange={(e, dest, cont) => handleChange(e, 'message', e.target.value)} value={bodyContent} />
                  </Form.Item>
                  <Button type="primary" onClick={e => handleUpdate(e)}>Update Comment</Button>
                </Form>
              )
            : (
                <Form>
                  <Form.Item {...formItemLayout} label="Author">
                    <Input onChange={(e, dest, cont) => handleChange(e, 'author', e.target.value)} value={authorName} />
                  </Form.Item>
                  <Form.Item {...formItemLayout} label="Message">
                    <Input type="textarea" onChange={(e, dest, cont) => handleChange(e, 'message', e.target.value)} value={bodyContent} />
                  </Form.Item>
                  <Button type="primary" onClick={e => handleSubmit(e)}>Comment</Button>
                </Form>
              )
          }
      </div>
    )
  }
}

function mapStateToProps({formMode}) {
  return {
    formMode: formMode.commentEditMode
  }
}

export default connect(mapStateToProps)(NewComment)