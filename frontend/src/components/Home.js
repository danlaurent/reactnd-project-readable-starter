import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, fetchComments } from '../actions'
import { Link } from 'react-router-dom'

class Home extends Component {

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadPosts()
  }
  render() {
    const { forum } = this.props
    return (
      <div>
        <Link to="/new_post"  style={{marginTop: '1.5em'}}>New post</Link>
        <div>
          Arrange by:
          <button>Date</button>
          <button>Score</button>
        </div>
        {forum.posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    )
  }
}

function mapStateToProps({forum}) {
  return {forum}
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: data => dispatch(fetchCategories(data)),
    loadPosts: data => dispatch(fetchPosts(data)),
    loadComments: data => dispatch(fetchComments(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)