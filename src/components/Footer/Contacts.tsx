import React from 'react';

interface IProps {
  ui: Alicanto.Models.UI;
}

interface IState {}

class Contacts extends React.Component<IProps, IState> {
  render() {
    const contactUI = this.props.ui.common.footerContacts.contacts;
    const zip = contactUI.zip.i18n.defaultText;
    const address = contactUI.address.i18n.defaultText;
    const city = contactUI.city.i18n.defaultText;
    const country = contactUI.country.i18n.defaultText;
    const phoneText = contactUI.phone.i18n.defaultText;
    const phoneLink = contactUI.phone.settings.link;
    return (
      <div className="root">
        <style jsx>{`
          a {
            color: inherit;
          }
          a:hover {
            text-decoration: none;
          }
        `}</style>
        {`${zip} ${address}, ${city}, ${country}, `}
        &nbsp;
        <a href={`tel:${phoneLink}`}>{phoneText}</a>
      </div>
    );
  }
}

export default Contacts;
