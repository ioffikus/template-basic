import React from 'react';
import { push } from 'connected-react-router';
import { Button } from 'antd';
import dispatch from 'src/store/dispatch';

interface IProps {}

interface IState {}

class GoToCart extends React.Component<IProps, IState> {
  handleGoToCart = () => {
    dispatch(push('/cart'));
  };

  render() {
    return (
      <Button className="button" type="primary" size="large" onClick={this.handleGoToCart}>
        {this.props.children}
      </Button>
    );
  }
}

export default GoToCart;
