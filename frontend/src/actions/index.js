import * as ReadableAPI from '../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'

export const CREATE_POST = 'CREATE_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function receiveCategories(data) {
  return {
    type: GET_CATEGORIES,
    data
  }
}

export const fetchCategories = () => dispatch => (
  ReadableAPI.getCategories().then(categories => (
    dispatch(receiveCategories(categories))
  ))
)

export function receivePosts(posts) {
  return {
    type: GET_POSTS,
    posts
  }
}

export const fetchPosts = () => dispatch => (
  ReadableAPI.getPosts().then(posts => (
    dispatch(receivePosts(posts))
  ))
)

export const fetchPost = (postId) => dispatch => (
  ReadableAPI.getPost(postId).then(post => (
    dispatch(receivePosts(post))
  ))
)

export function receiveComments(comments) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export const fetchComments = (postId) => dispatch => (
  ReadableAPI.getPostComments(postId).then(comments => (
    dispatch(receiveComments(comments))
  ))
)

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

export const newPost = (id, timestamp, title, body, author, category) => dispatch => (
  ReadableAPI.createPost(id, timestamp, title, body, author, category).then(post => (
    dispatch(addPost({id, timestamp, title, body, author, category}))
  ))
)

export function votePost({votedPost}) {
  return {
    type: VOTE_POST,
    votedPost
  }
}

export const likePost = (postId) => dispatch => (
  ReadableAPI.likePost(postId).then(votedPost => (
    dispatch(votePost({votedPost}))
  ))
)

export const dislikePost = (postId) => dispatch => (
  ReadableAPI.dislikePost(postId).then(votedPost => (
    dispatch(votePost({votedPost}))
  ))
)

export function editPost({title, body}) {
  return {
    type: EDIT_POST,
    title,
    body
  }
}

export const updatePost = (id, title, body) => dispatch => (
  ReadableAPI.editPost(id, title, body).then(post => (
    dispatch(editPost({title, body}))
  ))
)

export function deletePost({id}) {
  return {
    type: DELETE_POST,
    id
  }
}

export const postDelete = (id) => dispatch => (
  ReadableAPI.deletePost(id).then(post => (
    dispatch(deletePost({id}))
  ))
)

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

export const newComment = (id, timestamp, body, author, parentId) => dispatch => (
  ReadableAPI.createComment(id, timestamp, body, author, parentId).then(comment => (
    dispatch(addComment({id, timestamp, body, author, parentId}))
  ))
)

export function voteComment({option}) {
  return {
    type: VOTE_COMMENT,
    option
  }
}

export function editComment({id, timestamp, body}) {
  return {
    type: EDIT_COMMENT,
    id,
    timestamp,
    body
  }
}

export const updateComment = (id, timestamp, body) => dispatch => (
  ReadableAPI.editComment(id, timestamp, body).then(comment => (
    dispatch(editComment({id, timestamp, body}))
  ))
)

export function deleteComment({id}) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

export const removeComment = (id) => dispatch => (
  ReadableAPI.deleteComment(id).then(comment => (
    dispatch(deleteComment({id}))
  ))
)