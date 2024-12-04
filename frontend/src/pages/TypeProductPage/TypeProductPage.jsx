import React, { Fragment } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Row } from "antd";
import { WrapperProduct, WrapperNavbar } from "./style";
import { Pagination } from "antd";
import {useLocation} from 'react-router-dom'
import * as ProductService from "../../services/ProductService";
import {useEffect} from 'react'
import {useState} from 'react'

const TypeProductPage = () => {
  const onChange = () => {};
  const {state}=useLocation()
  const [product, setProduct]=useState([])
  const fetchProductType = async (type) => {
    const res= await ProductService.getProductType(type)
    setProduct(res?.data)
  }
  useEffect(()=>{
    if(state){
      fetchProductType(state)
    }
  },[state])
  return (
    <div style={{width: '100%', background:'#efefef'}}>
      <div style={{ margin: "0 auto", width: "1270px" }}>
      <Row style={{ flexWrap: "nowrap", paddingTop: "10px" }}>
        <WrapperNavbar span={4}>
          <NavbarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProduct>
            {product?.map((product)=>{
              return(
                <CardComponent 
                key={product._id} 
                countInStock={product.countInStock} 
                description={product.description} 
                image={product.image}
                 name={product.name}
                 price={product.price}
                 rating={product.rating} 
                 type={product.type}
                 selled={product.selled}
                 discount={product.discount}
                 id={product._id}/>
              )
            })}
          </WrapperProduct>
          <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{textAlign:'center', marginTop:'10px', }}/>
        </Col>
      </Row>
    </div>

    </div>
    
  );
};

export default TypeProductPage;
