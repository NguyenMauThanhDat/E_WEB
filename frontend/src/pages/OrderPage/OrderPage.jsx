import React, {useEffect, useMemo, useState} from 'react';
import { Button, Checkbox, Form} from 'antd';
import { WrapperCountOrder, WrapperStyleHeader, WrapperLeft,WrapperItemOrder,WrapperPriceDiscount , WrapperRight, WrapperInfor,WrapperTotal, WrapperListOrder, WrapperStyleHeaderDilivery } from './style';
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
import { updateUser } from '../../redux/slice/userSlide';
import { Navigate, useNavigate } from 'react-router-dom';
import StepComponent from '../../components/StepComponent/StepComponent';

const OrderPage = () => {
  const order = useSelector((state)=>state.order)
  const user = useSelector((state)=>state.user)
  const [listChecked, setListChecked]=useState([])
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
  const onChange = (e) =>{
    if(listChecked.includes(e.target.value)){
       const newListChecked=listChecked.filter((item)=>item!==e.target.value)
       setListChecked(newListChecked)
    }else{
       setListChecked([...listChecked,e.target.value])
    }
  }
  
  const handleDeleteOrder = (idProduct) =>{
    dispatch(removeOrderProduct({idProduct}))
  }
  const handleChangeCount = (type,idProduct, max) =>{
    if(type==='increase'){
      if(!max){
        dispatch(increaseAmount({idProduct}))
      } 
    } else{
      if(!max){
        dispatch(decreaseAmount({idProduct}))
      }
    }
  }

  const handleRemoveAllOrder = () =>{
    if(listChecked?.length>1){
      dispatch(removeAllOrderProduct({listChecked}));
    }
   
  }
  const handleOnChangeCheckAll = (e) =>{
     if(e.target.checked){
      const newListChecked=[]
      order?.orderItem?.forEach((item)=>{newListChecked.push(item?.product)})
      setListChecked(newListChecked)
     }else{
      setListChecked([]);
     }
  }

  useEffect(()=>{
    dispatch(selectedOrder({listChecked}))
  },[listChecked])

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
    if(priceMemo>200000&&priceMemo<500000){
      return 10000
    } else if(priceMemo>=500000||order?.orderItemSelected?.length===0){
      return 0;
    }else{
      return 20000
    }
  },[priceMemo])


  const totalPrice = useMemo(()=>{
    return Number(priceMemo) -Number(priceDiscountMemo) + Number(diviliryPrice)
  },[priceMemo, priceDiscountMemo, diviliryPrice]) 

  const handleAddCard = () =>{
    if(!order?.orderItemSelected?.length){
      message.error('Vui lòng chọn sản phẩm')}
    // } else if(!user?.phone||!user.address||!user.name||!user.city){
    else if(!user?.phone||!user.address||!user.name||!user.city){
        setIsOpenModalUpdateInfo(true)}
    else {
      navigate('/payment')
    } 
  }

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
  const {data} =mutationUpdate
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

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeAddress = () =>{
     setIsOpenModalUpdateInfo(true)
  }
const itemsDilivery = [
      {
        title: '20.000 VND',
        description:'Dưới 200.000 VND',
      },
      {
        title: '10.000 VND',
        description:'Từ 200.000 VND đến 500.000 VND',
      },
      {
        title: '0 VND',
        description:'Trên 500.000 VND',
      },]
  return (
    <div style={{background:'#f5f5f5',width:'100%',height:'100vh'}}>
     <div style={{height:'100%',width:'1270px',margin:'0 auto'}}>
        <h3>Giỏ hàng</h3>
        <div style={{display:'flex', justifyContent:'center'}}>
           <WrapperLeft>
            <WrapperStyleHeaderDilivery>
              <StepComponent items={itemsDilivery} current={diviliryPrice===20000?0:diviliryPrice===10000?1:order.orderItemSelected.length===0?0:2}></StepComponent>
            </WrapperStyleHeaderDilivery>
                <WrapperStyleHeader>
                  <span style={{display:'inline-block', width:'390px'}}>
                    <Checkbox onChange={handleOnChangeCheckAll} checked={listChecked?.length===order?.orderItem?.length}></Checkbox>
                    <span>Tất cả ({order?.orderItem?.length} sản phẩm)</span>
                  </span>
                <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Đơn giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền </span>
                    <DeleteOutlined style={{cursor:'pointer'}} onClick={handleRemoveAllOrder}></DeleteOutlined>
                </div>
                </WrapperStyleHeader>
                <WrapperListOrder>
                  {order?.orderItem?.map((order)=>{
                    return(
                    <WrapperItemOrder>
                    <div style={{width:'340px', display:'flex', alignItems:'center', gap:4}}>
                      <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                      <img src={order?.image} style={{width:'77px', height:'79px', objectFit:'cover'}}/>
                      <div style={{width:260, overflow:'hidden', textOrientation:'ellipsis', whiteSpace:'nowrap'}}>{order?.name}</div>
                    </div>
                    <div style={{flex: 1, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <span>
                            <span style={{fontSze:'13px',color:'#242424'}}>{convertPrice(order?.price)}</span>
                            {/* <WrapperPriceDiscount>
                              {order?.amount}
                            </WrapperPriceDiscount> */}
                          </span>
                          <WrapperCountOrder>
                             <button style={{border:'none', background:'transparent', cursor:'pointer'}} onClick={()=>handleChangeCount('decrease',order?.product,order?.amount===1)}>
                                  <MinusOutlined style={{color:'#000', fontSize:'10px'}}></MinusOutlined>
                             </button>
                             <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" min={1} max={order?.countInStock}></WrapperInputNumber>
                             <button style={{border:'none', background:'transparent', cursor:'pointer'}} onClick={()=>handleChangeCount('increase',order?.product,order?.amount===order.countInStock)}>
                                  <PlusOutlined style={{color:'#000', fontSize:'10px'}}></PlusOutlined>
                             </button>
                          </WrapperCountOrder>
                          <span style={{color:'rgb(255,56,78', fontSize:'13px', fontWeight:'500'}}>{convertPrice(order?.price *order?.amount)}</span>
                           <DeleteOutlined style={{cursor:'pointer'}} onClick={()=>handleDeleteOrder(order?.product)}></DeleteOutlined>
                    </div>
                  </WrapperItemOrder>)
                  })}
                </WrapperListOrder>
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
                    <span style={{color:'#000', fontSize:'14px', fontWeight:'bold'}}>{convertPrice(priceDiscountMemo)}</span>
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
               onClick={()=>handleAddCard()}
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
               textButton={'Mua hàng'}
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

export default OrderPage;
