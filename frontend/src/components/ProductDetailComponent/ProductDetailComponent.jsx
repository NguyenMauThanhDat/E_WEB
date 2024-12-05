import React, { useState } from "react";
import * as ProductService from '../../services/ProductService'
import { Row, Col, Image, InputNumber, Button, Rate } from "antd";
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
import { useQuery } from "@tanstack/react-query";
import {useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { addOrderProduct } from "../../redux/slice/orderSlice";
import { convertPrice } from "../../utils";

const ProductDetailComponent = ({idProduct}) => {
  const [numProduct, setNumProduct] =useState(1)
  const user =useSelector((state)=>state.user)
  const navigate=useNavigate();
  const location=useLocation()
  const dispatch=useDispatch()
  const onChange = (value) => {
       setNumProduct(Number(value))
  };
  const fetchGetDetailsProduct = async (id) => {
    try {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  };
  
  const { isLoading, data: productDetails } = useQuery({
    queryKey: ['product-details', idProduct],
    queryFn: ({ queryKey }) => {
      const [, id] = queryKey; // Trích xuất id từ queryKey
      return fetchGetDetailsProduct(id);
    },
    enabled: !!idProduct, // Chỉ thực thi khi idProduct tồn tại
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  console.log('product-detail',productDetails)

  const handleChangeCount = (type) =>{
    if(type==='increase'){
       setNumProduct(numProduct + 1)
    } else{
      setNumProduct(numProduct - 1)
    }
  }

  const handleAddOrderProduct = () =>{
    if(!user?.id){
      navigate('/sign-in',{state:location?.pathname})
    } else{
    //   {
    //     name: { type: String, required: true },
    //     amount: { type: Number, required: true },
    //     image: { type: String, required: true },
    //     price: { type: Number, required: true },
    //     countInStock: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Product',
    //         required: true
    //     }
    // }
    dispatch(addOrderProduct({
      orderItem:{
        name:productDetails?.name,
        amount:numProduct,
        image:productDetails?.image,
        price:productDetails?.price,
        product:productDetails?._id
      }
    }))
    }
  }
  return (
    <Row style={{ padding: "16px", background: "#fff" }}>
      <Col span={10}>
        <Image src={productDetails?.image} alt="Image product" preview="false" />
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
          {productDetails?.name}
        </WrapperNameProduct>
        <div>
          <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}></Rate>
          <WrapperTextSell>| Đã bán 1000+</WrapperTextSell>
        </div>

        <WrapperPriceProduct>
          <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
        </WrapperPriceProduct>

        <WrapperAddress>
          <span>Giao đến</span>
          <span className="address">{user?.address}</span>
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddress>

        <div style={{margin: '10px 0 20px',padding:"10px 0", borderTop:'1px solid #ccc', borderBottom:'1px solid #ccc'}}>
          <div style={{marginBottom:'6px'}}>Số lượng</div>
          <WrapperQuality>
            <button style={{ border: "none", background:'transparent', cursor:'pointer' }} onClick={()=>handleChangeCount('decrease')}>
              <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
            </button>
            <WrapperInputNumber
              onChange={onChange}
              value={numProduct}
              defaultValue ={1}
              size="small"
              cursor='pointer'
            />
            <button style={{ border: "none",  background:'transparent', cursor:'pointer' }} onClick={()=>handleChangeCount('increase')}>
              <PlusOutlined style={{ color: "#000", fontSize: "20px" }}/>
            </button>
          </WrapperQuality>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
          <ButtonComponent
          size={40}
          //bordered={false}
          // icon={<SearchOutlined style={{color : colorButton }}/>}
          styleButton={{
            background:'rgb(255,57,69)',
            height:'40px',
            width:'220px',
            border:'none',
            borderRadius:'4px'
          }}
          onClick={handleAddOrderProduct}
          textButton={'Chọn mua'}
          styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'500'}}
        >
        </ButtonComponent>
        <ButtonComponent
          size={40}
          //bordered={false}
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
