import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { fetchCategories, fetchPosts, fetchComments, arrangePostsByDate, arrangePostsByScore } from '../actions'
import { Link } from 'react-router-dom'
import { Tabs, Button } from 'antd'

class Home extends Component {

  componentDidMount() {
    this.props.loadCategories()
    this.props.loadPosts()
  }
  render() {
    const { forum, arrangeByDate, arrangeByScore } = this.props
    return (
      <div>
        <Button style={{margin: '1em 0'}} icon="plus-circle-o" type="primary">
          <Link to="/new_post"  style={{marginTop: '1.5em', textDecoration: 'none', color: '#fff'}}> New post</Link>
        </Button>
        <div>
          Arrange by:
          <Button style={{margin: '1em'}} icon="like-o" onClick={(posts) => arrangeByScore(posts)}>Score</Button>
          <Button style={{marginLeft: '0 0.5em'}} icon="calendar" onClick={(posts) => arrangeByDate(posts)}>Date</Button>
        </div>
        <Tabs type="line" tabBarStyle={{textTransform: 'capitalize'}}>
          <Tabs.TabPane tab="all" key="all">
            {forum.posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </Tabs.TabPane>
          {forum.categories.map(filter => (
            <Tabs.TabPane tab={filter.name} key={filter.name}>
              {forum.posts.filter(post => post.category === filter.name).map(post => (
                <Post key={post.id} post={post} />
              ))}
            </Tabs.TabPane>
          ))}
        </Tabs>
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
    loadComments: data => dispatch(fetchComments(data)),
    arrangeByDate: posts => dispatch(arrangePostsByDate(posts)),
    arrangeByScore: posts => dispatch(arrangePostsByScore(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)