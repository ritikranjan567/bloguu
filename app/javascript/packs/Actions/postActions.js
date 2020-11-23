import {SET_POSTS, POSTS_LOADED, RESET_POSTS_LOADED, SET_POST, EDIT_POST, RESET_POST} from './actionTypes'
import {setPaginationLimit} from './paginationActions'
import {authHeader} from '../Utils/auth-header'
import { alertError, alertSuccess } from './alertActions';
import { browseHistory } from '../Utils/browseHistory';
import { setComments } from './commentActions';
const axios = require('axios');

export const setPosts = () => {
  return (dispatch, getState) => {
    dispatch(resetPostsLoaded());
    axios.get('/api/v1/posts', {params: {
      page: getState().pagination.currentPage
    }}).then(res => {
      //console.log(res.data);
      dispatch({type: SET_POSTS, posts: res.data.data});
      dispatch(setPaginationLimit(parseInt(res.data.meta.pagination_limit)));
      dispatch(postLoaded());      
    }).catch(error => {
      console.log(error);
    });
  }
}

export const getPost = (postId) => {
  return dispatch => {
    axios.get('/api/v1/posts/' + postId)
      .then(res => {
        //console.log(res);
        dispatch(setPost(res.data.data));
        dispatch(setComments(res.data.included));
      })
      .catch(error => {
        dispatch(alertError([error.response.data.error]));
        browseHistory.push("/")
      });
  }
}

export const createPost = (data) => {
  return dispatch => {
    axios.post('/api/v1/posts', {...data}, {headers: authHeader()})
      .then(res => {
        //console.log(res);
        dispatch(alertSuccess("Your post has been successfully created"));
        browseHistory.push('/posts/' + res.data.data.id);
      })
      .catch(error => {
        //console.log(error.response);
        dispatch(alertError(error.response.data.error));
      });
  }
}

export const setPost = (post) => {
  return dispatch => {
    dispatch({type: SET_POST, post});
  }
}

export const editPost = (attrId, attrVal) => {
  return dispatch => {
    dispatch({type: EDIT_POST, attrId, attrVal})
  }
}

export const updatePost = (postId, data) => {
  return (dispatch) => {
    axios({
      method: 'put',
      url: '/api/v1/posts/' + postId,
      headers: authHeader(),
      data: {...data},
    }).then(res => {
      dispatch(alertSuccess('The post has been updated successfully'));
      browseHistory.push('/posts/' + res.data.data.id);
    }, error => {
      dispatch(alertError(error.response.data.error));
    });
  }
}

export const postLoaded = () => {
  return (dispatch) => {
    dispatch({type: POSTS_LOADED});
  }
}

export const resetPost = () => {
  return (dispatch) => {
    dispatch({type: RESET_POST})
  }
}

export const resetPostsLoaded = () => {
  return (dispatch) => {
    dispatch({type: RESET_POSTS_LOADED});
  }
}

export const deletePost = (postId) => {
  return (dispatch) => {
    axios.delete('/api/v1/posts/' + postId, {headers: authHeader()})
      .then(res => {
        dispatch(setPosts());
        browseHistory.push("/");
      }).catch(error => (alertError([error.response.data.error])));
  }
}
