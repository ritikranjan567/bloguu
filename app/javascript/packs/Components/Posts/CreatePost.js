import React from 'react'
import {PostForm} from './index'

class CreatePost extends React.Component{
  render(){
    return (
      <PostForm mode="create" />
    );
  }
}

export default CreatePost;