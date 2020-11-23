import {SET_POSTS, POSTS_LOADED, RESET_POSTS_LOADED, SET_POST, EDIT_POST, RESET_POST} from '../Actions/actionTypes'
const initState = {
  post: {
    attributes: {title: "", content: ""},
  },
  posts: [],
  postsLoaded: false,
}

export const postReducer = (state = initState, action) => {
  switch (action.type){
    case SET_POSTS:
      return {
        ...state, posts: action.posts
      }
    case POSTS_LOADED:
      return {
        ...state, postsLoaded: true
      }
    case RESET_POSTS_LOADED:
      return {
        ...state, postsLoaded: initState.postsLoaded
      }
    case SET_POST:
      return {
        ...state, post: action.post
      }
    case EDIT_POST:
      return {
        ...state, post: {...state.post, attributes: {...state.post.attributes, [action.attrId]: action.attrVal}}
      }
    case RESET_POST:
      return {
        ...state, post: initState.post
      }
    default:
      return state;
  }
}