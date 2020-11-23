import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeCurrentPage, changePaginationLimits} from '../../Actions/paginationActions'
import { start } from 'turbolinks';

class PaginationController extends React.Component{

  handlePaginationClick = (e) => {
    //console.log(e.target);
    //this.setState({active: Number(e.target.id)});
    this.props.changeCurrentPage(Number(e.target.id))
  }

  handlePaginationArrowsClick = (e) => {
    let direction = e.target.innerHTML;
    if (direction === 'chevron_left' && this.props.active !== 0){
      /* this.setState(state => ({
        active: state.active - 1
      })); */
      this.props.changeCurrentPage(this.props.active - 1);
      if ((this.props.active) % 5 === 0){
        //this.setState(state => ({start: state.start - 5, end: state.end - 5}));
        this.props.changePaginationLimits(this.props.start - 5, this.props.end - 5);
      }
    }
    else if (direction === 'chevron_right' && this.props.active !== this.props.limit - 1){
      /* this.setState(state => ({
        active: state.active + 1
      })); */
      this.props.changeCurrentPage(this.props.active + 1);
      if ((this.props.active + 1) % 5 === 0){
        //this.setState(state => ({start: state.start + 5, end: state.end + 5}));
        this.props.changePaginationLimits(this.props.start + 5, this.props.end + 5);
      }
    }
  }

  render(){
    let {start, end, active} = this.props;
    let pageLink = []
    for (let i = start; i < end; i++){
      if (i >= this.props.limit){
        pageLink.push(<li className="disabled" key={i}><Link to="/" id={i}>{i + 1}</Link></li>)
      }else{
        let element = ( i === active)? <li className="active" key={i}><Link to="/" id={i}>{i + 1}</Link></li> : 
        <li className="waves-effect" key={i} onClick={this.handlePaginationClick}><Link to="/" id={i}>{i + 1}</Link></li>
        pageLink.push(element);
      }
    }
    return (
      <div className="container">
        <ul className="pagination">
          <li className={(active === 0)? "disabled":"waves-effect"}>
          <Link to="/"> 
              <i className="material-icons" onClick={this.handlePaginationArrowsClick}>
                chevron_left
              </i> 
            </Link>
          </li>
          {pageLink}
          <li className={(active === this.props.limit - 1)? "disabled":"waves-effect"}> 
          <Link to="/"> 
              <i className="material-icons" onClick={this.handlePaginationArrowsClick}>
                chevron_right
              </i> 
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  start: state.pagination.start,
  end: state.pagination.end,
  active: state.pagination.currentPage,
  limit: state.pagination.paginationLimit
});

const mapDispatchToProps = (dispatch) => ({
  changeCurrentPage: (page) => (dispatch(changeCurrentPage(page))),
  changePaginationLimits: (start, end) => (dispatch(changePaginationLimits(start, end))),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationController);