import React from 'react'
import {PostForm} from './index'
class EditPost extends React.Component{
  render(){
    //console.log(this.props.match);
    return(
      <PostForm mode="edit" postId={this.props.match.params.id}/>
    )
  }
}

export default EditPost;