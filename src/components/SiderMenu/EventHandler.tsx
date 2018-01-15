import React from 'react';

interface IProps {
  onCollapsed: (value: boolean) => void;
}

interface IState {}

class EventHandler extends React.Component<IProps, IState> {
  handleCollapsed = (value: boolean) => () => {
    this.props.onCollapsed(value);
  };

  render() {
    return (
      <div onMouseEnter={this.handleCollapsed(false)} onMouseLeave={this.handleCollapsed(true)}>
        {this.props.children}
      </div>
    );
  }
}

export default EventHandler;
