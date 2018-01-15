import React from 'react';

interface IProps {
  name: string;
  className?: string;
}

const Svg: React.StatelessComponent<IProps> = props =>
  <svg className={`${props.name}-svg ${props.className}`}>
    <use xlinkHref={`#${props.name}`} />
  </svg>;

Svg.defaultProps = {
  className: '',
};

export default Svg;
