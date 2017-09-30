export const CREATE_POST = 'CREATE_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function addPost({id, timestamp, title, body, author, category}) {
  return {
    type: CREATE_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category
  }
}

export function votePost({option}) {
  return {
    type: VOTE_POST,
    option
  }
}

export function editPost({title, body}) {
  return {
    type: EDIT_POST,
    title,
    body
  }
}

export function deletePost({id}) {
  return {
    type: DELETE_POST,
    id
  }
}

export function addComment({id, timestamp, body, author, parentId}) {
  return {
    type: CREATE_COMMENT,
    id,
    timestamp,
    body,
    author,
    parentId
  }
}

export function voteComment({option}) {
  return {
    type: VOTE_COMMENT,
    option
  }
}

export function editComment({timestamp, body}) {
  return {
    type: EDIT_COMMENT,
    timestamp,
    body
  }
}

export function deleteComment({id}) {
  return {
    type: DELETE_COMMENT,
    id
  }
}