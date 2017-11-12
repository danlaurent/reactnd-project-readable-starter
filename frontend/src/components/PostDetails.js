import React, { Component } from 'react'
import { Icon, Button } from 'antd'
import { connect } from 'react-redux'
import {
  fetchComments,
  fetchPost,
  newComment,
  updateComment,
  removeComment,
  postDelete,
  likePost,
  dislikePost,
  arrangeCommentsByDate,
  arrangeCommentsByScore
} from '../actions'
import * as ReadableAPI from '../utils/ReadableAPI'
import { convertTimestamp } from '../utils/Helpers'
import NewComment from './NewComment'
import Comment from './Comment'
import VoteControls from './VoteControls'
import { generateId } from '../utils/Helpers'
import { Link } from 'react-router-dom'

class PostDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      timestamp: new Date().getTime(),
      author: '',
      message: '',
      parent_id: '',
      updateMode: false
    }
  }

  componentDidMount() {
    this.props.loadComments(this.props.match.params.id)
    ReadableAPI.getPost(this.props.match.params.id).then(post => {
      this.setState({details: post})
    })
    this.setState({
      id: generateId(),
      timestamp: new Date().getTime(),
      parent_id: this.props.match.params.id
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, timestamp, message, author, parent_id } = this.state
    const { addComment } = this.props
    addComment(id, timestamp, message, author, parent_id)
    this.setState({
      id: '',
      timestamp: new Date().getTime(),
      author: '',
      message: '',
      parent_id: ''
    })
  }

  handleEdit = (e, commentId) => {
    e.preventDefault()
    ReadableAPI.getComment(commentId).then(comment => (
      this.setState({
        id: comment.id,
        message: comment.body,
        updateMode: true
      })
    ))
  }

  handleUpdate = (e) => {
    e.preventDefault()
    this.setState({
      timestamp: new Date().getTime(),
      updateMode: false
    })
    const { id, timestamp, message } = this.state
    const { editComment } = this.props
    editComment(id, timestamp, message)
    this.setState({
      message: ''
    })
  }

  handleDelete = (e, id) => {
    const { removeComment } = this.props
    e.preventDefault()
    removeComment(id)
  }

  handleDeletePost = (id) => {
    const { history, deletePost } = this.props
    deletePost(id)
    history.push('/')
  }

  handleChange = (e, dest, cont) => {
    this.setState({
      [dest]: cont
    })
  }

  render() {
    const { forum, match, like, dislike, arrangeByDate, arrangeByScore } = this.props
    const details = forum.posts.filter(_ => _.id === match.params.id)
    return (
      <div>
        <div>
          Arrange Comments by:
          <Button style={{margin: '1em'}} icon="like-o" onClick={(comments) => arrangeByScore(forum.comments)}>Score</Button>
          <Button style={{marginLeft: '0 0.5em'}} icon="calendar" onClick={(comments) => arrangeByDate(forum.comments)}>Date</Button>
        </div>
        {details.map(detail => (
          <div key={detail.id} style={{ background: '#fff', padding: 24, minHeight: 80, marginTop: 24, display: 'flex'}}>
            <VoteControls target={detail} like={like} dislike={dislike} />
            <div style={{display: 'flex', flexDirection: 'column', margin: '0 2em', textAlign: 'left', flex: 12}}>
              <h1>{detail.title}</h1>
              <small style={{textAlign: 'left'}}>Submitted {convertTimestamp(detail.timestamp)} by {detail.author}</small>
              <hr />
              <div style={{fontSize: '1.5em', padding: '0.5em 0'}}>{detail.body}</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1}}>
              <Link style={{margin: '0.5em 0'}} to={`/post/${detail.id}/edit_post`}>
                <Icon type="edit" style={{ fontSize: 24, color: '#bbb' }}/>
              </Link>
              <button style={{margin: '0.5em 0'}} onClick={() => this.handleDeletePost(detail.id)}>
                <Icon type="delete" style={{ fontSize: 24, color: '#bbb' }}/>
              </button>
            </div>
          </div>
        ))}
        <hr />
        {forum.comments.filter(_ => _.parentId === match.params.id).map(comment => (
          <Comment
            comment={comment}
            key={comment.id}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
          />
        ))}
        <NewComment
          match={match}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleUpdate={this.handleUpdate}
          authorName={this.state.author}
          bodyContent={this.state.message}
          updateMode={this.state.updateMode}
          />
      </div>
    )
  }
}

function mapStateToProps({forum}) {
  return {forum}
}

function mapDispatchToProps(dispatch) {
  return {
    loadComments: data => dispatch(fetchComments(data)),
    loadPost: data => dispatch(fetchPost(data)),
    addComment: (id, timestamp, message, author, parent_id) => dispatch(newComment(id, timestamp, message, author, parent_id)),
    editComment: (id, timestamp, message) => dispatch(updateComment(id, timestamp, message)),
    removeComment: (id) => dispatch(removeComment(id)),
    deletePost: (id) => dispatch(postDelete(id)),
    like: (postId) => dispatch(likePost(postId)),
    dislike: (postId) => dispatch(dislikePost(postId)),
    arrangeByDate: comments => dispatch(arrangeCommentsByDate(comments)),
    arrangeByScore: comments => dispatch(arrangeCommentsByScore(comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
