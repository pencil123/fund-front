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
      color: ["#990033", "#990033", "#0000FF", "#000000"],
      title: { text: this.props.selectedfund },
      legend: {
        data: ["净值", "week", "month", "month3"],
        bottom: 0,
        left: "center",
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
        scale: "true",
      },
      series: [
        {
          data: this.props.dwjz,
          type: "line",
          name: "净值",
          lineStyle: {
            type: "dashed",
          },
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
  selectedfund: PropTypes.string,
};
export default RecordShow;
