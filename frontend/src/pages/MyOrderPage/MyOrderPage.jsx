import React from "react";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  WrapperContainer,
  WrapperFooter,
  WrapperHeaderItem,
  WrapperItemOrder,
  WrapperListOrder,
  WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { convertPrice } from "../../utils";
import { useParams } from "react-router-dom";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const params = useParams();
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(
      user?.id,
      user?.access_token
    );
    console.log(res);
    return res.data;
  };
  const queryOrder = useQuery({
    queryKey: ["orders"],
    queryFn: fetchMyOrder,
    enabled: !!(user?.id && user?.access_token),
  });
  const { data } = queryOrder;
  console.log(data);

  const renderProduct = (data) =>{
    return data?.map((order)=>{
       return <WrapperHeaderItem>
        <img src={order?.image} style={{width:'70px', height:'70px', objectFit:'cover', border:'1px, solid, rgb(238,238,238)', padding:'2px'}}></img>
        <div style={{width:260, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginLeft:'10px'}}>{order?.name}</div>
        <span style={{fontSize:'13px', color:'#242424', marginLeft:'auto'}}>{convertPrice(order?.price)}</span>
       </WrapperHeaderItem>
    })
  }

  return (
    <div style={{ margin: "0 auto", width: "1270px", height: "100%" }}>
      <h4>Đơn hàng của tôi</h4>
      <WrapperContainer>
        <WrapperListOrder>
          {data?.map((order) => {
            return (
              <WrapperItemOrder key={order?._id}>
                <WrapperStatus>
                  <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Trạng thái
                  </span>
                  <div>
                    <span style={{ color: "rgb(255,66,78)" }}>Giao hàng</span>
                    {`${order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}`}
                  </div>
                  <div>
                    <span style={{ color: "rgb(255,66,78)" }}>Thanh toán</span>
                    {`${order.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}`}
                  </div>
                </WrapperStatus>
                {renderProduct(order?.orderItem)}
                <WrapperFooter>
                  <div>
                    <span style={{ color: "rgb(255,66,78)" }}>Tổng tiền</span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "rgb(56,56,61)",
                        fontWeight: 700,
                      }}
                    >
                      {convertPrice(order?.totalPrice)}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <ButtonComponent
                      size={40}
                      styleButton={{
                        height: "36px",
                        border: "1px solid rgb(11,116,229)",
                        borderRadius: "4px",
                      }}
                      textButton={"Hủy đơn hàng"}
                      styleTextButton={{
                        color: "rgb(11,116,219)",
                        fontSize: "14px",
                      }}
                      disabled={false}
                    />
                    <ButtonComponent
                    //onClick={()=>handleDetailOrder()}
                      size={40}
                      styleButton={{
                        height: "36px",
                        border: "1px solid rgb(11,116,229)",
                        borderRadius: "4px",
                      }}
                      textButton={"Xem chi tiết"}
                      styleTextButton={{
                        color: "rgb(11,116,219)",
                        fontSize: "14px",
                      }}
                      disabled={false}
                    />
                  </div>
                </WrapperFooter>
              </WrapperItemOrder>
            );
          })}
        </WrapperListOrder>
      </WrapperContainer>
    </div>
  );
};

export default MyOrderPage;
