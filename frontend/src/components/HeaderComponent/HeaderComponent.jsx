import React, { useState }  from "react";
import { Col } from "antd";
import Search from "antd/lib/transfer/search";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
  WrapperContentPopup
} from "./style";
import { UserOutlined } from "@ant-design/icons";
import { CaretDownOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { Badge } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, ConfigProvider, Flex, Popover } from "antd";
import * as UseService from '../../services/UserService'
import { resetUser } from '../../redux/slice/userSlide';
import Loading from '../LoadingComponent/Loading'

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch()
  const [loading, setLoading]= useState(false)
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleLogout = async () => {
    setLoading(true)
    await UseService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  const content =(
    <div>
      <WrapperContentPopup onClick={handleLogout}>Dang xuat</WrapperContentPopup>
      <WrapperContentPopup>Thong tin nguoi dung</WrapperContentPopup>
    </div>
  )
  return (
    <div
      style={{
        width: "100%",
        background: "rgb(26,148,255)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader gutter={15}>
        <Col span={6}>
          <WrapperTextHeader>TSHOP</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            placeholder="input search text"
            textButton="Tim kiem"
            //bordered='false'
          />
        </Col>
        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          {/* <Loading isLoading={Loading}> */}
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "30px" }} />
            {user?.name ? (
              <>
                <Popover
                  content={content}
                  trigger="click"
                >
                 <div style={{ cursor: "pointer" }}>{user.name}</div>
                </Popover>
              </>
            ) : (
              <div onClick={handleNavigateLogin} style={{ cursor: "pointer" }}>
                <WrapperTextHeaderSmall>
                  Dang nhap/Dang ki
                </WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tai khoan</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAccount>
          {/* </Loading> */}
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
