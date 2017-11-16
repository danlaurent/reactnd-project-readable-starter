import React, { Component } from 'react'
import { Button, notification } from 'antd'
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
  arrangeCommentsByScore,
  formCommentNormal,
  formCommentUpdate
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
      parent_id: ''
    }
  }

  componentDidMount() {
    this.props.loadComments(this.props.match.params.post_id)

  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { message, author } = this.state
    const { addComment } = this.props
    const id = generateId()
    const timestamp = new Date().getTime()
    if (message !== '' && author !== '') {
      addComment(id, timestamp, message, author, this.props.match.params.post_id).then(() => (
        this.setState({
          id: '',
          timestamp: new Date().getTime(),
          author: '',
          message: '',
          parent_id: ''
        })
      ))
      notification['success']({
        message: 'Success!',
        description: 'Comment created!',
      });
    } else {
      notification['error']({
        message: 'Error!',
        description: 'You need to fill all the fields',
      });
    }
  }

  handleEdit = (e, commentId) => {
    const {formUpdate} = this.props
    e.preventDefault()
    formUpdate()
    ReadableAPI.getComment(commentId).then(comment => (
      this.setState({
        id: comment.id,
        message: comment.body
      })
    ))
  }

  handleUpdate = (e) => {
    e.preventDefault()
    const { id, timestamp, message } = this.state
    const { editComment, formNormal } = this.props
    if (message !== '') {
      formNormal()
      this.setState({
        timestamp: new Date().getTime(),
      })
      editComment(id, timestamp, message)
      this.setState({
        message: ''
      })
      notification['success']({
        message: 'Success!',
        description: "Comment updated",
      });
    } else {
      notification['error']({
        message: 'Error!',
        description: "Your comment can't be blank",
      });
    }

  }

  handleDelete = (e, id) => {
    const { removeComment } = this.props
    e.preventDefault()
    removeComment(id)
    notification['info']({
      message: 'Deleted!',
      description: 'Comment deleted!',
    });
  }

  handleDeletePost = (id) => {
    const { history, deletePost } = this.props
    deletePost(id)
    history.push('/')
    notification['info']({
      message: 'Deleted!',
      description: 'Post deleted!',
    });
  }

  handleChange = (e, dest, cont) => {
    this.setState({
      [dest]: cont
    })
  }

  render() {
    const { forum, comments, match, like, dislike, arrangeByDate, arrangeByScore } = this.props
    const details = forum.posts.filter(_ => _.id === match.params.post_id)
    const commentsNumber = forum.comments.length
    return (
      <div>
        <div style={{margin: '2em 0', display: 'flex', width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Link to={`/${match.params.category}`}>
            <Button type="primary" icon="left">To category</Button>
          </Link>
        </div>
        <div>
          Arrange Comments by:
          <Button style={{margin: '1em'}} icon="like-o" onClick={(postId) => arrangeByScore(match.params.post_id)}>Score</Button>
          <Button style={{marginLeft: '0 0.5em'}} icon="calendar" onClick={(postId) => arrangeByDate(match.params.post_id)}>Date</Button>
        </div>
        {details.map(detail => (
          <div key={detail.id} style={{ background: '#fff', padding: 24, minHeight: 80, marginTop: 24, display: 'flex'}}>
            <VoteControls target={detail} like={like} dislike={dislike} />
            <div style={{display: 'flex', flexDirection: 'column', margin: '0 2em', textAlign: 'left', flex: 12}}>
              <h1>{detail.title}</h1>
              <small style={{textAlign: 'left'}}>Submitted {convertTimestamp(detail.timestamp)} by {detail.author} - {commentsNumber} comments</small>
              <hr />
              <div style={{fontSize: '1.5em', padding: '0.5em 0'}}>{detail.body}</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', flex: 1}}>
              <Link style={{margin: '0.5em 0'}} to={`/${detail.category}/${detail.id}/edit_post`}>
                <Button style={{margin: '0.5em 0'}} shape="circle" icon="edit" type="primary" />
              </Link>
              <Button style={{margin: '0.5em 0'}} shape="circle" icon="delete" type="danger" onClick={() => this.handleDeletePost(detail.id)} />
            </div>
          </div>
        ))}
        <hr />
        {comments.map(comment => (
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
          />
      </div>
    )
  }
}

function mapStateToProps({forum}, ownProps) {
  const { match } = ownProps
  return {
    forum,
    comments: forum.comments.filter(_ => _.parentId === match.params.post_id)
  }
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
    arrangeByDate: postId => dispatch(arrangeCommentsByDate(postId)),
    arrangeByScore: postId => dispatch(arrangeCommentsByScore(postId)),
    formUpdate: () => dispatch(formCommentUpdate()),
    formNormal: () => dispatch(formCommentNormal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
