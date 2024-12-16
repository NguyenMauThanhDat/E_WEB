import React, { useState } from 'react';
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';

const AdminPage = () => {
    const items = [
        {
          key: 'user',
          label: 'Người dùng',
          icon: <UserOutlined />,
        },
        {
          key: 'product',
          label: 'Sản phẩm',
          icon: <AppstoreOutlined />,
          
        },
        {
          key: 'order',
          label:'Đơn hàng',
          icon: <SettingOutlined />,
        },
      ];
   const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
  };
  
  const renderPage = () => {
    switch (current) {
      case 'user':
        return <AdminUser />; // Component được render khi chọn 'user'
      case 'product':
        return <AdminProduct />;
      case 'order':
        return <OrderAdmin />; // Placeholder, thay bằng component thực tế
      default:
        return <></>;
    }
  };
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

    return (
        <>
        <HeaderComponent isHiddenSearch isHiddenCard/>
        <div style={{display: 'flex'}}>
           <Menu
        theme={theme}
        onClick={onClick}
        style={{
          width: 256,
          boxShadow: '1px 1px 2px #ccc',
          height: '100vh',
        }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <div style={{flex: 1, padding:'15px'}}>
        {renderPage(current)}
      </div>
        </div>
    </>
    )
}

export default AdminPage;