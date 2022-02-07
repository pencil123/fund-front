import React, { Component } from "react";
import { Layout, Tabs, Row, Col } from "antd";
import Fund from "../Fund";
import Bankuai from "../Bankuai";
import Indices from "../Indices";
import Gainian from "../Gainian";
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
            <Col
              xs={24}
              sm={{ span: 22, push: 1 }}
              md={{ span: 20, push: 2 }}
              lg={{ span: 18, push: 3 }}
              xl={{ span: 16, push: 4 }}
              className="card-container"
            >
              <Tabs defaultActiveKey="1" onChange={this.callback} type="card">
                <TabPane tab="指数" key="1">
                  <Indices />
                </TabPane>
                <TabPane tab="行业板块" key="2">
                  <Bankuai />
                </TabPane>
                <TabPane tab="概念板块" key="3">
                  <Gainian />
                </TabPane>
                <TabPane tab="关注基金" key="4">
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
