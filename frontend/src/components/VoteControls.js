import React from 'react'
import { Button } from 'antd'

const VoteControls = ({target, like, dislike}) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <Button shape="circle" icon="up" type="default" onClick={() => like(target.id)} />
    <span style={{textAlign: 'center'}}>{target.voteScore}</span>
    <Button shape="circle" icon="down" type="default" onClick={() => dislike(target.id)} />
  </div>
)

export default VoteControls