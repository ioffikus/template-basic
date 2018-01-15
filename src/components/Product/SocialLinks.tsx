import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import cx from 'classnames';
import Svg from 'src/components/Svg';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState, ownProps: IOwnProps) => ({
  ui: state.ui,
});

const WrappedSocial = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Social extends React.Component<IProps, IState> {
    render() {
      const itemsUI = this.props.ui.routes.productCard.socialLinks.items;
      const visibleItems = _.transform(
        itemsUI,
        (result, value, key) => {
          const isVisible = value.settings.isVisible;
          if (isVisible) {
            result.push({ ...value, name: key });
          }
        },
        [],
      );
      return (
        <div className="root">
          <style jsx>{`
            .list {
              display: flex;
              align-items: flex-end;
              justify-content: flex-end;
              margin: 0;
              padding: 0;
              list-style-type: none;
            }
            .root :global(.link) {
              font-size: 0;
            }
            .item {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 25px;
              height: 25px;
            }
            .root :global(.icon-facebook) {
              fill: #008fff;
              width: 12px;
              height: 17px;
            }
            .root :global(.icon-twitter) {
              fill: #009cff;
              width: 11px;
              height: 17px;
            }
            .root :global(.icon-vkontakte) {
              fill: #4c75a3;
              width: 15px;
              height: 12px;
            }
            .root :global(.icon-instagram) {
              fill: #ff0070;
              width: 14px;
              height: 14px;
            }
          `}</style>
          <ul className="list">
            {visibleItems.map(item => {
              const link = item.i18n.defaultText;
              const name = item.name;
              return (
                <li className="item" key={name}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="link">
                    <Svg
                      name={name}
                      className={cx('icon', {
                        [`icon-${name}`]: name,
                      })}
                    />
                    {name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  },
);

export default WrappedSocial;
