import React, {useEffect, useMemo, useState} from 'react';
import { Button, Checkbox, Form, Radio} from 'antd';
import { WrapperCountOrder, WrapperStyleHeader, WrapperLeft,WrapperItemOrder,WrapperPriceDiscount , WrapperRight, WrapperInfor,WrapperTotal, WrapperListOrder, Label, WrapperRadio } from './style';
import {DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
import * as message from '../../components/Message/Message';
import {WrapperInputNumber, WrapperQuality} from '../../components/ProductDetailComponent/style'
import  ButtonComponent  from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { increaseAmount, decreaseAmount, removeOrderProduct,removeAllOrderProduct, selectedOrder } from '../../redux/slice/orderSlice';
import { convertPrice } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/UserMutationHooks';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import { updateUser } from '../../redux/slice/userSlide';
import { Navigate, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const order = useSelector((state)=>state.order)
  const user = useSelector((state)=>state.user)
  const [dilivery, setDilivery]=useState('fast')
  const [payment, setPayment]=useState('later_money')
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address:''
  });
  const navigate=useNavigate()
  const [form] =Form.useForm()
  const dispatch=useDispatch()
  
  useEffect(() => {
    if (stateUserDetails) {
      form.setFieldsValue(stateUserDetails);
    }
  }, [stateUserDetails, form]);

  useEffect(()=>{
    if(isOpenModalUpdateInfo){
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      });
    }
  },[isOpenModalUpdateInfo])

  const priceMemo = useMemo(()=>{
    const result=order?.orderItemSelected?.reduce((total, cur)=>{
       return total + ((cur.price*cur.amount))
    },0)
    return result 
  },[order]) 

  const priceDiscountMemo = useMemo(()=>{
    const result=order?.orderItemSelected?.reduce((total, cur)=>{
      return total + ((cur.discount*cur.amount))
    },0)
    if(Number(result)){
      return result
    }
    return 0
  },[order]) 

  const diviliryPrice = useMemo(()=>{
    if(priceMemo>2000000){
      return 10000
    } else if(priceMemo===0){
      return 0;
    }else{
      return 20000
    }
  },[priceMemo])


  const totalPrice = useMemo(()=>{
    return Number(priceMemo) -Number(priceDiscountMemo) + Number(diviliryPrice)
  },[priceMemo, priceDiscountMemo, diviliryPrice]) 

 console.log(order)
  const handleCancelUpdate = () =>{
    setStateUserDetails({
      name: "",
      phone: "",
      address: "",
      city: ""
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false)
  }
  const mutationUpdate = useMutationHooks(
    (data) =>{
      console.log(data)
      const { id, token, ...rests}= data
     const res= UserService.updateUser(id, {...rests}, token)
     return res
    } 
  )
  const mutationAddOrder = useMutationHooks(
    (data) =>{
      console.log(data)
      const { token, ...rests}= data
     const res= OrderService.createOrder({...rests}, token)
     return res
    } 
  )
  const {data} =mutationUpdate
  const {data:dataAdd, isSuccess, isError} =mutationAddOrder

  useEffect(()=>{
    if(isSuccess ){
      const arrayOrder =[]
      order?.orderItemSelected?.forEach(element=>{arrayOrder.push(element.product)})
      dispatch(removeAllOrderProduct({listChecked:arrayOrder}))
      navigate('/orderSuccess',{
        state:{
          dilivery,
          payment,
          order:order?.orderItemSelected,
          totalPrice:totalPrice
        }
      })
    } else if(isError){
      message.error()
    }
  },[isSuccess, isError])

  const handleUpdateInfo = () =>{
    const {name, address, city, phone} = stateUserDetails
     if(name && address && city && phone){
      mutationUpdate.mutate({id:user?.id,token:user?.access_token, ...stateUserDetails},{
        onSuccess: () =>{
          dispatch(updateUser({name, address, city, phone}))
          setIsOpenModalUpdateInfo(false)
        }
      })
     }
  }

  const handleAddOrder = () => {
    if (user?.access_token && order?.orderItemSelected && user?.name && user?.address
      && user?.phone && user?.city && priceMemo && user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItem: order?.orderItemSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diviliryPrice,
        totalPrice: totalPrice,
        user: user?.id
      });
    }
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAddress = () =>{
     setIsOpenModalUpdateInfo(true)
  }

  const handleDilivery = (e) =>{
      setDilivery(e.target.value)
  }

  const handlePayment = (e) =>{
      setPayment(e.target.value)
  }

  return (
    <div style={{background:'#f5f5f5',width:'100%',height:'100vh'}}>
     <div style={{height:'100%',width:'1270px',margin:'0 auto'}}>
        <h3>Thanh toán</h3>
        <div style={{display:'flex', justifyContent:'center'}}>
           <WrapperLeft>
           <WrapperInfor>
                    <div>
                        <Label>Chọn phương thức giao hàng</Label>
                        <WrapperRadio onChange={handleDilivery} value={dilivery}>
                            <Radio value="fast" ><span style={{color:'#ea8500', fontWeight:'bold'}}>FAST</span>Giao hàng tiết kiệm</Radio>
                            <Radio value="gojek" ><span style={{color:'#ea8500', fontWeight:'bold'}}>GOJEK</span>Giao hàng tiết kiệm</Radio>
                        </WrapperRadio>
                    </div>
                </WrapperInfor>
                <WrapperInfor>
                <div>
                        <Label>Chọn phương thức thanh toán</Label>
                        <WrapperRadio onChange={handlePayment} value={payment}>
                            <Radio value="later_money" >Thanh toán tiền mặt khi nhận hàng</Radio>
                            {/* <Radio value="gojek" ><span style={{color:'#ea8500', fontWeight:'bold'}}></span></Radio> */}
                        </WrapperRadio>
                    </div>
                </WrapperInfor>
           </WrapperLeft>
          <WrapperRight>
            <div style={{width:'100%'}}>
              <WrapperInfor>
                <div>
                  <span>Địa chỉ:</span>
                  <span style={{color:'blue'}}>{`${user?.address} ${user?.city}`}</span>
                  <span onClick={handleChangeAddress} style={{color:'blue', cursor:'pointer'}}>Thay đổi</span>
                </div>
              </WrapperInfor>
                <WrapperInfor>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Tạm tính</span>
                    <span style={{color:'#000', fontSize:'14px', fontWeight:'bold'}}>{convertPrice(priceMemo)}</span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Giảm giá</span>
                    <span style={{color:'#000', fontSize:'14px', fontWeight:'bold'}}>{`${priceDiscountMemo} %`}</span>
                  </div>
                  {/* <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Thuế</span>
                    <span style={{color:'#000', fontSize:'14px', fontWeight:'bold'}}>0</span>
                  </div> */}
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Phí giao hàng</span>
                    <span style={{color:'#000', fontSize:'14px', fontWeight:'bold'}}>{convertPrice(diviliryPrice)}</span>
                  </div>
                </WrapperInfor>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{display:'flex', flexDirection:'column'}}>
                    <span style={{color:'rgb(254,56,52)', fontSize:'24px'}}>{convertPrice(totalPrice)}</span>
                    <span style={{color:'#000', fontSize:'11px'}}>(Đã bao gồm VAT)</span>
                  </span>
                </WrapperTotal>
            </div>
            <ButtonComponent 
               onClick={()=>handleAddOrder()}
               size={40}
               styleButton={{
                background:'rgb(255,67,69)',
                height:'48px',
                width:'200px',
                border:'none',
                borderRadius:'4px',
                marginTop:'10px',
                marginLeft:'50px'
               }
               }
               textButton={'Đặt hàng'}
               styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'bold'}}
            >
            </ButtonComponent>
          </WrapperRight>
        </div>
     </div>
     <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInfo}
      >
        <Form
          name="Thông tin người dùng"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          //onFinish={onUpdateUser}
          autoComplete="true"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.city}
              onChange={handleOnChangeDetails}
              name="city"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.phone}
              onChange={handleOnChangeDetails}
              name="phone"
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.address}
              onChange={handleOnChangeDetails}
              name="address"
            />
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default PaymentPage;
