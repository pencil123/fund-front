import React, { Component } from "react";
import requst from "../../util/request";
import FundSelect from "../../components/FundSelect";
import RecordShow from "../../components/RecordShow";
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
      price: [],
      week: [],
      month: [],
      twoweek: [],
      date: [],
      dates: [today, monthAgo],
      dateStrings: [startString, endString],
    };
  }

  async bankuaiList() {
    let path = "indices/list";
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

  datePickerChange = (dates, dateStrings) => {
    this.setState({ dates, dateStrings }, () => {
      this.recordlist(this.state.selectedcat);
    });
  };

  recordlist = async (code) => {
    let path = "indexRecord/find/list";
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
        date = [];
      res.reverse().forEach(function (record, index) {
        price.push(record.price);
        week.push(record.avgWeek);
        month.push(record.avgMonth);
        twoweek.push(record.avgTwoWeek);
        date.push(record.opendate);
      });
      this.setState({
        price,
        week,
        month,
        twoweek,
        date,
        selectedcat: code,
      });
    }
  };

  render() {
    return (
      <>
        <FundSelect
          cats={this.state.cats}
          selectedcat={this.state.selectedcat}
          recordlist={this.recordlist}
          dates={this.state.dates}
          datePickerChange={this.datePickerChange}
        />
        <RecordShow
          price={this.state.price}
          week={this.state.week}
          month={this.state.month}
          twoweek={this.state.twoweek}
          date={this.state.date}
          selectedcat={this.state.selectedcat}
          elementId="indices"
        />
      </>
    );
  }
  componentDidMount() {
    this.bankuaiList();
  }
}

export default index;
