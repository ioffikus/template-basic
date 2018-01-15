import { Dispatch, connect } from 'react-redux';

interface MapPropsParam<TProps> {
  (state: Store.IState, ownProps?: TProps): TProps;
}

interface MapDispatchParam<TProps, TDispatchProps> {
  (dispatch: Dispatch<Store.IState>, ownProps?: TProps): TDispatchProps;
}

export interface ConnectedComponent<TProps> {
  <TComponent extends React.ComponentType<TProps>>(component: TComponent): TComponent;
}

export default function<TProps, TDispatchProps = {}>(
  mapProps: MapPropsParam<TProps>,
  mapDispatch?: MapDispatchParam<TProps, TDispatchProps>,
): ConnectedComponent<TProps> {
  return connect<TProps, TDispatchProps, TProps>(mapProps, mapDispatch) as ConnectedComponent<TProps & TDispatchProps>;
}

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/9951#issuecomment-317226870
