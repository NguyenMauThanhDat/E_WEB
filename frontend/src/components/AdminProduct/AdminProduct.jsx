import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { WrapperHeader } from "./style";
import { Button, Modal, Form, Input, Checkbox, Descriptions } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../../pages/Profiles/style";
import { getBase64 } from "../../utils";
import * as ProductService from '../../services/ProductService'
import { useMutationHooks } from "../../hooks/UserMutationHooks";
import * as message from '../../components/Message/Message';
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import {useSelector} from 'react-redux'


const AdminProduct = () => {
  const [form] =Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const user=useSelector((state)=>state?.user)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [stateProduct, setStateProduct] = useState({
    name: "",
    price: "",
    descriptions: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
  });
  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    price: "",
    descriptions: "",
    rating: "",
    image: "",
    type: "",
    countInStock: "",
  });

  const mutation = useMutationHooks(
    (data) =>{
      const { name, price, descriptions,rating, image, type,countInStock}= data
      ProductService.createProduct({name, price, descriptions,rating, image, type,countInStock})
    } 
)

const mutationUpdate = useMutationHooks(
  (data) =>{
    console.log(data)
    const { id, token, ...rests}= data
   const res= ProductService.updateProduct(id, token, rests)
   return res
  } 
)

const getAllProducts = async () =>{
   const res= await ProductService.getAllProduct()
   return res;
}

const fetchGetDetailsProduct = async (rowSelected) =>{
  try{
    const res= await ProductService.getDetailsProduct(rowSelected)
    if(res?.data){
      setStateProductDetails({
        name: res?.data?.name,
      price: res?.data?.price,
      descriptions: res?.data?.description,
      rating: res?.data?.rating,
      image: res?.data?.image,
      type: res?.data?.type,
      countInStock: res?.data?.countInStock,
      })
    }
  } catch(error) {
    console.error("Error fetching product details:", error);
    message.error("Sản phẩm không tồn tại hoặc xảy ra lỗi!");
}
  
}

useEffect(() => {
  if (stateProductDetails) {
    form.setFieldsValue(stateProductDetails);
  }
}, [stateProductDetails, form]);

useEffect(()=>{
   if(rowSelected){
    fetchGetDetailsProduct(rowSelected)
   }
}, [rowSelected])

console.log('stateProduct', stateProductDetails);
const handleDetailsProduct = () => {
  if (rowSelected) {
    fetchGetDetailsProduct(rowSelected); // Truyền rowSelected
  } 
  setIsOpenDrawer(true);
};
const {isLoading:isLoadingProducts, data:products} = useQuery({queryKey:['products'],queryFn:getAllProducts})
const renderAction = () =>{
  return(
    <div>
      <DeleteOutlined style={{color:'red', fontSize:'18px', cursor:'pointer'}} />
      <EditOutlined style={{color:'yellow', fontSize:'18px', cursor:'pointer'}} onClick={handleDetailsProduct}/>
    </div>
  )
}
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Rating',
    dataIndex: 'rating',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: renderAction,
  }
];
const dataTable = products?.data?.length && products?.data?.map((product) => {
  return {...product,key: product._id}
})
  const handleOk = () => {
    onFinish();
  };

  const {data, isLoading, isSuccess, isError} =mutation
  const {data: dataUpdated, isSuccess:isSuccessUpdated, isError:isErrorUpdated} =mutationUpdate

  useEffect(() => {
    if(isSuccess&&data?.status==='OK'){
      message.success()
      handleCancel()
    } else if (isError){
      message.error()
    }
  },[isSuccess])

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Cập nhật sản phẩm thành công!');
    } else if (isErrorUpdated) {
      message.error('Cập nhật sản phẩm thất bại!');
    }
  }, [isSuccessUpdated, isErrorUpdated, dataUpdated]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({name: "",
      price: "",
      descriptions: "",
      rating: "",
      image: "",
      type: "",
      countInStock: ""})
    form.resetFields();
  };
  
  const onFinish = () => {
    mutation.mutate(stateProduct)
    console.log("Success:", stateProduct);
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file && file.originFileObj) {
      try {
        const preview = await getBase64(file.originFileObj);
        setStateProduct({...stateProduct,image: preview}); // Set ảnh lên state
      } catch (error) {
        console.error("Lỗi khi xử lý file ảnh:", error);
      }
    }
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (file && file.originFileObj) {
      try {
        const preview = await getBase64(file.originFileObj);
        setStateProductDetails({...stateProductDetails,image: preview}); // Set ảnh lên state
      } catch (error) {
        console.error("Lỗi khi xử lý file ảnh:", error);
      }
    }
  };
  console.log(user)

  const onUpdateProduct = () =>{
     mutationUpdate.mutate({id:rowSelected,token:user?.access_token, ...stateProductDetails})
  }
  
  return (
    <div>
      <WrapperHeader>Quản lí sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableComponent columns={columns} data={dataTable} onRow={(record, rowIndex) => {
    return {
      onClick: (event) => {setRowSelected(record._id)}, 
    };
  }}/>
      </div>
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          // initialValues={{
          //   remember: false,
          // }}
          onFinish={onFinish}
          autoComplete="off"
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
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your type!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.type}
              onChange={handleOnChange}
              name="type"
            />
          </Form.Item>

          <Form.Item
            label="CountInStock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input your count in stock!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="descriptions"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.descriptions}
              onChange={handleOnChange}
              name="descriptions"
            />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input your count rating!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.rating}
              onChange={handleOnChange}
              name="rating"
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
          >
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button>Select File</Button>
            </WrapperUploadFile>
            {stateProduct?.image&&(
            <img src={stateProduct?.image} style={{height:'60px', width:'60px', borderRadius:'50%', objectFit:'cover', marginLeft:'10px'}} alt='avatar'/>
          )}
          </Form.Item>

          <Form.Item wrapperCol={{offset:20, span:16}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <DrawerComponent title="Chi tiết sản phẩm"  isOpen={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)} width="90vw"> 
      <Form
          name="Chi tiết sản phẩm"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onUpdateProduct}
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
              value={stateProductDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your type!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.type}
              onChange={handleOnChangeDetails}
              name="type"
            />
          </Form.Item>

          <Form.Item
            label="CountInStock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input your count in stock!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.countInStock}
              onChange={handleOnChangeDetails}
              name="countInStock"
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.price}
              onChange={handleOnChangeDetails}
              name="price"
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="descriptions"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.descriptions}
              onChange={handleOnChangeDetails}
              name="descriptions"
            />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input your count rating!",
              },
            ]}
          >
            <InputComponent
              value={stateProductDetails.rating}
              onChange={handleOnChangeDetails}
              name="rating"
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
          >
            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
              <Button>Select File</Button>
            </WrapperUploadFile>
            {stateProductDetails?.image&&(
            <img src={stateProductDetails?.image} style={{height:'60px', width:'60px', borderRadius:'50%', objectFit:'cover', marginLeft:'10px'}} alt='avatar'/>
          )}
          </Form.Item>

          <Form.Item wrapperCol={{offset:20, span:16}}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
        
      </DrawerComponent>
    </div>
  );
};

export default AdminProduct;
