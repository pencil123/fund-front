import React, { Component } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export class RecordShow extends Component {
  componentDidUpdate() {
    this.topoChart();
  }
  componentDidMount() {
    this.myChart = echarts.init(document.getElementById("records"));
    this.topoChart();
  }
  topoChart = () => {
    this.myChart.setOption({
      title: { text: "fund 画图" },
      legend: {
        data: ["净值", "week", "month", "3month"],
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: this.props.date,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: this.props.dwjz,
          type: "line",
          name: "净值",
        },
        {
          data: this.props.week,
          type: "line",
          name: "week",
        },
        {
          data: this.props.month,
          type: "line",
          name: "month",
        },
        {
          data: this.props.month3,
          type: "line",
          name: "month3",
        },
      ],
    });
  };
  render() {
    return (
      <div
        id="records"
        className="echart 画图"
        style={{ width: "100%", height: 550 }}
      ></div>
    );
  }
}

RecordShow.propTypes = {
  week: PropTypes.array,
  month: PropTypes.array,
  month3: PropTypes.array,
  date: PropTypes.array,
  dwjz: PropTypes.array,
};
export default RecordShow;
