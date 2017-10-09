import React, { Component } from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { fetchComments, fetchPost } from '../actions'
import * as ReadableAPI from '../utils/ReadableAPI'
import { convertTimestamp } from '../utils/Helpers'

class PostDetails extends Component {

  componentDidMount() {
    this.props.loadComments(this.props.match.params.id)
    ReadableAPI.getPost(this.props.match.params.id).then(post => {
      this.setState({details: post})
    })
  }
  render() {
    const { posts, match } = this.props
    const details = posts.posts.filter(_ => _.id === match.params.id)
    console.log(posts)
    return (
      <div>
        {details.map(detail => (
          <div key={detail.id} style={{ background: '#fff', padding: 24, minHeight: 80, marginTop: 24, display: 'flex'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <Icon type="up" style={{ fontSize: 24, color: '#bbb' }}/>
              <span>{detail.voteScore}</span>
              <Icon type="down" style={{ fontSize: 24, color: '#bbb' }}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', margin: '0 2em', textAlign: 'left'}}>
              <h1>{detail.title}</h1>
              <small style={{textAlign: 'left'}}>Submitted {convertTimestamp(detail.timestamp)} by {detail.author}</small>
              <hr />
              <div style={{fontSize: '1.5em', padding: '0.5em 0'}}>{detail.body}</div>
            </div>
          </div>
        ))}
        <hr />
        {posts.comments.map(comment => (
          <div style={{ background: '#fff', padding: 24, minHeight: 80, marginTop: 24, textAlign: 'left', marginLeft: 24, borderLeft: '1px solid gray'}}>
            <span>{comment.author}</span>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

function mapDispatchToProps(dispatch) {
  return {
    loadComments: data => dispatch(fetchComments(data)),
    loadPost: data => dispatch(fetchPost(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
