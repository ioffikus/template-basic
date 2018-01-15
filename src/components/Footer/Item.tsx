import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { IObject } from 'src/core/interfaces/IObject';

interface IProps {
  title: string;
  links: IObject<Alicanto.Models.Link>;
}

interface IState {}

class Item extends React.Component<IProps, IState> {
  render() {
    return (
      <div className="root">
        <style jsx>{`
          .root {
            padding: 0 25px;
          }
          .title {
            margin-bottom: 10px;
            color: #062f49;
            font-size: 24px;
            font-weigh: 400;
            line-height: 1.17;
          }
          .item {
            margin-bottom: 10px;
          }
          .root :global(.link) {
            color: inherit;
            line-height: 2;
          }
        `}</style>
        <h2 className="title">{this.props.title}</h2>
        <ul>
          {Object.keys(this.props.links).map(key => {
            const link = key;
            const item = this.props.links[key];
            const title = item.title.i18n.defaultText;
            const text = item.text.i18n.defaultText;
            return (
              <li className="item" key={key}>
                {_.startsWith(link, 'http') ? (
                  <a href={link} className="link" title={title}>
                    {text}
                  </a>
                ) : (
                  <Link to={link} className="link" title={title}>
                    {text}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Item;
