import React from "react";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import {
  StyleNameProduct,
  WrapperDiscount,
  WrapperPrice,
  WrapperReportText,
  WrapperCardStyle
} from "./style";
import { StarFilled } from "@ant-design/icons";
import { WrapperTextSell } from "./style";

const CardComponent = () => {
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{width: '200px', height: '200px'}}
      style={{ width: 200 }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
      <StyleNameProduct>Quan ao</StyleNameProduct>
      <WrapperReportText>
        <span style={{marginRight:'4px'}}>
          <span>4.56 </span>
          <StarFilled style={{ fontSize: "10px", color: "yellow" }} />
        </span>
        <WrapperTextSell> | Da ban 1000+</WrapperTextSell>
      </WrapperReportText>
      <WrapperPrice>
        <span style={{marginRight:'8px'}}>1.000.000d</span>
         <WrapperDiscount>-5%</WrapperDiscount>
      </WrapperPrice>
    </WrapperCardStyle>
  );
};

export default CardComponent;
