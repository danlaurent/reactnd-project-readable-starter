import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_COMMENTS,
  CREATE_POST,
  EDIT_POST,
  VOTE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT,
  POSTS_BY_SCORE,
  POSTS_BY_DATE
} from '../actions'
import { combineReducers } from 'redux'

const initialReadableState = {
  categories: [],
  posts: [],
  comments: []
}

const forum = (state = initialReadableState, action) => {
  const {id, timestamp, title, body, author, category, posts, votedPost, comments, parentId, data} = action
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: data
      }
    case GET_POSTS:
      return {
        ...state,
        posts: posts.sort((a, b) => a.voteScore < b.voteScore)
      }
    case GET_COMMENTS:
      return {
        ...state,
        comments
      }
    case CREATE_COMMENT:
      return {
        ...state,
        comments: state.comments.concat({id, timestamp, body, author, parentId})
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(c => {
          if (c.id === id) {
            c.timestamp = timestamp
            c.body = body
          }
          return c
        })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== id)
      }
    case CREATE_POST:
      return {
        ...state,
        posts: state.posts.concat({id, timestamp, title, body, author, category})
      }
    case EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(p => {
          if (p.id === id) {
            p.title = title
            p.body = body
          }
          return p
        })
      }
    case VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === votedPost.id) {
            post = votedPost
          }
          return post
        })
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== id)
      }
    case POSTS_BY_SCORE:
      return {
        ...state,
        posts: state.posts.sort((a, b) => a.voteScore < b.voteScore)
      }
    case POSTS_BY_DATE:
      return {
        ...state,
        posts: state.posts.sort((a, b) => a.timestamp < b.timestamp)
      }
    default:
      return state
  }
}

export default combineReducers({
  forum
})