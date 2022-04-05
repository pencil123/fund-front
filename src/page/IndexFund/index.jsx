import React, { Component } from "react";
import requst from "../../util/request";
import FundSelect from "../../components/FundSelect";
import RecordShowWithVolume from "../../components/RecordShowWithVolume";
import { Table } from "antd";
import moment from "moment";
export class index extends Component {
  constructor(props) {
    super(props);
    const today = moment();
    const monthAgo = moment().subtract(30, "days");
    const endString = today.format("YYYY-MM-DD");
    const startString = monthAgo.format("YYYY-MM-DD");
    this.state = {
      cats: [],
      selectedcat: "",
      records: [],
      recordsWithRate: [],
      price: [],
      week: [],
      month: [],
      twoweek: [],
      degree: [],
      volume: [],
      date: [],
      dates: [today, monthAgo],
      dateStrings: [startString, endString],
    };
  }

  async bankuaiList() {
    let path = "indexFund/list";
    try {
      let res = await requst.get(path);
      if (res.length > 0)
        this.setState({ cats: res }, () => {
          this.recordlist(res[0].code);
        });
    } catch (err) {
      console.error(err);
    }
  }

  async indexRateList() {
    let path = "indexFund/listWithRate";
    try {
      let res = await requst.get(path);
      this.setState({ recordsWithRate: res });
    } catch (err) {
      console.error(err);
    }
  }

  datePickerChange = (dates, dateStrings) => {
    this.setState({ dates, dateStrings }, () => {
      this.recordlist(this.state.selectedcat);
    });
  };

  recordlist = async (code) => {
    let path = "index-fund-record/find/list";
    let params = {
      code: code,
      startDay: this.state.dateStrings[0],
      endDay: this.state.dateStrings[1],
    };
    let res = await requst.get(path, params);
    if (res.length > 0) {
      let price = [],
        week = [],
        month = [],
        twoweek = [],
        degree = [],
        volume = [],
        date = [];
      res.reverse().forEach(function (record, index) {
        price.push(record.price);
        week.push(record.avgWeek);
        month.push(record.avgMonth);
        twoweek.push(record.avgTwoWeek);
        degree.push(record.degree);
        volume.push(record.volume);
        date.push(record.opendate);
      });
      this.setState({
        price,
        week,
        month,
        twoweek,
        degree,
        volume,
        date,
        selectedcat: code,
      });
    }
  };

  render() {
    const columns = [
      {
        title: "周数据",
        children: [
          {
            title: "指标Code",
            dataIndex: "weekCode",
          },
          {
            title: "告警类型",
            dataIndex: "weekName",
          },
          {
            title: "增长率",
            dataIndex: "weekRate",
          },
        ],
      },
      {
        title: "两周数据",
        children: [
          {
            title: "指标Code",
            dataIndex: "twoWeekCode",
          },
          {
            title: "告警类型",
            dataIndex: "twoWeekName",
          },
          {
            title: "增长率",
            dataIndex: "twoWeekRate",
          },
        ],
      },
      {
        title: "月数据",
        children: [
          {
            title: "指标Code",
            dataIndex: "monthCode",
          },
          {
            title: "告警类型",
            dataIndex: "monthName",
          },
          {
            title: "增长率",
            dataIndex: "monthRate",
          },
        ],
      },
    ];
    return (
      <>
        <Table
          rowKey="weekCode"
          columns={columns}
          dataSource={this.state.recordsWithRate}
          scroll={{ y: 300 }}
          pagination={false}
        />
        <FundSelect
          cats={this.state.cats}
          selectedcat={this.state.selectedcat}
          recordlist={this.recordlist}
          dates={this.state.dates}
          datePickerChange={this.datePickerChange}
        />
        <RecordShowWithVolume
          price={this.state.price}
          week={this.state.week}
          month={this.state.month}
          twoweek={this.state.twoweek}
          degree={this.state.degree}
          date={this.state.date}
          volume={this.state.volume}
          selectedcat={this.state.selectedcat}
          elementId="indexFund"
        />
      </>
    );
  }
  componentDidMount() {
    this.bankuaiList();
    this.indexRateList();
  }
}

export default index;
