import React, { Component } from 'react';

class ResourceWidget extends Component {
  constructor() {
    this.state = {
      isLoading: true,
      item: null,
      error: null,
    };
  }

  componentDidMount() {
    this.props.fetchResource()
      .then(this.onFetchComplete)
      .catch(this.onFetchError);
  }

  onFetchComplete = (response) => {
    this.setState({
      isLoading: false,
      item: response.resource,
    });
  }

  onFetchError = (error) => {
    this.setState({
      isLoading: false,
      error,
    });
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingWidget />;
    }

    if (this.state.error) {
      return <ErrorWidget error={this.state.error} />;
    }

    if (this.state.item) {
      return this.props.render(this.state.item);
    }

    return /* Uh oh. */;
  }
}
