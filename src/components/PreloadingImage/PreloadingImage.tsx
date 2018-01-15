import React from 'react';
import { Spin } from 'antd';
import cx from 'classnames';

interface IProps {
  src: string;
  imageAlt?: string;
  wrapperClass?: string;
  imageClass?: string;
  spinnerClass?: string;
  spinSize?: 'small' | 'default' | 'large';
}

interface IState {
  isLoading: boolean;
}

class PreloadingImage extends React.Component<IProps, IState> {
  image: HTMLImageElement;

  state: IState = {
    isLoading: false,
  };

  loadImage = () => {
    this.image = new Image();
    this.image.onload = () => {
      this.setState({
        isLoading: true,
      });
    };
    this.image.src = this.props.src;
  };

  componentDidMount() {
    this.loadImage();
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
    }
  }

  render() {
    return (
      <div
        className={cx('root', {
          [this.props.wrapperClass]: !!this.props.wrapperClass,
        })}
      >
        <style jsx>{`
          .root :global(.ant-spin-spinning) {
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
          .root :global(.ant-spin-nested-loading) {
            height: 100%;
          }
          .root :global(.ant-spin-blur),
          .root :global(.ant-spin-container) {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
          }
        `}</style>
        <Spin spinning={!this.state.isLoading} size={this.props.spinSize} className={this.props.spinnerClass}>
          <img src={this.props.src} alt={this.props.imageAlt} className={this.props.imageClass} />
        </Spin>
      </div>
    );
  }
}

export default PreloadingImage;
