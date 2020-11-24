import React, {Fragment} from 'react'
import StarRatingComponent from 'react-star-rating-component'
import {connect} from 'react-redux'
import { deletePost, getPost } from '../../Actions/postActions';
import { Link } from 'react-router-dom';

class ShowPost extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {userActions: null};
  }

  componentDidMount(){
    let postId = this.props.match.params.id;
    this.props.getPost(postId);
  }
  
  handleDeleteClick = () => {
    this.props.deletePost(this.props.post.id);
  }

  render(){
    const postData = this.props.post.attributes;
    const {user} = this.props;
    const userActions= (this.props.post.relationships && user && user.id === this.props.post.relationships.user.data.id)? 
      <div className="post-action">
        <Link to={"/posts/" + this.props.post.id + "/edit-post" } className="btn orange darken-1 waves-effect">
          <i className="material-icons">edit</i> Edit Post
        </Link>
        <button className="btn red darken-1 m-l-1rem" onClick={this.handleDeleteClick}>
          <i className="material-icons">delete</i> Delete Post</button>
      </div> : null; 

    return (postData)?
      <div className="container">
        <div className="post-container light-blue darken-3 white-text">
          <h4>{postData.title}</h4>
          <p className="right-align mid-size-text yellow-text darken-2">By- {postData.author_name}</p>
          <hr />
          <p className="align-justified flow-text">{postData.content}</p>
          <p className="show-date">{new Date(postData.created_at).toDateString()}</p>
          <div className="score-container">
            {(Number(postData.avg_score) === 0.0)? "No one has score and commented yet": 
            <Fragment>
              <StarRatingComponent name="show-rating" starCount={5} value={Number(postData.avg_score)} emptyStarColor="black" starColor="yellow"
              renderStarIcon={() => <i className="material-icons">star</i>} 
              renderStarIconHalf={() => <i className="material-icons yellow-text">star_half</i>} 
              editing={false} /><span className="white-text score-text">{postData.avg_score}</span>
            </Fragment>}
          </div>
          {userActions}
        </div>
      </div> : 
      <div className="progress container m-t-center">
        <div className="indeterminate"></div>
      </div>
      ; 
  }
}

const mapStateToProps = (state) => ({
  user: state.user.currentUser,
  post: state.postStore.post,
  comments: state.commentStore.comments
});

const mapDispatchToProps = (dispatch) => ({
  getPost: (postId) => (dispatch(getPost(postId))),
  deletePost: (postId) => (dispatch(deletePost(postId)))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);