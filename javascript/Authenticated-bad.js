import React, { Component } from 'react';
import Auth from './Auth';

class Authenticated extends Component {
  constructor(props) {
    this.state = {
      isLoading: true,
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    Auth.checkStatus()
      .then(this.onAuthCheckComplete)
      .catch(this.onAuthCheckFail);
  }

  onAuthCheckComplete = (status) => {
    this.setState({
      isLoading: false,
      isAuthenticated: status,
    });
  }

  onAuthCheckFail = (error) => {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingScreen />;
    }

    if (this.state.isAuthenticated) {
      return this.props.render();
    }

    return <NotAllowedScreen />;
  }
}