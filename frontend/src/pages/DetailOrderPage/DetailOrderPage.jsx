import React, { useMemo } from "react";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
 WrapperContentInfo, WrapperHeaderUser,WrapperInfoUser,WrapperItem, WrapperItemLabel,WrapperLabel,WrapperNameProduct,
 WrapperProduct,WrapperStyleContent
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { convertPrice } from "../../utils";
import { useLocation, useParams } from "react-router-dom";
import {orderContant} from "../../contant"

const DetailOrderPage = () => {
 const params = useParams();
 const location=useLocation()
 const {state} =location
 const {id}=params;
  const fetchDetailOrder = async () => {
    const res = await OrderService.getOrderDetail(
      id,
      state?.token
    );
    console.log(res);
    return res.data;
  };
  const queryOrder = useQuery({
    queryKey: ["orders-detail"],
    queryFn: fetchDetailOrder,
    enabled: !!id,
  });
  const { data } = queryOrder;
  const priceMemo = useMemo(()=>{
      const result=data?.orderItem?.reduce((total, cur)=>{
         return total + ((cur.price*cur.amount))
      },0)
      return result 
    },[data]) 
  console.log(data);
  // const {shippingAddress, orderItem, shippingPrice, paymentMethod, isPaid} =data
  return (
    <div style={{ background: "#f5f5fa", width: "100%", height: "100vh" }}>
      <div style={{margin:'0 auto', width: "1270px", height: "100%"}}>
        <h4>Chi tiết đơn hàng</h4>
        <WrapperHeaderUser>
          <WrapperInfoUser>
            <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
            <WrapperContentInfo>
              {/* <div className="name-info">{shippingAddress?.fullName}</div>
              <div className='address-info'><span>Địa chỉ:</span>{`${shippingAddress?.address} ${shippingAddress?.city}`}</div>
              <div className="phone-info"><span>Điện thoại</span>{shippingAddress?.phone}</div> */}
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
          <WrapperLabel>Hình thức giao hàng</WrapperLabel>
            <WrapperContentInfo>
              <div className='delivery-info'><span className="name-delivery">FAST</span>Giao hàng tiết kiệm</div>
              {/* <div className="delivery-fee"><span>Phí giao hàng:</span>{shippingPrice}</div> */}
            </WrapperContentInfo>
          </WrapperInfoUser>
          <WrapperInfoUser>
          <WrapperLabel>Hình thức thanh toán</WrapperLabel>
            <WrapperContentInfo>
              {/* <div className='payment-info'>{orderContant.payment[data?.paymentMethod]}</div> */}
              {/* <div className="status-payment">{isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div> */}
            </WrapperContentInfo>
          </WrapperInfoUser>
        </WrapperHeaderUser>
        <WrapperStyleContent>
          <div style={{flex: 1, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
             <div style={{width:'610px'}}>Sản phẩm</div>
             <WrapperItemLabel>Giá</WrapperItemLabel>
             <WrapperItemLabel>Số lượng</WrapperItemLabel>
             <WrapperItemLabel>Giảm giá</WrapperItemLabel>
             <WrapperItemLabel>Tạm tính</WrapperItemLabel>
             <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
             <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
          </div>
         {/* {orderItem?.map((order)=>{
            return ( */}
              <WrapperProduct>
              <WrapperNameProduct>
                {/* <img src={order?.image} style={{width:'70px', height:'70px', objectFit:'cover', border:'1px solid rgb(238,238,238)'}}/> */}
                <div style={{width:260, overflow:'hidden', 
                  textOverflow:'ellipsis', whiteSpace:'nowrap', marginLeft:'10px', height:'70px'}}>Điện thoại</div>
              </WrapperNameProduct>
              {/* <WrapperItemLabel >{convertPrice(order?.price)}</WrapperItemLabel>
                 <WrapperItemLabel>{order?.amount}</WrapperItemLabel>
                 <WrapperItemLabel>{order?.discount ? convertPrice(priceMemo*priceDiscountMemo/100):'0 VND'}</WrapperItemLabel>
                 <WrapperItemLabel>{convertPrice(priceMemo)}</WrapperItemLabel>
                 <WrapperItemLabel>{convertPrice(data?.shippingPrice)}</WrapperItemLabel>
                 <WrapperItemLabel>{convertPrice(data?.totalPrice)}</WrapperItemLabel> */}
            </WrapperProduct>
             {/* )
         })} */}
        </WrapperStyleContent>
      </div>
     
    </div>
  );
};

export default DetailOrderPage;
