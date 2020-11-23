import React from 'react'
import {connect} from 'react-redux'

class Alert extends React.Component{

  /* componentDidMount(){
    let {messages, color} = this.props.alert;
    console.log(messages, color);
    let {element, cls} = (messages.length > 0)? {
      element: "<ul>" + getMsgElement(messages) + "</ul>", cls: color
    }:{element: "", cls: "hide"}
    M.toast({html: element, classes: cls})
  } */

  componentDidUpdate(){
    let {messages, color} = this.props.alert;
    //console.log(messages, color);
    let {element, cls} = (messages.length > 0)? {
      element: "<ul>" + getMsgElement(messages) + "</ul>", cls: color
    }:{element: "", cls: "hide"}
    M.toast({html: element, classes: cls})
  }
  
  render(){
    if (this.props.alert.messages.length === 0){
      return null;
    }
    return(
      <div>
      </div>
    );
  }
}

const getMsgElement = (messages) => {
  let res_element = []
  for (let i = 0; i < messages.length; i++){
    res_element.push("<li>" + messages[i] + "</li>")
  }
  return res_element.join(" ");
}

const mapStateToProps = (state, ownProps) => {
  return {
    alert: state.alert
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearAlert
});
export default connect(mapStateToProps)(Alert);