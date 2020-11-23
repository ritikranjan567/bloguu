import {CHANGE_CURRENT_PAGE, CHANGE_PAGINATION_LIMITS, SET_PAGINATION_LIMIT} from './actionTypes'
import {setPosts} from './postActions'

export const changeCurrentPage = (page) => {
  return (dispatch) => {
    dispatch({type: CHANGE_CURRENT_PAGE, page});
    dispatch(setPosts());
  }
}

export const changePaginationLimits = (start, end) => {
  return (dispatch) => {
    dispatch({type: CHANGE_PAGINATION_LIMITS, start, end})
  }
}

export const setPaginationLimit = (limit) => {
  return (dispatch) => {
    dispatch({type: SET_PAGINATION_LIMIT, limit})
  }
}