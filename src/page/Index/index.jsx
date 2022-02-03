import React, { Component } from "react";
import { Layout, Tabs, Row, Col } from "antd";
import Fund from "../Fund";
import Bankuai from "../Bankuai";
import Indices from "../Indices";
const { Header, Footer, Content } = Layout;
const { TabPane } = Tabs;

export class index extends Component {
  callback = (key) => {
    console.log(key);
  };
  render() {
    return (
      <Layout>
        <Header>Header</Header>
        <Content>
          <Row>
            <Col span={18} push={3} className="card-container">
              <Tabs defaultActiveKey="1" onChange={this.callback} type="card">
                <TabPane tab="指数" key="1">
                  <Indices />
                </TabPane>
                <TabPane tab="板块" key="2">
                  <Bankuai />
                </TabPane>
                <TabPane tab="基金" key="3">
                  <Fund />
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default index;
