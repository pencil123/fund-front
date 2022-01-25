import React, { Component } from "react";
import api from "../../util/api";
import { Layout } from "antd";
import FundSelect from "./components/FundSelect";
import RecordShow from "./components/RecordShow";
const { Header, Footer, Content } = Layout;
export class index extends Component {
  state = {
    funds: [],
    selectedfund: "",
    records: [],
    dwjz: [],
    week: [],
    month: [],
    month3: [],
    date: [],
  };

  async fundlist() {
    let path = "/api/fund/list";
    let res = await api.get(path);
    if (res.data.length > 0)
      this.setState({ funds: res.data, selectedfund: res.data[0].fundCode });
  }

  recordlist = async (fundCode) => {
    let path = "/api/record/find/list";
    let params = {
      fundCode: fundCode,
      startDay: "2021-10-10",
      endDay: "2021-10-25",
    };
    let res = await api.get(path, params);
    if (res.data.length > 0) {
      let dwjz = [],
        week = [],
        month = [],
        month3 = [],
        date = [];
      res.data.forEach(function (record, index) {
        dwjz.push(record.dwjz);
        week.push(record.avgWeek);
        month.push(record.avgMonth);
        month3.push(record.avg3month);
        date.push(record.fsrq);
      });
      this.setState({ dwjz, week, month, month3, date });
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
          />
          <RecordShow
            dwjz={this.state.dwjz}
            week={this.state.week}
            month={this.state.month}
            month3={this.state.month3}
            date={this.state.date}
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
