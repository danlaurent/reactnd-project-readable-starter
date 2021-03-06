import React from 'react'
import VoteControls from './VoteControls'
import { Button } from 'antd'
import { connect } from 'react-redux'
import { convertTimestamp } from '../utils/Helpers'
import { likeComment, dislikeComment } from '../actions'

const Comment = ({comment, forum, like, dislike, handleDelete, handleEdit}) => (
  <div key={comment.id}>
    {forum.comments.filter(c => c.id === comment.id).map(comment => (
      <div key={comment.id} style={{ background: '#fff', padding: 24, minHeight: 80, marginTop: 24, textAlign: 'left', marginLeft: 24, borderLeft: '1px solid gray', display: 'flex'}}>
        <VoteControls target={comment} like={like} dislike={dislike} />
        <div style={{flex: 12, margin: '0 2em'}}>
          <span>Submitted by {comment.author} - {convertTimestamp(comment.timestamp)}</span>
          <hr />
          <p style={{fontSize: '1.5em'}}>{comment.body}</p>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <Button style={{margin: '0.5em 0'}} shape="circle" icon="edit" type="primary" onClick={(e) => handleEdit(e, comment.id)} />
          <Button style={{margin: '0.5em 0'}} shape="circle" icon="delete" type="danger" onClick={(e) => handleDelete(e, comment.id)} />
        </div>
      </div>
    ))}
  </div>
)

function mapStateToProps({forum}) {
  return {forum}
}

function mapDispatchToProps(dispatch) {
  return {
    like: (commentId) => dispatch(likeComment(commentId)),
    dislike: (commentId) => dispatch(dislikeComment(commentId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)