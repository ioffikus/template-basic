import React from 'react';
import ReactCropper from 'react-cropper';
import cx from 'classnames';
import cropperjs from 'cropperjs';
import PreloadingImage from 'src/components/PreloadingImage';

interface IProps {
  uid: string;
  pictures: Alicanto.Models.Picture[];
}

interface IState {
  isImagePreviewShow: boolean;
  currentImageIndex: number;
}

class Cropper extends React.Component<IProps, IState> {
  cropperContainer: cropperjs;

  state: IState = {
    isImagePreviewShow: false,
    currentImageIndex: 0,
  };

  handleSwiperThumbMouseEnter = (currentImageIndex: number) => () => {
    this.setState({ currentImageIndex });
  };

  setCropperContainer = (cropper: any) => {
    this.cropperContainer = cropper;
  };

  handleCropperMouseEnter = () => {
    this.cropperContainer.crop();
    this.setState({
      isImagePreviewShow: true,
    });
  };

  handleCropperMouseLeave = () => {
    this.setState({
      isImagePreviewShow: false,
    });
    this.cropperContainer.clear();
  };

  getCropperImageSrc = () => {
    return this.props.pictures[this.state.currentImageIndex].url;
  };

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.uid !== nextProps.uid) {
      this.setState({ isImagePreviewShow: false, currentImageIndex: 0 });
    }
  }

  render() {
    const pictures = this.props.pictures;
    return (
      <div
        className={cx('root', {
          show: this.state.isImagePreviewShow,
        })}
      >
        <style jsx>{`
          .root :global(.cropper) {
            height: 295px;
          }
          .img-preview {
            opacity: 0;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: calc(100% + 16px);
            z-index: 2;
            pointer-events: none;
            min-width: 120%;
            padding-top: 100%;
            background-color: #fff;
            box-shadow: 0 2px 4px 0 rgba(36, 103, 164, 0.18);
          }
          .cropper-wrapper {
            width: 100%;
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
          }
          .root :global(.img-preview img) {
            position: absolute;
            top: 0;
            left: 0;
          }
          .root :global(.cropper-modal) {
            opacity: 1;
            background-color: rgba(255, 255, 255, 0.8);
          }
          .root :global(.cropper-view-box) {
            outline: 0;
            box-shadow: 0 2px 4px 0 rgba(36, 103, 164, 0.18);
            border: 1px solid #e5ecf4;
          }
          .show :global(.img-preview) {
            opacity: 1;
          }
          .thumbs {
            padding-top: 310px;
            display: flex;
            flex-wrap: wrap;
            margin: 0 -8px;
          }
          .thumb-item {
            cursor: pointer;
          }
          .root :global(.thumb-item:hover .ant-spin-container) {
            border-color: #ff0757;
          }
          .root :global(.thumbs .ant-spin-container) {
            height: 79px;
            min-width: 48px;
            max-width: 100%;
            width: auto;
            margin: 0 8px 15px;
            background: none;
            opacity: 1;
            border-radius: 0;
            border: 1px solid rgba(6, 47, 73, 0.1);
          }
        `}</style>
        <div>
          <div className="img-preview" />
          <div
            className="cropper-wrapper"
            onMouseEnter={this.handleCropperMouseEnter}
            onMouseLeave={this.handleCropperMouseLeave}
          >
            <ReactCropper
              ref={this.setCropperContainer}
              src={this.getCropperImageSrc()}
              preview=".img-preview"
              dragMode="none"
              autoCropArea={0.3}
              guides={false}
              cropBoxResizable={false}
              autoCrop={false}
              background={false}
              center={false}
              zoomOnWheel={false}
              className="cropper"
              checkCrossOrigin={false}
            />
          </div>
          <div className="thumbs">
            {pictures.map((picture, index) => (
              <div key={picture.id} onMouseEnter={this.handleSwiperThumbMouseEnter(index)} className="thumb-item">
                <PreloadingImage src={picture.url} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Cropper;
