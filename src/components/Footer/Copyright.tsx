import React from 'react';

interface IProps {
  ui: Alicanto.Models.UI;
}

interface IState {}

class Copyright extends React.Component<IProps, IState> {
  render() {
    const footerCopyrightUI = this.props.ui.common.footerCopyright.text.i18n.defaultText;
    return (
      <div className="root">
        {`© ${new Date().getFullYear()} `}
        {footerCopyrightUI}
      </div>
    );
  }
}

export default Copyright;
