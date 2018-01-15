import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from 'antd';
import EventHandler from '../EventHandler';
import SiderMenu from '../SiderMenu';
import { IObject } from 'src/core/interfaces/IObject';

describe(null, () => {
  it('render() correct with type as "categories"', () => {
    const wrapper = shallow(<SiderMenu type="categories" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render() correct with type as "filters"', () => {
    const wrapper = shallow(<SiderMenu type="filters" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('EventHandler.onCollapsed() with toogle via false and true for root.className', () => {
    const wrapper = shallow(<SiderMenu type="filters" />);
    const eventHandlersInstance = wrapper
      .find(EventHandler)
      .dive()
      .instance() as EventHandler;
    eventHandlersInstance.props.onCollapsed(false);
    wrapper.update();
    expect(wrapper.hasClass('collapsed')).toBeFalsy();
    eventHandlersInstance.props.onCollapsed(true);
    wrapper.update();
    expect(wrapper.hasClass('collapsed')).toBeTruthy();
  });
  it('EventHandler.onCollapsed() with toogle via false and true for Sider.collapsed', () => {
    const wrapper = shallow(<SiderMenu type="filters" />);
    const eventHandlersInstance = wrapper
      .find(EventHandler)
      .dive()
      .instance() as EventHandler;
    eventHandlersInstance.props.onCollapsed(false);
    wrapper.update();
    const siderInstanceBefore = wrapper
      .find(Layout.Sider)
      .dive()
      .instance() as any;
    expect(siderInstanceBefore.props.collapsed).toBeFalsy();
    eventHandlersInstance.props.onCollapsed(true);
    wrapper.update();
    const siderInstanceAfter = wrapper
      .find(Layout.Sider)
      .dive()
      .instance() as any;
    expect(siderInstanceAfter.props.collapsed).toBeTruthy();
  });
  it('componentDidMount() - add event handler to "scroll" via document.addEventListener ', () => {
    const map: IObject<() => void> = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    shallow(<SiderMenu type="categories" />);
    expect(map['scroll']).toBeDefined();
  });
  it('componentWillUnmount() - remove event handler from "scroll" via document.removeEventListener', () => {
    const map: IObject<() => void> = { scroll: () => {} };
    window.removeEventListener = jest.fn((event, cb) => {
      delete map[event];
    });
    const wrapper = shallow(<SiderMenu type="categories" />);
    wrapper.unmount();
    expect(map['scroll']).toBeUndefined();
  });
});
