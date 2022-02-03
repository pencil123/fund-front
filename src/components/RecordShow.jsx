import React, { Component } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export class RecordShow extends Component {
  componentDidUpdate() {
    this.topoChart();
  }
  componentDidMount() {
    this.myChart = echarts.init(document.getElementById(this.props.elementId));
    this.topoChart();
  }
  topoChart = () => {
    this.myChart.setOption({
      color: ["#990033", "#990033", "#0000FF", "#000000"],
      title: { text: this.props.selectedcat },
      legend: {
        data: ["净值", "week", "twoweek", "month"],
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
          data: this.props.price,
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
          data: this.props.twoweek,
          type: "line",
          name: "twoweek",
        },
        {
          data: this.props.month,
          type: "line",
          name: "month",
        },
      ],
    });
  };
  render() {
    return (
      <div
        id={this.props.elementId}
        className="echart 画图"
        style={{ width: "100%", height: 550 }}
      ></div>
    );
  }
}

RecordShow.propTypes = {
  week: PropTypes.array,
  month: PropTypes.array,
  twoweek: PropTypes.array,
  date: PropTypes.array,
  price: PropTypes.array,
  selectedcat: PropTypes.string,
  elementId: PropTypes.string,
};
export default RecordShow;