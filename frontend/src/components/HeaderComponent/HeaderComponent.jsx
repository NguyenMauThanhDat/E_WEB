import React from "react";
import { Col } from "antd";
import Search from "antd/lib/transfer/search";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import { UserOutlined } from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import {Badge} from 'antd'

const HeaderComponent = () => {
  return (
    <div style={{width:'100%', background:'rgb(26,148,255)', display:'flex', justifyContent:'center'}}>
      <WrapperHeader gutter={15}>
        <Col span={6}>
          <WrapperTextHeader>TSHOP</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            placeholder="input search text"
            textButton="Tim kiem"
            bordered='false'
          />
        </Col>
        <Col span={6} style={{ display: "flex", gap: "54px", alignItems: "center" }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "30px" }} />
            <div>
              <WrapperTextHeaderSmall>Dang nhap/Dang ki</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tai khoan</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          <div>
            <div>
              <Badge count={4} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "40px", color: "#fff" }}
              />
              </Badge>
              <WrapperTextHeaderSmall>Gio hang</WrapperTextHeaderSmall>
            </div>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
