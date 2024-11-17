import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WrapperHeader,
  WrapperContentProfile,
  WrapperLabel,
  WrapperInput,
  WrapperUploadFile,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UseService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/UserMutationHooks";
import * as message from '../../components/Message/Message';
import { updateUser } from "../../redux/slice/userSlide";
import { Button, Upload } from "antd";
import {UploadOutlined} from '@ant-design/icons'
// import { getBase64 } from "../../utils";


const ProfilePage = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const mutation = useMutationHooks(
    (data) =>{
      const {id,...rests}= data
      UseService.updateUser(id,rests)
    } 
)

const {data, isLoading, isSuccess, isError} =mutation
console.log(data)

  useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
  }, [user]);
  
  useEffect(()=>{
    if(isSuccess){
      message.success()
      handleGetDetailUser(user?.id, user?.access_token)
    } else if(isError){
      message.error()
    }
  }, [isSuccess, isError])

  const handleGetDetailUser = async (id, token) => {
    const res= await UseService.getDetailUser(id, token);
    dispatch(updateUser({...res?.data, access_token: token}))
    console.log('res',res)
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  };

  const handleOnchangeName = (value) => {
    setName(value)
  };
  const handleOnchangePhone = (value) => {
    setPhone(value)
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value)
  };
  const handleOnchangeAvatar = (value) => {
    setAvatar(value)
  };
  // const handleOnchangeAvatar = async ({fileList}) => {
  //   const file=fileList[0]
  //     if(!file.url&&!file.preview){
  //       file.preview = await getBase64(file.originFileObj)
  //     }
  //   setAvatar(file.preview)
  // };

  const handleUpdate = async () => {
    mutation.mutate({ id: user?.id, email, name, phone, address, avatar })
  };
  return (
    <div style={{ width: "1270px", margin: "0 auto", height: "50px" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Name</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="name"
            value={name}
            onChange={handleOnchangeName}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "4px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "500",
            }}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="email">Email</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="email"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "4px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "500",
            }}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="phone"
            value={phone}
            onChange={handleOnchangePhone}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "4px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "500",
            }}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="address">Address</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="address"
            value={address}
            onChange={handleOnchangeAddress}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "4px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "500",
            }}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
          <InputForm
            style={{ width: "300px" }}
            id="avatar"
            value={avatar}
            onChange={handleOnchangeAvatar}
          />
          {/* <WrapperUploadFile onChange={handleOnchangeAvatar}>
              <Button icon={<UploadOutlined/>}>Select File</Button>
          </WrapperUploadFile>
          {avatar&&(
            <img src={avatar} style={{height:'60px', width:'60px', borderRadius:'50%', objectFit:'cover'}} alt='avatar'/>
          )} */}
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "4px 6px",
            }}
            textButton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "500",
            }}
          ></ButtonComponent>
        </WrapperInput>
      </WrapperContentProfile>
    </div>
  );
};

export default ProfilePage;
