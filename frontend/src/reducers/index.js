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
  DELETE_COMMENT
} from '../actions'
import { combineReducers } from 'redux'

const initialReadableState = {
  categories: [],
  posts: [],
  comments: []
}

const posts = (state = initialReadableState, action) => {
  const {id, timestamp, title, body, author, category, option, posts, comments, data} = action
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: data
      }
    case GET_POSTS:
      return {
        ...state,
        posts
      }
    case GET_COMMENTS:
      return {
        ...state,
        comments
      }
    case CREATE_POST:
      return {id, timestamp, title, body, author, category}
    case EDIT_POST:
      return {
        ...state,
        body,
        author
      }
    case VOTE_POST:
      return {
        ...state,
        option
      }
    case DELETE_POST:
      return {
        id
      }
    default:
      return state
  }
}

const comments = (state = {}, action) => {
  const {id, timestamp, body, author, option, parentId} = action
  switch (action.type) {
    case CREATE_COMMENT:
      return {id, timestamp, body, author, parentId}
    case EDIT_COMMENT:
      return {
        ...state,
        body,
        timestamp
      }
    case VOTE_COMMENT:
      return {
        ...state,
        option
      }
    case DELETE_COMMENT:
      return {
        id
      }
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments
})