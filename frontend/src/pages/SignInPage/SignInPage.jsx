import React, { useState } from 'react';
import {WrapperContainerLeft, WrapperContainerRight, WrapperTextLight} from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import H14 from '../../assets/image/H14.png';
import { Divider, Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword]=useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword]= useState('')

  const navigate=useNavigate()
  const handleNegivateSignUp = () =>{
    navigate('/sign-up')
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePassword = (value) => {
  setPassword(value)
  }

  const handleSignIn = () =>{
    console.log(email, password)
  }

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.53)', height:'100vh'}}>
<div style={{width:'800px', height:'445px', borderRadius:'6px', background:'#fff',display:'flex'}}>
    <WrapperContainerLeft>
      <h1>Xin chao</h1>
      <p>Dang nhap hoac tao tai khoan</p>
      <InputForm style={{marginBottom:"10px"}} placehoder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>
      
      <div style={{position:'relative'}}>
      <span onClick={()=>setIsShowPassword(!isShowPassword)} style={{zIndex:'10', position:'absolute',top:'4px', right:'8px'}}>
        {isShowPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled/>)} 
      </span>
      <InputForm placeholder="password"  type={isShowPassword?"text":"password"} value={password} onChange={handleOnchangePassword}/>
      </div>
      
      <ButtonComponent
          disabled={!email.length || !password.length}
          onClick={handleSignIn}
          size={40}
          //bordered={false}
          // icon={<SearchOutlined style={{color : colorButton }}/>}
          styleButton={{
            background:'rgb(255,57,69)',
            height:'40px',
            width:'100%',
            border:'none',
            borderRadius:'4px', 
            margin:'26px 0 10px'
          }}
          textButton={'Dang nhap'}
          styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'500'}}
        >
        </ButtonComponent>
        <p><WrapperTextLight>Quen mat khau</WrapperTextLight></p>
        <p>Chua co tai khoan <WrapperTextLight onClick={handleNegivateSignUp}>Tao tai khoan</WrapperTextLight></p>

    </WrapperContainerLeft>
    <WrapperContainerRight>
      <Image src={H14} preview={false} alt="image-logo" height='203px' width='203px'/>
      <h4>Mua sam o day</h4>
    </WrapperContainerRight>
    </div>
    </div>
    
  );
};

export default SignInPage;