import React, { useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined,SearchOutlined } from "@ant-design/icons";
import { WrapperHeader } from "./style";
import { Button, Modal, Form, Input, Checkbox, Descriptions, Space } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";

import * as OrderService from '../../services/OrderService'
import { useMutationHooks } from "../../hooks/UserMutationHooks";
import * as message from '../../components/Message/Message';
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import {useSelector} from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent';
import { orderContant } from "../../contant";
import PieChart from "./PieChart";
import PieChartComponent from "./PieChart";


const OrderAdmin = () => {
const user=useSelector((state)=>state?.user)

const getAllOrder = async () =>{
    const res=await OrderService.getAllOrder()
    return res
}
const queryOrder = useQuery({queryKey:['orders'],queryFn:getAllOrder})
const {isLoading:isLoadingUser, data:orders} = queryOrder
const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <InputComponent
        //ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        //onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
      />
      <Space>
        <Button
          type="primary"
          //onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          //onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? '#1677ff' : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//   filterDropdownProps: {
//     onOpenChange(open) {
//       if (open) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
 // },
});


const columns = [
  {
    title: 'User name',
    dataIndex: 'userName',
    sorter : (a,b)=> a.name.length - b.name.length,
    ...getColumnSearchProps('userName')
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    sorter : (a,b)=> a.phone.length - b.phone.length,
    ...getColumnSearchProps('phone')
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      sorter : (a,b)=> a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps('totalPrice')
      },
      {
        title: 'Paided',
        dataIndex: 'isPaid',
        sorter : (a,b)=> a.isPaid.length - b.isPaid.length,
        ...getColumnSearchProps('isPaid')
      },
      {
        title: 'Payment Method',
        dataIndex: 'paymentMethod',
        sorter : (a,b)=> a.paymentMethod.length - b.paymentMethod.length,
        ...getColumnSearchProps('paymentMethod')
      },
      {
        title: 'Shipped',
        dataIndex: 'isDelivered',
        sorter : (a,b)=> a.paymentMethod.length - b.paymentMethod.length,
        ...getColumnSearchProps('isDelivered')
      },
  
];

const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    return {...order ,key: order._id,userName:order?.shippingAddress?.fullName,phone:order?.shippingAddress?.phone,
        address:order?.shippingAddress?.address,paymentMethod:orderContant.payment[order?.paymentMethod],
        isPaid:order?.isPaid?'TRUE':'FALSE',isDelivered:order?.isDelivered?'TRUE':'FALSE'
    }}
  )  
  return (
    <div>
      <WrapperHeader>Quản lí đơn hàng</WrapperHeader>
      <div style={{height:'200px',width:'200px'}}>
      <PieChartComponent data={orders?.data}></PieChartComponent>
      </div>
      
      <div style={{ marginBottom: "20px" }}>
      {/* <Button type="primary" icon={<PlusOutlined />} onClick={exportToExcel}>
        Xuất Excel
      </Button> */}
    </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
    return {
      //onClick: (event) => {setRowSelected(record._id)}, 
    };
  }}/>
      </div>
    </div>
  );
};
export default OrderAdmin;
