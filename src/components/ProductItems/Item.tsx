import React from 'react';
import { Card, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import _ from 'lodash';
import mq from 'src/client/mediaQueries.ts';
import Price from 'src/components/Price';
import PreloadingImage from 'src/components/PreloadingImage';
import Svg from 'src/components/Svg';

interface IProps {
  ui: Alicanto.Models.UI;
  item: Alicanto.Models.CatalogItem;
  handleAddToCart: () => void;
}

interface IState {}

class Item extends React.Component<IProps, IState> {
  render() {
    const commonUI = this.props.ui.common;
    const uid = this.props.item.uid;
    const schemaFields = this.props.item.schema_fields;
    const isNewItem = false; // TODO: API is not released yet [ch1801]
    const isSale = false; // TODO: API is not released yet [ch1801]
    const pictureUrl = _.get(schemaFields, 'picture_url.value', '');
    const name = _.get(schemaFields, 'name.value', '');
    const shortDescription = _.get(schemaFields, 'short_description.value', '');
    const currency: string = _.get(schemaFields, 'currency.value', '');
    const price = _.get(schemaFields, 'price.value', 0);
    const oldPrice = 0; // TODO: API is not released yet [ch1801]
    const isShowTags = isNewItem || isSale;
    // const isBundle = _.get(this.props.item, 'is_bundle', false); // TODO: design is not released yet [ch1803]
    return (
      <div
        className={cx('root', {
          sale: isSale,
        })}
      >
        <style jsx>{`
          .root {
            display: flex;
            height: 100%;
            padding-left: 8px;
            padding-right: 8px;
            padding-bottom: 16px;
          }
          .root :global(.ant-card-body) {
            padding: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          .root :global(.ant-card) {
            position: relative;
            width: 100%;
            overflow: hidden;
            font-size: 16px;
            backface-visibility: hidden;
            -webkit-mask-image: -webkit-radial-gradient(white, black);
          }
          .root :global(.ant-card:hover) {
            box-shadow: 0 2px 16px 0 rgba(36, 103, 164, 0.18);
            will-change: transform, opacity;
          }
          .root :global(.ant-card:hover .buttons) {
            transform: translateY(100%);
          }
          .root :global(.ant-card:hover .buttons-wrapper) {
            opacity: 1;
          }
          .sale :global(.price-wrapper) {
            color: #ff0757;
          }
          .root :global(.name) {
            color: inherit;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.375;
            flex: 1;
            margin-bottom: 10px;
            transition: 0.5s;
            backface-visibility: hidden;
            -webkit-font-smoothing: antialiased;
          }
          .root :global(.button) {
            height: 64px;
            width: 64px;
            box-shadow: 0 2px 16px 0 rgba(6, 47, 73, 0.5);
          }
          .root :global(a.button) {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            color: currentColor;
            border-radius: 50%;
            background-color: #fff;
          }
          .root :global(a.button:hover) {
            color: #ff0959;
          }
          .root :global(.button + .button) {
            margin-top: 16px;
          }
          .image-wrapper {
            margin-bottom: 8px;
            position: relative;
            overflow: hidden;
          }
          .root :global(.image-wrapper::before) {
            content: '';
            display: block;
            padding-top: 100%;
            height: 0;
          }
          .tag-wrapper {
            position: absolute;
            top: 6px;
            left: 8px;
            z-index: 2;
            -webkit-font-smoothing: antialiased;
          }
          .root :global(.image-spinner) {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 100%;
            max-height: 100%;
          }
          .root :global(.image-spinner) {
            z-index: 2;
            width: 100%;
            height: 100%;
          }
          .root :global(.image) {
            max-width: 100%;
            max-height: 100%;
            backface-visibility: hidden;
          }
          .content {
            padding: 0 16px 11px;
            flex: 1;
            display: flex;
            flex-direction: column;
            transition: opacity 0.25s, transform 0.15s;
          }
          .price-wrapper {
            margin-top: auto;
            font-size: 1.4em;
            line-height: 1;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            transition: transform 0.15s;
          }
          .price {
            position: relative;
            z-index: 3;
            white-space: nowrap;
          }
          .price-old {
            color: #b2bdca;
            font-weight: 500;
            text-align: right;
            font-size: 0.7em;
            text-decoration: line-through;
            position: relative;
            padding-left: 5px;
          }
          .no-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .buttons-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.5);
            transition: opacity 0.15s;
            opacity: 0;
          }
          .buttons {
            position: absolute;
            bottom: 100%;
            left: 0;
            z-index: 3;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
        `}</style>
        {/* Media queries - between 992px and 1600px */}
        <style jsx>{`
          @media (min-width: ${mq.screenMD}) and (max-width: ${mq.screenXL}) {
            .root :global(.ant-card) {
              font-size: calc(16 / 1440 * 100 * 1vw);
            }
          }
        `}</style>
        <Card bordered={false}>
          <div className="image-wrapper">
            {isShowTags && (
              <div className="tag-wrapper">
                {isSale && <Tag color="#ff0959">{commonUI.tagsProduct.sale.i18n.defaultText}</Tag>}
                {isNewItem && <Tag color="#ff0959">{commonUI.tagsProduct.new.i18n.defaultText}</Tag>}
              </div>
            )}
            <Link to={`/product/${uid}`}>
              {pictureUrl && (
                <PreloadingImage src={pictureUrl} imageClass="image" wrapperClass="image-spinner" imageAlt={name} />
              )}
              {pictureUrl && <img src={pictureUrl} className="app-image-blur" alt={name} />}
              {!pictureUrl && <div className="app-no-image no-image">{commonUI.noImage.title.i18n.defaultText}</div>}
            </Link>
            <div className="buttons-wrapper">
              <div className="buttons">
                <Button className="button" shape="circle" onClick={this.props.handleAddToCart}>
                  <Svg name="cart" className="app-icon-svg" />
                </Button>
                <Link className="button" to={`/product/${uid}`}>
                  <Svg name="visible" className="app-icon-svg" />
                </Link>
              </div>
            </div>
          </div>
          <div className="content">
            <Link to={`/product/${uid}`} className="name" title={shortDescription}>
              {name}
            </Link>
            <div className="price-wrapper">
              <div className="price">
                <Price price={price} currency={currency} />
              </div>
              {isSale && (
                <div className="price-old">
                  <Price price={oldPrice} currency={currency} />
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default Item;
