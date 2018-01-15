import React from 'react';
import DevTools from './DevTools';

interface IState {
  isMounted: boolean;
}

class Frame extends React.PureComponent<{}, IState> {
  state: IState = { isMounted: false };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  // need for render DevTools on client side
  render() {
    return this.state.isMounted && <DevTools />;
  }
}

export default Frame;
