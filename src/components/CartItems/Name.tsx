import React from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  uid: string;
  shortDescription: string;
  name: string;
}

interface IState {}

class Copyright extends React.Component<IProps, IState> {
  render() {
    const { uid, shortDescription, name } = this.props;
    return (
      <div className="root">
        <style jsx>{`
          .root {
            font-size: 16px;
            line-height: 1.3;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .root :global(.name) {
            color: inherit;
            white-space: nowrap;
          }
          .root :global(.code) {
            color: #b2bdcb;
            font-size: 12px;
          }
        `}</style>
        <Link to={`/product/${uid}`} className="name" title={shortDescription}>
          {name}
        </Link>
        <div className="code"># {uid}</div>
      </div>
    );
  }
}

export default Copyright;
