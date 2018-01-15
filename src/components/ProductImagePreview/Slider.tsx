import React from 'react';
import { Modal } from 'antd';
import Swiper from 'react-id-swiper';
import PreloadingImage from 'src/components/PreloadingImage';

interface IProps {
  pictures: Alicanto.Models.Picture[];
}

interface IState {
  isVisibleModal: boolean;
}

class Slider extends React.Component<IProps, IState> {
  imagePreviewSwiperRef: Swiper;
  modalSwiperRef: Swiper;

  state: IState = {
    isVisibleModal: false,
  };

  imagePreviewSwiperSettings = {
    loop: true,
    autoHeight: true,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index: number, className: string) => {
        return `<span class="${className}"><img src=${this.props.pictures[index].url}/></span>`;
      },
    },
  };

  modalSwiperSettings = {
    loop: true,
    slidesPerView: 1,
    autoHeight: true,
  };

  handleShowModal = () => {
    this.setState({
      isVisibleModal: true,
    });
    setTimeout(() => this.modalSwiperRef.swiper.slideTo(this.imagePreviewSwiperRef.swiper.activeIndex));
  };

  handleHideModal = () => {
    this.setState({
      isVisibleModal: false,
    });
  };

  handleModalSwiperNext = () => {
    this.modalSwiperRef.swiper.slideNext();
    this.imagePreviewSwiperRef.swiper.slideNext();
  };

  handleModalSwiperPrev = () => {
    this.modalSwiperRef.swiper.slidePrev();
    this.imagePreviewSwiperRef.swiper.slidePrev();
  };

  getImagePreviewSwiperRef = (element: Swiper) => {
    this.imagePreviewSwiperRef = element;
  };

  getModalSwiperRef = (element: Swiper) => {
    this.modalSwiperRef = element;
  };

  render() {
    const pictures = this.props.pictures;
    return (
      <div className="root">
        <style jsx global>{`
          .image-preview-modal .ant-modal-body {
            padding: 48px 0 0;
          }
          .image-preview-modal .ant-modal-close {
            display: block;
          }
          .image-preview-modal .ant-modal-close-x {
            font-size: 18px;
          }
          .image-preview-modal .swiper-slide {
            border-radius: 0 0 8px 8px;
            overflow: hidden;
          }
          .image-preview-modal img {
            max-width: 100%;
            width: 100%;
          }
          .image-preview-modal .swiper-button-prev {
            left: -58px;
          }
          .image-preview-modal .swiper-button-next {
            right: -58px;
          }
          .image-preview-modal .swiper-button-next::after,
          .image-preview-modal .swiper-button-prev::after {
            box-shadow: 0px 7px 13px 0px rgba(1, 2, 20, 0.78);
          }
          .image-preview-modal .swiper-button-next::before,
          .image-preview-modal .swiper-button-prev::before {
            box-shadow: 0px 0px 10px 1px rgba(1, 2, 20, 0.78);
          }
        `}</style>
        <style jsx>{`
          .root :global(.item) {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .root :global(.item:hover) {
            cursor: zoom-in;
          }
          .root :global(.item-spinner) {
            max-height: 295px;
          }
          .root :global(.image) {
            width: 100%;
          }
        `}</style>
        <Swiper {...this.imagePreviewSwiperSettings} ref={this.getImagePreviewSwiperRef}>
          {pictures.map((picture, index) => (
            <div className="item" key={picture.id} onClick={this.handleShowModal}>
              <PreloadingImage src={picture.url} spinnerClass="item-spinner" imageClass="image" />
            </div>
          ))}
        </Swiper>
        <Modal
          visible={this.state.isVisibleModal}
          footer={null}
          wrapClassName="image-preview-modal"
          onCancel={this.handleHideModal}
        >
          <Swiper {...this.modalSwiperSettings} ref={this.getModalSwiperRef}>
            {pictures.map(picture => (
              <div key={picture.id}>
                <PreloadingImage src={picture.url} />
              </div>
            ))}
          </Swiper>
          <div className="swiper-button-next" onClick={this.handleModalSwiperNext} />
          <div className="swiper-button-prev" onClick={this.handleModalSwiperPrev} />
        </Modal>
      </div>
    );
  }
}

export default Slider;
