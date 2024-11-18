import React, { useState } from 'react';
import { AppstoreOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

const AdminPage = () => {
    const items = [
        {
          key: 'sub1',
          label: 'Người dùng',
          icon: <UserOutlined />,
          children: [
            {
              key: '1',
              label: 'Option 1',
            },
            {
              key: '2',
              label: 'Option 2',
            },
            {
              key: '3',
              label: 'Option 3',
            },
            {
              key: '4',
              label: 'Option 4',
            },
          ],
        },
        {
          key: 'sub2',
          label: 'Sản phẩm',
          icon: <AppstoreOutlined />,
          children: [
            {
              key: '5',
              label: 'Option 5',
            },
            {
              key: '6',
              label: 'Option 6',
            },
            {
              key: 'sub3',
              label: 'Submenu',
              children: [
                {
                  key: '7',
                  label: 'Option 7',
                },
                {
                  key: '8',
                  label: 'Option 8',
                },
              ],
            },
          ],
        },
        {
          key: 'sub4',
          label: 'Navigation Three',
          icon: <SettingOutlined />,
          children: [
            {
              key: '9',
              label: 'Option 9',
            },
            {
              key: '10',
              label: 'Option 10',
            },
            {
              key: '11',
              label: 'Option 11',
            },
            {
              key: '12',
              label: 'Option 12',
            },
          ],
        },
      ];
   const [theme, setTheme] = useState('light');
  const [current, setCurrent] = useState('1');
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light');
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
        }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
      <div style={{flex: 1}}>
        <span>test</span>
      </div>
        </div>
    </>
    )
}

export default AdminPage;