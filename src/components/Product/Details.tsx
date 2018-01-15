import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Table } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Price from 'src/components/Price';

interface IOwnProps {}

interface IConnectedState {
  ui: Alicanto.Models.UI;
  uid: string;
  schemaFields: Alicanto.Models.CatalogItemSchemaFields;
  categories: Alicanto.Models.Category[];
  modifications: Alicanto.Models.CatalogItem[];
  isBundle: boolean;
  bundleContent: Alicanto.Models.CatalogItem[];
}

type IProps = IOwnProps & IConnectedState;

interface IState {
  activeKey: string;
  specificationsData: { key: string; label: string; value: string }[];
}

const mapStateToProps = (state: Store.IState, ownProps: IOwnProps) => ({
  ui: state.ui,
  uid: state.product.uid,
  schemaFields: state.product.schema_fields,
  categories: state.product.categories, // TODO: design is not released yet
  modifications: state.product.modifications, // TODO: design is not released yet
  isBundle: state.product.is_bundle, // TODO: design is not released yet
  bundleContent: state.product.bundle_content, // TODO: design is not released yet
});

const WrappedDetails = connect<IConnectedState, undefined, IOwnProps>(mapStateToProps)(
  class Details extends React.Component<IProps, IState> {
    readonly defaultKey = 'specifications';

    readonly specificationsColumns = [{ dataIndex: 'label' }, { dataIndex: 'value' }];

    state: IState = {
      specificationsData: this.getSpecificationsData(this.props.schemaFields),
      activeKey: this.defaultKey,
    };

    componentWillReceiveProps(nextProps: IProps) {
      if (this.props.uid !== nextProps.uid) {
        const specificationsData = this.getSpecificationsData(nextProps.schemaFields);
        this.setState({ specificationsData, activeKey: this.defaultKey });
      }
    }

    handleChange = (activeKey: string) => {
      this.setState({ activeKey });
    };

    getSpecificationsData(schemaFields: Alicanto.Models.CatalogItemSchemaFields) {
      const result: { key: string; label: string; value: string }[] = [];
      Object.keys(schemaFields).forEach(key => {
        if (key === 'picture_url') {
          return;
        }
        const schemaField = _.get(schemaFields, key);
        const inList = _.get(schemaField, 'in_list', null);
        if (!_.isNull(inList)) {
          const label = _.get(schemaField, 'label', '');
          const value = _.get(schemaField, 'value', '');
          result.push({ key, label, value });
        }
      });
      return result;
    }

    render() {
      return (
        <div className="root">
          <style jsx>{`
            .root :global(.ant-tabs-bar) {
              text-transform: uppercase;
            }
            .root :global(.ant-tabs-tabpane) {
              padding-left: 26px;
              padding-right: 26px;
            }
            .root :global(.ant-table) {
              font-size: 14px;
            }
            .root :global(.ant-table-tbody > tr > td) {
              padding-top: 17px;
              padding-bottom: 17px;
            }
            .root :global(.ant-table td:first-of-type) {
              color: #b2bdcb;
            }
            .root :global(.ant-table tr:hover > td) {
              background: transparent;
            }
            li {
              padding-top: 17px;
              padding-bottom: 17px;
            }
            .root :global(.bundle),
            .root :global(.modification),
            .root :global(.category) {
              font-size: 14px;
            }
            .root :global(.modification .currency) {
              font-size: inherit;
              color: inherit;
            }
          `}</style>
          <Tabs activeKey={this.state.activeKey} onChange={this.handleChange}>
            <Tabs.TabPane tab="Specifications" key="specifications">
              <Table
                columns={this.specificationsColumns}
                dataSource={this.state.specificationsData}
                pagination={false}
                showHeader={false}
              />
            </Tabs.TabPane>
            {!_.isEmpty(this.props.bundleContent) && (
              <Tabs.TabPane tab="Bundle" key="bundle">
                <ul>
                  {this.props.bundleContent.map(bundle => {
                    const schemaFields = bundle.schema_fields;
                    const shortDescription = _.get(schemaFields, 'short_description.value', '');
                    const name = _.get(schemaFields, 'name.value', '');
                    return (
                      <li key={bundle.uid}>
                        <Link to={`/product/${bundle.uid}`} title={shortDescription} className="bundle">
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Tabs.TabPane>
            )}
            {!_.isEmpty(this.props.modifications) && (
              <Tabs.TabPane tab="Modifications" key="modifications">
                <ul>
                  {this.props.modifications.map(modification => {
                    const schemaFields = modification.schema_fields;
                    const shortDescription = _.get(schemaFields, 'short_description.value', '');
                    const name = _.get(schemaFields, 'name.value', '');
                    const currency: string = _.get(schemaFields, 'currency.value', '');
                    const price = _.get(schemaFields, 'price.value', 0);
                    return (
                      <li key={modification.uid}>
                        <Link to={`/product/${modification.uid}`} title={shortDescription} className="modification">
                          {name} -&nbsp;
                          <Price price={price} currency={currency} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Tabs.TabPane>
            )}
            {!_.isEmpty(this.props.categories) && (
              <Tabs.TabPane tab="Categories" key="categories">
                <ul>
                  {this.props.categories.map(category => {
                    return (
                      <li key={category.uid}>
                        <Link to={`/catalog/${category.uid}`} className="category">
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Tabs.TabPane>
            )}
          </Tabs>
        </div>
      );
    }
  },
);

export default WrappedDetails;
