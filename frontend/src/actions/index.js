import * as ReadableAPI from '../utils/ReadableAPI'

export const GET_CATEGORIES = 'GET_CATEGORIES'
export const GET_POSTS = 'GET_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'

export const POSTS_BY_DATE = 'POSTS_BY_DATE'
export const POSTS_BY_SCORE = 'POSTS_BY_SCORE'
export const COMMENTS_BY_DATE = 'COMMENTS_BY_DATE'
export const COMMENTS_BY_SCORE = 'COMMENTS_BY_SCORE'

export const CREATE_POST = 'CREATE_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const FORM_POST_NORMAL = 'FORM_POST_NORMAL'
export const FORM_POST_EDIT = 'FORM_POST_EDIT'

export const FORM_COMMENT_NORMAL = 'FORM_COMMENT_NORMAL'
export const FORM_COMMENT_UPDATE = 'FORM_COMMENT_UPDATE'

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

export function postsByDate(posts) {
  return {
    type: POSTS_BY_DATE,
    posts: posts.sort((a, b) => a.timestamp < b.timestamp)
  }
}

export const arrangePostsByDate = (posts) => dispatch => (
  ReadableAPI.getPosts().then(posts => (
    dispatch(postsByDate(posts))
  ))
)

export function postsByScore(posts) {
  return {
    type: POSTS_BY_SCORE,
    posts: posts.sort((a, b) => a.voteScore < b.voteScore)
  }
}

export const arrangePostsByScore = (posts) => dispatch => (
  ReadableAPI.getPosts().then(posts => (
    dispatch(postsByScore(posts))
  ))
)

export function commentsByDate(comments) {
  return {
    type: COMMENTS_BY_DATE,
    comments: comments.sort((a, b) => a.timestamp < b.timestamp)
  }
}

export const arrangeCommentsByDate = (postId) => dispatch => (
  ReadableAPI.getPostComments(postId).then(comments => (
    dispatch(commentsByDate(comments))
  ))
)

export function commentsByScore(comments) {
  return {
    type: COMMENTS_BY_SCORE,
    comments: comments.sort((a, b) => a.voteScore < b.voteScore)
  }
}

export const arrangeCommentsByScore = (postId) => dispatch => (
  ReadableAPI.getPostComments(postId).then(comments => (
    dispatch(commentsByScore(comments))
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

export function editPost({post}) {
  return {
    type: EDIT_POST,
    post
  }
}

export const updatePost = (id, title, body) => dispatch => (
  ReadableAPI.editPost(id, title, body).then(post => (
    dispatch(editPost({post}))
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

export function voteComment({votedComment}) {
  return {
    type: VOTE_COMMENT,
    votedComment
  }
}

export const likeComment = (commentId) => dispatch => (
  ReadableAPI.likeComment(commentId).then(votedComment => (
    dispatch(voteComment({votedComment}))
  ))
)

export const dislikeComment = (commentId) => dispatch => (
  ReadableAPI.dislikeComment(commentId).then(votedComment => (
    dispatch(voteComment({votedComment}))
  ))
)

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

export function formCommentUpdate() {
  return {
    type: FORM_COMMENT_UPDATE,
    updateMode: true
  }
}

export function formPostEdit() {
  return {
    type: FORM_POST_EDIT,
    editMode: true
  }
}

export function formCommentNormal() {
  return {
    type: FORM_COMMENT_NORMAL,
    updateMode: false
  }
}

export function formPostNormal() {
  return {
    type: FORM_POST_NORMAL,
    editMode: false
  }
}