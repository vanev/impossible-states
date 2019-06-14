import React, { Component } from 'react';
import Auth from './Auth';
import { UnexpectedStateError } from './Errors';

const State = {
  LOADING: "LOADING",
  AUTHENTICATED: "AUTHENTICATED",
  UNAUTHENTICATED: "UNAUTHENTICATED",
};

class Authenticated extends Component {
  constructor(props) {
    this.state = State.LOADING;
  }

  componentDidMount() {
    Auth.checkStatus()
      .then(this.onAuthCheckComplete)
      .catch(this.onAuthCheckFail);
  }

  onAuthCheckComplete = (status) => {
    this.setState(
      status
        ? State.AUTHENTICATED
        : State.UNAUTHENTICATED
    );
  }

  onAuthCheckFail = (error) => {
    this.setState(State.UNAUTHENTICATED);
  }

  render() {
    swtich (this.state) {
      case State.LOADING:
        return <LoadingScreen />;

      case State.AUTHENTICATED:
        return this.props.render();

      case State.UNAUTHENTICATED:
        return <NotAllowedScreen />;

      default:
        throw new UnexpectedStateError(this.state);
    }
  }
}
