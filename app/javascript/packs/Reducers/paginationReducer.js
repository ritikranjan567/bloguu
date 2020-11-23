import {CHANGE_PAGINATION_LIMITS, CHANGE_CURRENT_PAGE, SET_PAGINATION_LIMIT} from '../Actions/actionTypes' 
const intiState = {
  start: 0,
  end: 5,
  currentPage: 0,
  paginationLimit: 5
}

export const paginationReducer = (state = intiState, action) => {
  switch (action.type){
    case CHANGE_CURRENT_PAGE:
      return {
        ...state, currentPage: action.page
      };
    case CHANGE_PAGINATION_LIMITS:
      return {
        ...state, start: action.start, end: action.end
      };
    
    case SET_PAGINATION_LIMIT:
      return {
        ...state, paginationLimit: action.limit
      }
    default:
      return state;
  }
}