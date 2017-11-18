import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_COMMENTS,
  GET_ALL_COMMENTS,
  CREATE_POST,
  EDIT_POST,
  VOTE_POST,
  DELETE_POST,
  CREATE_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT,
  POSTS_BY_SCORE,
  POSTS_BY_DATE,
  COMMENTS_BY_SCORE,
  COMMENTS_BY_DATE,
  FORM_POST_NORMAL,
  FORM_POST_EDIT,
  FORM_COMMENT_UPDATE,
  FORM_COMMENT_NORMAL
} from '../actions'
import { combineReducers } from 'redux'

const initialReadableState = {
  categories: [],
  posts: [],
  comments: [],
  allComments: {}
}


const forum = (state = initialReadableState, action) => {
  const {id, timestamp, title, body, author, category, posts, post, votedPost, votedComment, comments, postId, parentId, data} = action
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
    case GET_ALL_COMMENTS:
      return {
        ...state,
        allComments: {
          ...state.allComments,
          [postId]: comments
        }
      }
    case CREATE_COMMENT:
      return {
        ...state,
        comments: state.comments.concat({id, timestamp, body, author, voteScore: 1, parentId})
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
          if (p.id === post.id) {
            p = post
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
        }).sort((a, b) => a.voteScore < b.voteScore)
      }
    case VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          if (comment.id === votedComment.id) {
            comment = votedComment
          }
          return comment
        }).sort((a, b) => a.voteScore < b.voteScore)
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== id)
      }
    case POSTS_BY_SCORE:
      return {
        ...state,
        posts
      }
    case POSTS_BY_DATE:
      return {
        ...state,
        posts
      }
    case COMMENTS_BY_SCORE:
      return {
        ...state,
        comments
      }
    case COMMENTS_BY_DATE:
      return {
        ...state,
        comments
      }
    default:
      return state
  }
}


const initialFormMode = {
  postEditMode: false,
  commentEditMode: false
}

const formMode = (state = initialFormMode, action) => {
  const { editMode, updateMode } = action
  switch (action.type) {
    case FORM_POST_NORMAL:
      return {
        postEditMode: editMode
      }
    case FORM_POST_EDIT:
      return {
        postEditMode: editMode
      }
    case FORM_COMMENT_NORMAL:
      return {
        commentEditMode: updateMode
      }
    case FORM_COMMENT_UPDATE:
      return {
        commentEditMode: updateMode
      }
    default:
      return state
  }
}

export default combineReducers({
  forum,
  formMode
})

