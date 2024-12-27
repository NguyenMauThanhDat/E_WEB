import React, { useState } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UseService from '../../services/UserService';
import * as message from '../../components/Message/Message';



const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   const handleForgotPassword = async () => {
    if (!email) {
      message.error("Email không được để trống!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await UseService.forgotPassword({ email });
      if (res?.status === 'OK') {
        setIsSent(true);
        message.success("Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư!");
      } else {
        message.error(res?.message || "Đã xảy ra lỗi, vui lòng thử lại!");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi hệ thống!");
    } finally {
      setIsLoading(false);
    }
 };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'rgba(0,0,0,0.53)' }}>
      <div style={{ width: '400px', padding: '20px', borderRadius: '6px', background: '#fff' }}>
        <h2>Quên mật khẩu</h2>
        <p>Nhập địa chỉ email để nhận hướng dẫn đặt lại mật khẩu.</p>
        <InputForm
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(value) => setEmail(value)}
          style={{ marginBottom: '20px' }}
        />
        <ButtonComponent
         onClick={handleForgotPassword}
          size={40}
          disabled={!email}
          isLoading={isLoading}
          styleButton={{
            background: 'rgb(255,57,69)',
            height: '40px',
            width: '100%',
            border: 'none',
            borderRadius: '4px',
          }}
          textButton="Gửi yêu cầu"
          styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '500' }}
        />
        {isSent && <p style={{ marginTop: '20px', color: 'green' }}>Email đã được gửi thành công!</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
