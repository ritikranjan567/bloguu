import {combineReducers} from "redux"
import alertReducer from './alertReducer'
import {userReducer} from './userReducer'
import {postReducer} from './postReducer'
import {paginationReducer} from './paginationReducer'
import {commentReducer} from './commentReducer'
import {confirmReducer} from './confirmReducer'

export const rootReducer = combineReducers({
  alert: alertReducer,
  user: userReducer,
  postStore: postReducer,
  pagination: paginationReducer,
  commentStore: commentReducer,
  confirm: confirmReducer
});