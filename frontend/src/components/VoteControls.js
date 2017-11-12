import React from 'react'
import { Icon } from 'antd'

const VoteControls = ({target, like, dislike}) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <button onClick={() => like(target.id)}>
      <Icon type="up" style={{ fontSize: 24, color: '#bbb' }}/>
    </button>
    <span>{target.voteScore}</span>
    <button onClick={() => dislike(target.id)}>
      <Icon type="down" style={{ fontSize: 24, color: '#bbb' }}/>
    </button>
  </div>
)

export default VoteControls