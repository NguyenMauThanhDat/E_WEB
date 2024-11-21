import React, { useState } from "react";
import {PlusOutlined} from '@ant-design/icons'
import { WrapperHeader } from "./style";
import { Button, Modal, Form, Input, Checkbox, Descriptions } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";

const AdminProduct = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct,setStateProduct] = useState({
         name:'',
         price:'',
         descriptions:'',
         rating:'',
         image:'',
         type:'',
         countInSTock:'',
    })
    const handleOk = () =>{
      onFinish()
    }
    const handleCancel = () => {
        setIsModalOpen(false);
      };
      const onFinish = () => {
        console.log('Success:', stateProduct);
      };
      const handleOnChange = (e) =>{
        setStateProduct({
          ...stateProduct,
          [e.target.name]: e.target.value
        })
      }
    return(
        <div>
            <WrapperHeader>Quản lí sản phẩm</WrapperHeader>
            <div style={{marginTop:'10px'}}>
            <Button style={{height:'150px', width:'150px', borderRadius:'6px', borderStyle:'dashed'}} onClick={()=>setIsModalOpen(true)}><PlusOutlined style={{fontSize:'60px'}}/></Button>
            </div>
            <div style={{marginTop:'20px'}}>
            <TableComponent />
            </div>
            <Modal title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} okText="">
            <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish ={onFinish}
    autoComplete="off"
  >
    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
      ]}
    >
      <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
    </Form.Item>

    <Form.Item
      label="Type"
      name="type"
      rules={[
        {
          required: true,
          message: 'Please input your type!',
        },
      ]}
    >
      <InputComponent value={stateProduct.type} onChange={handleOnChange} name="type"/>
    </Form.Item>

    <Form.Item
      label="CountInStock"
      name="countInStock"
      rules={[
        {
          required: true,
          message: 'Please input your count in stock!',
        },
      ]}
    >
      <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock"/>
    </Form.Item>

    <Form.Item
      label="Price"
      name="price"
      rules={[
        {
          required: true,
          message: 'Please input your price!',
        },
      ]}
    >
      <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price"/>
    </Form.Item>

    <Form.Item
      label="Description"
      name="description"
      rules={[
        {
          required: true,
          message: 'Please input your description!',
        },
      ]}
    >
      <InputComponent value={stateProduct.descriptions} onChange={handleOnChange} name="descriptions"/>
    </Form.Item>


    <Form.Item
      label="Rating"
      name="rating"
      rules={[
        {
          required: true,
          message: 'Please input your count rating!',
        },
      ]}
    >
      <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Modal>
        </div>
    )
}

export default AdminProduct