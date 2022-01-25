import React, { Component } from "react";
import { PageHeader, Select } from "antd";
import PropTypes from "prop-types";

export class FundSelect extends Component {
  onSearch = (fundCode) => {
    console.log(fundCode);
  };
  onChange = (fundCode) => {
    console.log(fundCode);
  };
  render() {
    const { Option } = Select;
    return (
      <PageHeader
        title="选择"
        extra={
          <>
            <Select
              key="fundSelect"
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.props.recordlist}
              onSearch={this.onSearch}
            >
              {this.props.funds.map((fund) => {
                return (
                  <Option key={fund.fundCode} value={fund.fundCodee}>
                    {fund.fundCode}/{fund.fundName}
                  </Option>
                );
              })}
            </Select>
          </>
        }
      />
    );
  }
}

FundSelect.propTypes = {
  funds: PropTypes.array,
  selectedfund: PropTypes.string,
  recordlist: PropTypes.func,
};

export default FundSelect;
