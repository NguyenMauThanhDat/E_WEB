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
import {useNavigate} from 'react-router-dom'
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, selled, discount, id} = props
  const navigate=useNavigate()
  const handleDetailsProduct = (id) =>{
       navigate(`/product-detail/${id}`)
  }
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{width: '200px', height: '200px'}}
      style={{ width: 200 }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src={image}
        />
      }
      onClick={() => handleDetailsProduct(id)}
    >
      {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{marginRight:'4px'}}>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: "10px", color: "yellow" }} />
        </span>
        <WrapperTextSell> | Đã bán {selled||1000}</WrapperTextSell>
      </WrapperReportText>
      <WrapperPrice>
        <span style={{marginRight:'8px'}}>{convertPrice(price)}</span>
         <WrapperDiscount> - {discount||5}%</WrapperDiscount>
      </WrapperPrice>
    </WrapperCardStyle>
  );
};

export default CardComponent;
