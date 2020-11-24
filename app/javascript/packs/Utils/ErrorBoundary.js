import React, { Component } from 'react'
import { browseHistory } from './browseHistory';

class ErrorBoundary extends Component {
  constructor(props){
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo){
    console.log(error, errorInfo);
    browseHistory.push('/');
  }

  render() {
    return this.props.children
  }
}

export default ErrorBoundary;
