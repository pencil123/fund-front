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
              value={this.props.selectedcat}
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={this.props.recordlist}
              onSearch={this.onSearch}
            >
              {this.props.cats.map((catObject) => {
                return (
                  <Option key={catObject.code} value={catObject.code}>
                    {catObject.code}/{catObject.name}
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
  cats: PropTypes.array,
  selectedcat: PropTypes.string,
  recordlist: PropTypes.func,
  dates: PropTypes.array,
  datePickerChange: PropTypes.func,
};

export default FundSelect;
