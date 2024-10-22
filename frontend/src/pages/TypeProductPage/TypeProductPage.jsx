import React, { Fragment } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Row } from "antd";
import { WrapperProduct, WrapperNavbar } from "./style";
import { Pagination } from "antd";

const TypeProductPage = () => {
  const onChange = () => {};
  return (
    <div style={{width: '100%', background:'#efefef'}}>
      <div style={{ margin: "0 auto", width: "1270px" }}>
      <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
        <WrapperNavbar span={4}>
          <NavbarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProduct>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProduct>
          <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{textAlign:'center', marginTop:'10px', }}/>
        </Col>
      </Row>
    </div>

    </div>
    
  );
};

export default TypeProductPage;
