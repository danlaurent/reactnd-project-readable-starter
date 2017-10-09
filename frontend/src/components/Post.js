import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import { convertTimestamp } from '../utils/Helpers'

const Post = ({post}) => (
  <div style={{ background: '#fff', padding: 24, minHeight: 80, marginTop: 24, display: 'flex' }}>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Icon type="up" style={{ fontSize: 24, color: '#bbb' }}/>
      <span>{post.voteScore}</span>
      <Icon type="down" style={{ fontSize: 24, color: '#bbb' }}/>
    </div>
    <div style={{display: 'flex', flexDirection: 'column', margin: '0 2em'}}>
      <Link style={{textAlign: 'left', fontSize: '1.5em'}} to={`/post/${post.id}`}>{post.title}</Link>
      <small style={{textAlign: 'left'}}>Submitted {convertTimestamp(post.timestamp)} by {post.author}</small>
    </div>
  </div>
)

export default Post