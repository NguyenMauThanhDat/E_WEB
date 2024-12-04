import React, {useState} from 'react';
import { Checkbox } from 'antd';
import { WrapperCountOrder, WrapperStyleHeader, WrapperLeft,WrapperItemOrder,WrapperPriceDiscount , WrapperRight, WrapperInfor,WrapperTotal, WrapperListOrder } from './style';
import {DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons'
//import img from '../../assets/images/test'
import {WrapperInputNumber, WrapperQuality} from '../../components/ProductDetailComponent/style'
import  ButtonComponent  from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { increaseAmount, decreaseAmount } from '../../redux/slice/orderSlice';

const OrderPage = () => {
  const order = useSelector((state)=>state.order)
  const dispatch=useDispatch()
  const onChange = () =>{

  }
  const handleChangeCount = (type,idProduct) =>{
    if(type==='increase'){
      dispatch(increaseAmount({idProduct}))
    } else{
      dispatch(decreaseAmount({idProduct}))
    }
  }
  const handleOnChangeCheckAll = (e) =>{

  }
  return (
    <div style={{background:'#f5f5f5',width:'100%',height:'100vh'}}>
     <div style={{height:'100%',width:'1270px',margin:'0 auto'}}>
        <h3>Giỏ hàng</h3>
        <div style={{display:'flex', justifyContent:'center'}}>
           <WrapperLeft>
                <WrapperStyleHeader>
                  <span style={{display:'inline-block', width:'390px'}}>
                    <Checkbox onChange={handleOnChangeCheckAll}></Checkbox>
                    <span>Tất cả ({order?.orderItem?.length} sản phẩm)</span>
                  </span>
                <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Đơn giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền </span>
                    <DeleteOutlined style={{cursor:'pointer'}}></DeleteOutlined>
                </div>
                </WrapperStyleHeader>
                <WrapperListOrder>
                  {order?.orderItem?.map((order)=>{
                    return(
                    <WrapperItemOrder>
                    <div style={{width:'340px', display:'flex', alignItems:'center', gap:4}}>
                      <Checkbox onChange={onChange}></Checkbox>
                      {/* <img src={H15} style={{width:'77px', height:'79px', objectFit:'cover'}}/> */}
                      <div>{order?.name}</div>
                    </div>
                    <div style={{flex: 1, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                          <span>
                            <span style={{fontSze:'13px',color:'#242424'}}>{order?.price}</span>
                            <WrapperPriceDiscount>
                              {order?.amount}
                            </WrapperPriceDiscount>
                          </span>
                          <WrapperCountOrder>
                             <button style={{border:'none', background:'transparent', cursor:'pointer'}} onClick={()=>handleChangeCount('decrease',order?.product)}>
                                  <MinusOutlined style={{color:'#000', fontSize:'10px'}}></MinusOutlined>
                             </button>
                             <WrapperInputNumber onChange={onChange} defaultValue={order?.amount} value={order?.amount} size="small"></WrapperInputNumber>
                             <button style={{border:'none', background:'transparent', cursor:'pointer'}} onClick={()=>handleChangeCount('increase',order?.product)}>
                                  <PlusOutlined style={{color:'#000', fontSize:'10px'}}></PlusOutlined>
                             </button>
                          </WrapperCountOrder>
                          <span style={{color:'rgb(255,56,78', fontSize:'13px', fontWeight:'500'}}>{order?.price *order?.amount}</span>
                           <DeleteOutlined style={{cursor:'pointer'}}></DeleteOutlined>
                    </div>
                  </WrapperItemOrder>)
                  })}
                </WrapperListOrder>
           </WrapperLeft>
          <WrapperRight>
            <div style={{width:'100%'}}>
                <WrapperInfor>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Tạm tính</span>
                    <span style={{color:'#000', fontSize:'14px', fontWeight:'bold'}}>0</span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Giảm giá</span>
                    <span style={{color:'#000', fontSize:'14px', fontWeight:'bold'}}>0</span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Thuế</span>
                    <span style={{color:'#000', fontSize:'14px', fontWeight:'bold'}}>0</span>
                  </div>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <span>Phí giao hàng</span>
                    <span style={{color:'#000', fontSize:'14px', fontWeight:'bold'}}>0</span>
                  </div>
                </WrapperInfor>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{display:'flex', flexDirection:'column'}}>
                    <span style={{color:'rgb(254,56,52)', fontSize:'24px'}}>0213</span>
                    <span style={{color:'#000', fontSize:'11px'}}>(Đã bao gồm VAT)</span>
                  </span>
                </WrapperTotal>
            </div>
            <ButtonComponent 
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
    </div>
  );
};

export default OrderPage;
