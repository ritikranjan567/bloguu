import React from 'react'
import {connect} from 'react-redux'
import {createPost, editPost, getPost, resetPost, updatePost} from '../../Actions/postActions'
import {postValidations} from '../../Utils/postValidations'

class PostForm extends React.Component{
  
  constructor(props){
    super(props);
    (this.props.mode === 'edit')? (this.props.getPost(this.props.postId)):(this.props.resetPost());
    this.state = {
      errors: {
        title: "",
        content: ""
      }
    }
  }
  componentDidMount() {
    M.textareaAutoResize(document.getElementById('content'));
    M.CharacterCounter.init(document.querySelectorAll('#title, #content'));
    (this.props.mode === 'edit')? postValidations.setCheckListAllValid() : null;
  }

  componentDidUpdate(){
    M.textareaAutoResize(document.getElementById('content'));
  }

  handleChange = (e) => {
    let {id, value} = e.target;
    this.props.editPost(id, value);
    postValidations[id](e.target, this.handleErrorMsg);
    postValidations.isAllValid()?
    document.getElementById('submit-trigger').removeAttribute('disabled'):
    document.getElementById('submit-trigger').setAttribute('disabled', true) 
  }

  handleErrorMsg = (id, message) => {
    this.setState({...this.state, errors: {...this.state.errors, [id]: message}})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    (this.props.mode === 'create')?
      this.props.createPost(this.props.post) :
      this.props.updatePost(this.props.postId, this.props.post);
  }

  render(){
    const {post, mode} = this.props;
    //console.log(post);
    return (
      <div className="row container">
        <h3>{this.props.mode[0].toUpperCase() + this.props.mode.slice(1)} Post</h3><hr />
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input type="text" id="title" onChange={this.handleChange} required 
            value={post.title} data-length="50" />
            <label htmlFor="title" className={(mode === 'edit')? 'active':''}>Title</label>
            <span className="helper-text" data-error={this.state.errors.title}></span>
          </div>
          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}
             required value={post.content} data-length="1500" />
            <label htmlFor="content" className={(mode === 'edit')? 'active':''}>Content</label>
            <span className="helper-text" data-error={this.state.errors.content}></span>
          </div>

          <input type="submit" id="submit-trigger" className="btn light-blue lighten-1" value={mode[0].toUpperCase() + mode.slice(1) + " Post"} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.postStore.post.attributes,
  userId: state.user.id
});

const mapDispatchToProps = (dispatch) => ({
  createPost: (data) => (dispatch(createPost(data))),
  updatePost: (postId, data) => (dispatch(updatePost(postId, data))),
  getPost: (postId) => (dispatch(getPost(postId))),
  editPost: (attrId, attrVal) => (dispatch(editPost(attrId, attrVal))),
  resetPost: () => (dispatch(resetPost()))
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

