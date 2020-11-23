import React, { Fragment } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import {setPosts} from '../../Actions/postActions'
import {PaginationController} from './index'

class PostIndex extends React.Component{

  componentDidMount(){
    this.props.setPosts();
  }

  render(){
    if (this.props.posts.length === 0 && !this.props.postsLoaded){
      return (
        <div className="progress container m-t-center">
          <div className="indeterminate"></div>
        </div>
      );
    }
    else if (this.props.posts.length === 0 && this.props.postsLoaded){
      return (
        <Fragment>
          <h3>There is no post to show</h3>
        </Fragment>
      );
    }
    const postCards = this.props.posts.map(post => (
      <div className="col s12 m6 l6" key={post.id}>
        <div className="card light-blue darken-3">
          <div className="card-content white-text">
            <span className="card-title">{post.attributes.title}</span>
            <div className="content-div"><p>{post.attributes.content}</p></div>
            <p className="right">-{post.attributes.author_name}</p><br />
            <div className="score-container">
              {(Number(post.attributes.avg_score) === 0.0)? "No one has score and commented yet": <Fragment>
              <StarRatingComponent name="show-rating" starCount={5} value={Number(post.attributes.avg_score)} emptyStarColor="black" starColor="yellow"
                renderStarIcon={() => <i className="material-icons">star</i>} 
                renderStarIconHalf={() => <i className="material-icons yellow-text">star_half</i>} 
                editing={false} /><span className="white-text score-text">{post.attributes.avg_score}</span>
                </Fragment>}
            </div>
          </div>
          <div className="card-action">
            <Link to={"/posts/" + post.id}>SEE THE FULL ARTICLE</Link> 
          </div>
        </div>
      </div>
    ));
    return (
      <Fragment>
        <div className="center">
          <PaginationController />
        </div>
        <div className="container row">
          {postCards}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.postStore.posts,
  postsLoaded: state.postStore.postsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  setPosts: () => (dispatch(setPosts())),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostIndex);