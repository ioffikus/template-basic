import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import dispatch from 'src/store/dispatch';
import { fillProgress, hideProgress, showProgress } from 'src/ducks/progress';

interface IOwnProps {}

interface IConnectedState {
  isLoading?: boolean;
  fillLoad?: boolean;
  isRequesting?: boolean;
}

type IProps = IOwnProps & IConnectedState;

const checkIsRequesting = (state: Store.IState) => _.some(state, 'isRequesting');

const mapStateToProps = (state: Store.IState) => ({
  isLoading: state.progress.isLoading,
  fillLoad: state.progress.fillLoad,
  isRequesting: checkIsRequesting(state),
});

const Progress = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class _Progress extends React.Component<IProps, {}> {
    hidingTimer: number;

    componentWillReceiveProps(nextProps: IProps) {
      if (process.env.BROWSER) {
        if (this.props.isRequesting !== nextProps.isRequesting && nextProps.isRequesting === true) {
          dispatch(showProgress());
          return;
        }
        if (this.props.isRequesting !== nextProps.isRequesting && nextProps.isRequesting === false) {
          dispatch(fillProgress());
          this.hidingTimer = window.setTimeout(() => {
            dispatch(hideProgress());
          }, 700);
        }
      }
    }

    shouldComponentUpdate(nextProps: IProps) {
      if (
        this.props.isRequesting !== nextProps.isRequesting ||
        this.props.fillLoad !== nextProps.fillLoad ||
        this.props.isLoading !== nextProps.isLoading
      ) {
        return true;
      }
      return false;
    }

    componentWillUnmount() {
      if (process.env.BROWSER && this.hidingTimer) {
        window.clearTimeout(this.hidingTimer);
      }
    }

    render() {
      const fillLoad = () => {
        if (this.props.fillLoad) {
          return 'is-fulfilled';
        }
        if (this.props.isLoading) {
          return 'is-loading';
        }
        return '';
      };

      const barTransition = () => {
        if (this.props.fillLoad) {
          return {
            transitionDuration: '500ms',
          };
        }
        if (this.props.isLoading) {
          return {
            transitionDuration: `3000ms`,
          };
        }
        return {
          transitionDuration: '500ms',
        };
      };

      return (
        <div className={`progress-loader ${fillLoad()}`}>
          <div className="progress-loader__bar" style={barTransition()} />
        </div>
      );
    }
  },
);

export default Progress;
