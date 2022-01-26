import React, { Component } from "react";
import { PageHeader, Select, DatePicker } from "antd";
import PropTypes from "prop-types";
const { RangePicker } = DatePicker;
export class FundSelect extends Component {
  onSearch = (fundCode) => {
    console.log(fundCode);
  };

  render() {
    const { Option } = Select;
    return (
      <PageHeader
        title="选择"
        className="fundSelect"
        extra={
          <>
            <Select
              key="fundSelect"
              style={{ width: 300 }}
              showSearch
              value={this.props.selectedfund}
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
            <RangePicker
              onChange={this.props.datePickerChange}
              defaultValue={this.props.dates}
            />
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
  dates: PropTypes.array,
  datePickerChange: PropTypes.func,
};

export default FundSelect;
