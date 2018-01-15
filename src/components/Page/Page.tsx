import React from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

interface IOwnProps {}

interface IConnectedState {
  page: { content: string };
}

type IProps = IOwnProps & IConnectedState;

interface IState {}

const mapStateToProps = (state: Store.IState) => ({
  page: { content: 'dummy' },
});

const WrappedPage = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Page extends React.Component<IProps, IState> {
    static fetchData: Store.IFetchDataFn = abortToken => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
        // WIP fetch data from ducks/page [ch851]
      });
    };
    render() {
      const { page } = this.props;
      return <ReactMarkdown source={page.content} />;
    }
  },
);

export default WrappedPage;
