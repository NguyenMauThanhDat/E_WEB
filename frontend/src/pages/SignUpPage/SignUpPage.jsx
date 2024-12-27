import React, {useEffect, useState} from 'react';
import {WrapperContainerLeft, WrapperContainerRight, WrapperTextLight} from './style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import H14 from '../../assets/image/H14.png';
import { Divider, Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/UserMutationHooks';
import * as UseService from '../../services/UserService'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message';

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword]=useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword]=useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword]= useState('')
  const [confirmPassword, setConfirmPassword]= useState('')

  const handleOnchangeEmail = (value) => {
      setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }
  const handleSignUp = () => {
    mutation.mutate({email, password, confirmPassword})
  }

  const mutation = useMutationHooks(
    data => UseService.signupUser(data)
  )

const {data, isLoading, isSuccess, isError} =mutation
// useEffect(()=>{
//    if(isSuccess){
//     message.success()
//     handleNavigateSignIn()
//   } else if(isError){
//     message.error()
//   }
// },[isSuccess, isError])
useEffect(() => {
  if (isSuccess && data?.status === "OK") {
    message.success("Sign-up successful!");
    handleNavigateSignIn();
  } else if (data?.status === "ERR") {
    message.error(data?.message || "Sign-up failed.");
  } else if (isError) {
    message.error("An unexpected error occurred.");
  }
}, [isSuccess, isError, data]);

  const navigate = useNavigate()
  const handleNavigateSignIn=()=>{
       navigate('/sign-in')
  }

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.53)', height:'100vh'}}>
<div style={{width:'800px', height:'445px', borderRadius:'6px', background:'#fff',display:'flex'}}>
    <WrapperContainerLeft>
      <h1>Xin chao</h1>
      <p>Dang nhap hoac tao tai khoan</p>
      <InputForm style={{marginBottom:"10px"}} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>

      <div style={{position:'relative'}}>
      <span onClick={()=>setIsShowPassword(!isShowPassword)} style={{zIndex:'10', position:'absolute',top:'4px', right:'8px'}}>
        {isShowPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled/>)} 
      </span>
      <InputForm placeholder="password"  style={{marginBottom:'10px'}} type={isShowPassword?"text":"password"} 
      value={password} onChange={handleOnchangePassword}/>
      </div>
      
      <div style={{position:'relative'}}>
      <span onClick={()=>setIsShowConfirmPassword(!isShowConfirmPassword)} style={{zIndex:'10', position:'absolute',top:'4px', right:'8px'}}>
        {isShowConfirmPassword ? (<EyeFilled/>) : (<EyeInvisibleFilled/>)} 
      </span>
      <InputForm placeholder="confirm password"  type={isShowConfirmPassword?"text":"password"}
      value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>
      </div>

      {data?.status==='ERR' && <span style={{color:'red'}}>{data?.message}</span>}
     {/* <Loading isLoading={isLoading}> */}
      <ButtonComponent
          disabled={!email.length || !password.length || !confirmPassword.length}
          onClick={handleSignUp}
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
          textButton={'Đăng kí'}
          styleTextButton={{color:'#fff', fontSize:'15px', fontWeight:'500'}}
        >
        </ButtonComponent>
        {/* </Loading> */}
        {/* <p><WrapperTextLight>Quen mat khau</WrapperTextLight></p> */}
        <p>Bạn đã có tài khoản<WrapperTextLight onClick={handleNavigateSignIn}>Dang nhap</WrapperTextLight></p>

    </WrapperContainerLeft>
    <WrapperContainerRight>
      <Image src={H14} preview={false} alt="image-logo" height='203px' width='203px'/>
      <h4>Mua sắm ở đây</h4>
    </WrapperContainerRight>
    </div>
    </div>
  );
};

export default SignUpPage;