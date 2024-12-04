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
import { calc } from "antd/es/theme/internal";

const TypeProductPage = () => {
  const {state}=useLocation()
  const [product, setProduct]=useState([])
  const [panigate, setPanigate]=useState({
    page:0,
    limit:10,
    total:1
  })
  const fetchProductType = async (type, page,limit) => {
    const res= await ProductService.getProductType(type,page,limit)
    setProduct(res?.data)
    setPanigate({...panigate,total:res?.totalPage})
  }
  useEffect(()=>{
    if(state){
      fetchProductType(state,panigate.page,panigate.limit)
    }
  },[state,panigate])
  const onChange = (current, pageSize) => {
     setPanigate({...panigate,page:current-1,limit:pageSize})
  };

  return (
    <div style={{width: '100%', background:'#efefef',height :'calc(100vh-64px)'}}>
      <div style={{ margin: "0 auto", width: "1270px", height:'100%' }}>
      <Row style={{ flexWrap: "nowrap", paddingTop: "10px", height:'calc(100%-20px)' }}>
        <WrapperNavbar span={4}>
          <NavbarComponent />
        </WrapperNavbar>
        <Col span={20} style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
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
          <Pagination defaultCurrent={panigate.page+1} total={panigate?.total} onChange={onChange} style={{textAlign:'center', marginTop:'10px', }}/>
        </Col>
      </Row>
    </div>

    </div>
    
  );
};

export default TypeProductPage;
