import React from 'react';

interface IProps {}

interface IState {}

class Sprite extends React.Component<IProps, IState> {
  render() {
    return (
      <div
        className="app-svg-sprite"
        dangerouslySetInnerHTML={{ __html: require('src/resources/svg/sprite.symbol.svg') }}
      />
    );
  }
}

export default Sprite;
