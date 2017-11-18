import React from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { Button } from 'antd'
import { arrangePostsByDate, arrangePostsByScore } from '../actions'


const Category = ({posts, match, arrangeByDate, arrangeByScore}) => (
  <div style={{margin: '2em 0'}}>
    <small>category:</small>
    <h1 style={{textTransform: 'capitalize'}}>{match.params.category}</h1>
    <div>
      Arrange by:
      <Button style={{margin: '1em'}} icon="like-o" onClick={(posts) => arrangeByScore(posts)}>Score</Button>
      <Button style={{marginLeft: '0 0.5em'}} icon="calendar" onClick={(posts) => arrangeByDate(posts)}>Date</Button>
    </div>
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
)

function mapStateToProps({forum}, ownProps) {
  const { match } = ownProps
  return {
    posts: forum.posts.filter(post => post.category === match.params.category)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    arrangeByDate: posts => dispatch(arrangePostsByDate(posts)),
    arrangeByScore: posts => dispatch(arrangePostsByScore(posts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)