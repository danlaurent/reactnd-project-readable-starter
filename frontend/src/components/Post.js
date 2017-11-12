import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import { convertTimestamp } from '../utils/Helpers'
import { likePost, dislikePost } from '../actions'
import { connect } from 'react-redux'
import VoteControls from './VoteControls'

const Post = ({post, like, dislike}) => (
  <div style={{ background: '#fff', padding: 24, minHeight: 80, marginTop: 24, display: 'flex' }}>
    <VoteControls target={post} like={like} dislike={dislike} />
    <div style={{display: 'flex', flexDirection: 'column', margin: '0 2em'}}>
      <Link style={{textAlign: 'left', fontSize: '1.5em'}} to={`/post/${post.id}`}>{post.title}</Link>
      <small style={{textAlign: 'left'}}>Submitted {convertTimestamp(post.timestamp)} by {post.author}</small>
    </div>
  </div>
)

function mapStateToProps({posts}) {
  return {posts}
}

function mapDispatchToProps(dispatch) {
  return {
    like: (postId) => dispatch(likePost(postId)),
    dislike: (postId) => dispatch(dislikePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)