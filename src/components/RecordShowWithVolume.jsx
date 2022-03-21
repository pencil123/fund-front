import React, { Component } from "react";
import PropTypes from "prop-types";
import * as echarts from "echarts";
export class RecordShowWithVolume extends Component {
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
        data: ["净值", "week", "twoweek", "month", "degree", "volume"],
        bottom: 0,
        left: "center",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: [
        { type: "category", data: this.props.date },
        { type: "category", data: this.props.date, gridIndex: 1 },
        { type: "category", data: this.props.date, gridIndex: 2 },
      ],
      yAxis: [
        {
          type: "value",
          scale: "true",
        },
        {
          type: "value",
          scale: "true",
          gridIndex: 1,
        },
        {
          type: "value",
          scale: "true",
          gridIndex: 2,
        },
      ],
      grid: [
        {
          top: "10",
          bottom: "50%",
        },
        {
          top: "55%",
          bottom: "30%",
        },
        {
          top: "70%",
          bottom: "30",
        },
      ],
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
        {
          data: this.props.volume,
          type: "line",
          name: "volume",
          xAxisIndex: 1,
          yAxisIndex: 1,
        },
        {
          data: this.props.degree,
          type: "line",
          name: "degree",
          xAxisIndex: 2,
          yAxisIndex: 2,
        },
      ],
    });
  };
  render() {
    return (
      <div
        id={this.props.elementId}
        className="echart 画图"
        style={{ width: "100%", height: 700 }}
      ></div>
    );
  }
}

RecordShowWithVolume.propTypes = {
  week: PropTypes.array,
  month: PropTypes.array,
  twoweek: PropTypes.array,
  degree: PropTypes.array,
  date: PropTypes.array,
  price: PropTypes.array,
  volume: PropTypes.array,
  selectedcat: PropTypes.string,
  elementId: PropTypes.string,
};
export default RecordShowWithVolume;
