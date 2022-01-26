import React, { Component } from "react";
import api from "../../util/api";
import { Layout } from "antd";
import FundSelect from "./components/FundSelect";
import RecordShow from "./components/RecordShow";
import moment from "moment";
import "./home.css";
const { Header, Footer, Content } = Layout;
export class index extends Component {
  constructor(props) {
    super(props);
    const today = moment();
    const monthAgo = moment().subtract(30, "days");
    const endString = today.format("YYYY-MM-DD");
    const startString = monthAgo.format("YYYY-MM-DD");
    this.state = {
      funds: [],
      selectedfund: "",
      records: [],
      dwjz: [],
      week: [],
      month: [],
      month3: [],
      date: [],
      dates: [today, monthAgo],
      dateStrings: [startString, endString],
    };
  }

  async fundlist() {
    let path = "/api/fund/list";
    let res = await api.get(path);
    if (res.data.length > 0)
      this.setState({ funds: res.data }, () => {
        this.recordlist(res.data[0].fundCode);
      });
  }

  datePickerChange = (dates, dateStrings) => {
    this.setState({ dates, dateStrings }, () => {
      this.recordlist(this.state.selectedfund);
    });
  };

  recordlist = async (fundCode) => {
    let path = "/api/record/find/list";
    let params = {
      fundCode: fundCode,
      startDay: this.state.dateStrings[0],
      endDay: this.state.dateStrings[1],
    };
    let res = await api.get(path, params);
    if (res.data.length > 0) {
      let dwjz = [],
        week = [],
        month = [],
        month3 = [],
        date = [];
      res.data.reverse().forEach(function (record, index) {
        dwjz.push(record.dwjz);
        week.push(record.avgWeek);
        month.push(record.avgMonth);
        month3.push(record.avg3month);
        date.push(record.fsrq);
      });
      this.setState({
        dwjz,
        week,
        month,
        month3,
        date,
        selectedfund: fundCode,
      });
    }
  };

  render() {
    return (
      <Layout>
        <Header>Header</Header>
        <Content>
          <FundSelect
            funds={this.state.funds}
            selectedfund={this.state.selectedfund}
            recordlist={this.recordlist}
            dates={this.state.dates}
            datePickerChange={this.datePickerChange}
          />
          <RecordShow
            dwjz={this.state.dwjz}
            week={this.state.week}
            month={this.state.month}
            month3={this.state.month3}
            date={this.state.date}
            selectedfund={this.state.selectedfund}
          />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
  componentDidMount() {
    this.fundlist();
  }
}

export default index;
