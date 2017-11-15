import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import {
  fetchCategories,
  fetchPosts,
  fetchComments,
  arrangePostsByDate,
  arrangePostsByScore,
  formPostNormal
} from '../actions'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

class Home extends Component {

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadPosts()
  }
  render() {
    const { forum, arrangeByDate, arrangeByScore, formPost } = this.props
    return (
      <div>
        <Button style={{margin: '1em 0'}} icon="plus-circle-o" type="primary" onClick={() => formPost()}>
          <Link to="/new_post"  style={{marginTop: '1.5em', textDecoration: 'none', color: '#fff'}}> New post</Link>
        </Button>
        <div>
          Arrange by:
          <Button style={{margin: '1em'}} icon="like-o" onClick={(posts) => arrangeByScore(posts)}>Score</Button>
          <Button style={{marginLeft: '0 0.5em'}} icon="calendar" onClick={(posts) => arrangeByDate(posts)}>Date</Button>
        </div>
        {forum.posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    )
  }
}

function mapStateToProps({forum}) {
  return {
    forum
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: data => dispatch(fetchCategories(data)),
    loadPosts: data => dispatch(fetchPosts(data)),
    loadComments: data => dispatch(fetchComments(data)),
    arrangeByDate: posts => dispatch(arrangePostsByDate(posts)),
    arrangeByScore: posts => dispatch(arrangePostsByScore(posts)),
    formPost: () => dispatch(formPostNormal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)