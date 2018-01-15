import React from 'react';
import PreloadingImage from 'src/components/PreloadingImage';

interface IProps {
  pictureUrl: string;
  imageAlt?: string;
}

interface IState {}

class CartProductImage extends React.Component<IProps, IState> {
  render() {
    return (
      <div className="root">
        <style jsx>{`
          .root {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            width: 50px;
            min-width: 50px;
            overflow: hidden;
            border: 1px solid rgba(6, 47, 73, 0.1);
            border-radius: 4px;
            background-color: #f5f8fb;
          }
          .root :global(.image-spinner) {
            width: 100%;
            height: 100%;
          }
          .root :global(.image) {
            position: relative;
            z-index: 2;
            max-height: 100%;
            max-width: 100%;
          }
        `}</style>
        {this.props.pictureUrl && (
          <PreloadingImage
            src={this.props.pictureUrl}
            imageClass="image"
            wrapperClass="image-spinner"
            spinSize="small"
            imageAlt={this.props.imageAlt}
          />
        )}
        {this.props.pictureUrl && <img className="app-image-blur" src={this.props.pictureUrl} />}
      </div>
    );
  }
}

export default CartProductImage;
