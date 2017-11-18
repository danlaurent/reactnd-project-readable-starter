import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { convertTimestamp } from '../utils/Helpers'
import { likePost, dislikePost, fetchAllComments } from '../actions'
import { connect } from 'react-redux'
import VoteControls from './VoteControls'

class Post extends Component {
  componentDidMount() {
    const { loadComments, post } = this.props
    loadComments(post.id)
  }
  render() {
    const {post, like, dislike, comments} = this.props
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 80, marginTop: 24, display: 'flex' }}>
        <VoteControls target={post} like={like} dislike={dislike} />
        <div style={{display: 'flex', flexDirection: 'column', margin: '0 2em'}}>
          <Link style={{textAlign: 'left', fontSize: '1.5em'}} to={`/${post.category}/${post.id}`}>{post.title}</Link>
          <small style={{textAlign: 'left'}}>Submitted {convertTimestamp(post.timestamp)} by {post.author} - {comments && comments.length} comments</small>
        </div>
      </div>
    )
  }
}


function mapStateToProps({forum}, ownProps) {
  const { post } = ownProps
  return {
    forum,
    comments: forum.allComments[post.id]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    like: (postId) => dispatch(likePost(postId)),
    dislike: (postId) => dispatch(dislikePost(postId)),
    loadComments: (postId) => dispatch(fetchAllComments(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)