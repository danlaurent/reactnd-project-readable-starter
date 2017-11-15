import React from 'react'
import { connect } from 'react-redux'
import Post from './Post'


const Category = ({posts, match}) => (
  <div style={{margin: '2em 0'}}>
    <small>category:</small>
    <h1 style={{textTransform: 'capitalize'}}>{match.params.category}</h1>
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

export default connect(mapStateToProps)(Category)