const api = "http://localhost:3001"

let token = localStorage.token
if (!token) {
  token = localStorage.token = Math.random().toString(36).substr(-8)
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
    .catch(err => console.log(err))

export const getCategoryPosts = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))

export const createPost = (id, timestamp, title, body, author, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, timestamp, title, body, author, category })
  }).then(res => res.json())
    .catch(err => (
      console.log(err)
    ))

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const likePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ option: "upVote" })
  }).then(res => res.json())
    .catch(err => console.log(err))

export const dislikePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ option: "downVote" })
  }).then(res => res.json())
    .catch(err => console.log(err))

export const editPost = (post, title, body) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, body })
  }).then(res => res.json())
    .catch(err => console.log(err))

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: { ...headers, 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .catch(err => console.log(err))

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))

export const createComment = (id, timestamp, body, author, parentId) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, timestamp, body, author, parentId })
  }).then(res => res.json())
    .catch(err => console.log(err))

export const getComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.log(err))

export const voteComment = (comment, vote) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ option: vote })
  }).then(res => res.json())
    .catch(err => console.log(err))

export const editComment = (commentId, timestamp, body) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({ timestamp, body })
  }).then(res => res.json())
    .catch(err => console.log(err))

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: { ...headers, 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .catch(err => console.log(err))