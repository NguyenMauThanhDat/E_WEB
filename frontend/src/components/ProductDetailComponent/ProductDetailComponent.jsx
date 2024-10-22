import React from "react";
import { Row, Col, Image, InputNumber, Button } from "antd";
import H14 from "../../assets/image/H14.png";
import H15 from "../../assets/image/H15.png";
import {
  WrapperStyledImageSmall,
  WrapperStyledColImage,
  WrapperNameProduct,
  WrapperTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddress,
  WrapperQuality,
  WrapperInputNumber,
  WrapperBtnQuality,
} from "./style";
import { MinusOutlined, PlusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const ProductDetailComponent = () => {
  const onChange = () => {};
  return (
    <Row style={{ padding: "16px", background: "#fff" }}>
      <Col span={10}>
        <Image src={H14} alt="Image product" preview="false" />
        <Row style={{ paddingTop: "10px", justifyContent: "space-between" }}>
          <WrapperStyledColImage span={4}>
            <WrapperStyledImageSmall src={H15} alt="small" preview="false" />
          </WrapperStyledColImage>

          <WrapperStyledColImage span={4}>
            <WrapperStyledImageSmall src={H15} alt="small" preview="false" />
          </WrapperStyledColImage>

          <WrapperStyledColImage span={4}>
            <WrapperStyledImageSmall src={H15} alt="small" preview="false" />
          </WrapperStyledColImage>

          <WrapperStyledColImage span={4}>
            <WrapperStyledImageSmall src={H15} alt="small" preview="false" />
          </WrapperStyledColImage>
        </Row>
      </Col>
      <Col span={14}>
        <WrapperNameProduct>
          Ao nam nh unh trn thanh ngay huw mjaiksndsdf
        </WrapperNameProduct>
        <div>
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <StarFilled style={{ fontSize: "12px", color: "rgb(253,216,54)" }} />
          <WrapperTextSell>| Da ban 1000+</WrapperTextSell>
        </div>

        <WrapperPriceProduct>
          <WrapperPriceTextProduct>200.000d</WrapperPriceTextProduct>
        </WrapperPriceProduct>

        <WrapperAddress>
          <span>Giao den</span>
          <span className="address">Quan 5, TP Ho Chi Minh</span>
          <span className="change-address">Doi dia chi</span>
        </WrapperAddress>

        <div style={{margin: '10px 0 20px',padding:"10px 0", borderTop:'1px solid #ccc', borderBottom:'1px solid #ccc'}}>
          <div style={{marginBottom:'6px'}}>So luong</div>
          <WrapperQuality>
            <button style={{ border: "none", background:'transparent' }}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
            <WrapperInputNumber
              defaultValue={3}
              onChange={onChange}
              size="small"
            />
            <button style={{ border: "none",  background:'transparent' }}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
          </WrapperQuality>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <ButtonComponent
          size={40}
          bordered={false}
          // icon={<SearchOutlined style={{color : colorButton }}/>}
          styleButton={{
            background:'rgb(255,57,69)',
            height:'40px',
            width:'220px',
            border:'none',
            borderRadius:'4px'
          }}
          textButton={'Chon mua'}
          styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'500'}}
        >
        </ButtonComponent>
        <ButtonComponent
          size={40}
          bordered={false}
          // icon={<SearchOutlined style={{color : colorButton }}/>}
          styleButton={{
            background:'#fff',
            height:'40px',
            width:'220px',
            border:'1 solid rgb(13,82,192)',
            borderRadius:'4px'
          }}
          textButton={'Mua truoc tra sau'}
          styleTextButton={{color:'rgb(13,82,192)', fontSize:'15px'}}
        >
        </ButtonComponent>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailComponent;
