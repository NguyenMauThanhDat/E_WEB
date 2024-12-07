import React, { useEffect, useMemo, useState } from "react";
import {
  WrapperLeft,
  WrapperItemOrder,
  WrapperInfor,
  Label,
  WrapperValue,
  WrapperCountOrder,
  WrapperItemOrderInfor,
} from "./style";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;
  return (
    <div style={{ background: "#f5f5f5", width: "100%", height: "100vh" }}>
      <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
        <h3>Đơn đặt hàng thành công</h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperInfor>
              <div>
                <Label>Phương thức giao hàng</Label>
                <WrapperValue>
                  <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                    {orderContant.dilivery[state?.dilivery]}
                  </span>
                  Giao hàng tiết kiệm
                </WrapperValue>
              </div>
            </WrapperInfor>
            <WrapperInfor>
              <div>
                <Label>Phương thức thanh toán</Label>
                <WrapperValue>
                  {orderContant.payment[state?.payment]}
                </WrapperValue>
              </div>
            </WrapperInfor>
            <WrapperItemOrderInfor>
              {state.order?.map((order) => {
                return (
                  <WrapperItemOrder>
                    <div
                      style={{
                        width: "340px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <img
                        src={order?.image}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOrientation: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <span>
                        <span style={{ fontSze: "13px", color: "#242424" }}>
                          Giá tiền: {convertPrice(order?.price)}
                        </span>
                      </span>
                      <span>
                        <span style={{ fontSze: "13px", color: "#242424" }}>
                          Số lượng: {order?.amount}
                        </span>
                      </span>
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperItemOrderInfor>
            <span>
              <span style={{ fontSze: "16px", color: "red" }}>
                Thành tiền: {convertPrice(state?.totalPrice)}
              </span>
            </span>
          </WrapperLeft>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
