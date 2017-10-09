import React from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = ({posts}) => (
  <div>
    <Link to="/new_post"  style={{marginTop: '1.5em'}}>New post</Link>
    {posts.posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
)

function mapStateToProps({posts}) {
  return {posts}
}

export default connect(mapStateToProps)(Home)