import React, { useState } from 'react';
import { Divider, Dropdown, Radio, Space, Table } from 'antd';
import {DownOutlined, SettingOutlined} from '@ant-design/icons'


const TableComponent = (props) =>{
    const {selectionType='checkbox', data=[], columns=[], handleDeleteMany} = props;
    const [rowSelectedKey, setRowSelectedKey] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          setRowSelectedKey(selectedRowKeys)
          console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
      //   {
      //     key: '1',
      //     label: 'My Account',
      //     disabled: true,
      //   },
      //   {
      //     type: 'divider',
      //   },
      //   {
      //     key: '2',
      //     label: 'Profile',
      //     extra: '⌘P',
      //   },
      //   {
      //     key: '3',
      //     label: 'Billing',
      //     extra: '⌘B',
      //   },
      //   {
      //     key: '4',
      //     label: 'Settings',
      //     icon: <SettingOutlined />,
      //     extra: '⌘S',
      //   },
      // ];
      const handleDeleteAll = () =>{
        handleDeleteMany(rowSelectedKey)
      }
      return(
        <div>   
        {rowSelectedKey.length > 0 &&(
         <div style={{background:'#1d1ddd',color:'#fff',fontWeight:'bold',padding:'10px',cursor:'pointer'}} onClick={handleDeleteAll}>
          Xóa tất cả
        </div>)} 
       
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
        </div>
    )
}

export default TableComponent