// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from './Components/App'
import {Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './Utils/store'
import './css/app'
import 'materialize-css'
import {browseHistory} from './Utils/browseHistory'
import ErrorBoundary from './Utils/ErrorBoundary'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browseHistory}>
        <ErrorBoundary><App /></ErrorBoundary> 
      </Router>
    </Provider>,
    document.getElementById("root"),
  )
})
