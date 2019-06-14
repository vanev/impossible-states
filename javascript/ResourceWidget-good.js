import React, { Component } from 'react';

const State = {
  loading: () => ({ type: "LOADING" }),
  completed: (item) => ({ type: "COMPLETED", item }),
  failed: (error) => ({ type: "FAILED", error }),
};

class ResourceWidget extends Component {
  constructor() {
    this.state = State.loading();
  }

  componentDidMount() {
    this.props.fetchResource()
      .then(this.onFetchComplete)
      .catch(this.onFetchError);
  }

  onFetchComplete = (response) => {
    this.setState(State.completed(response.resource));
  }

  onFetchError = (error) => {
    this.setState(State.failed(error));
  }

  render() {
    switch (this.state.type) {
      case "LOADING":
        return <LoadingWidget />;

      case "COMPLETED":
        return this.props.render(this.state.item);

      case "FAILED":
        return <ErrorWidget error={this.state.error} />;

      default:
        throw new UnexpectedStateError(this.state);
    }
  }
}
