import React, { Fragment } from 'react'
import { Redirect, Route, Switch} from 'react-router-dom'
import { Header, Alert, Footer, NotFound, ConfirmationModal } from './Layout/index'
import {ChangePassword, EditUser, Login, SignUp} from './User/index'
import {PostIndex, CreatePost, ShowPost, EditPost} from './Posts/index'
import { connect } from 'react-redux'

class App extends React.Component{

  render(){
    let {confirmModalData} = this.props;
    return (
      <Fragment>
        <Header />
        <div id="app-container">
          <Switch>
            <Route exact path="/" component={PostIndex} />
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route exact path="/posts/:id" component={ShowPost} />
            <PrivateRoute path="/create-post" component={CreatePost} />
            <PrivateRoute path="/edit-user" component={EditUser} />
            <PrivateRoute path="/change-password" component={ChangePassword} />
            <PrivateRoute path="/posts/:id/edit-post" component={EditPost} />
            <Route path="*" component={NotFound} />
          </Switch>
          <Alert />
          <ConfirmationModal message={confirmModalData.message}
           buttonAffermative={confirmModalData.buttonAffermative}
           buttonNegative={confirmModalData.buttonNegative} 
           onAgreement={confirmModalData.onAgreement} 
           onDisagreement={confirmModalData.onDisagreement} />
        </div>
        <Footer />
      </Fragment>
    );
  }
}

function PrivateRoute({component: Component, exact, strict, path, ...rest}){ 
  return (
    <Route exact={exact} 
      strict={strict}
      path={path}
      render={(props) =>
      localStorage.getItem('user') ? ( <Component {...props} {...rest} /> ) : (
        <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }} />
      )
    } />
  );
}

const mapStateToProps = (state) => ({
  confirmModalData: state.confirm
});

export default connect(mapStateToProps)(App);