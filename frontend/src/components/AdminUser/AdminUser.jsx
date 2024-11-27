import React, { useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, PlusOutlined,SearchOutlined } from "@ant-design/icons";
import { WrapperHeader } from "./style";
import { Button, Modal, Form, Input, Checkbox, Descriptions, Space } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { WrapperUploadFile } from "../../pages/Profiles/style";
import { getBase64 } from "../../utils";
import * as UserService from '../../services/UserService'
import { useMutationHooks } from "../../hooks/UserMutationHooks";
import * as message from '../../components/Message/Message';
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import {useSelector} from 'react-redux'
import ModalComponent from '../ModalComponent/ModalComponent';


const AdminUser = () => {
  const [form] =Form.useForm()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const user=useSelector((state)=>state?.user)
  const [isOpenDrawer, setIsOpenDrawer] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin:false,
    
  });
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin:false,
  });

 

const mutationUpdate = useMutationHooks(
  (data) =>{
    console.log(data)
    const { id, token, ...rests}= data
   const res= UserService.updateUser(id, {...rests}, token)
   return res
  } 
)
const mutationDelete = useMutationHooks(
  (data) =>{
    const { id, token}= data
   const res= UserService.deleteUser(id, token)
   return res
  } 
)
const mutationDeleteMany = useMutationHooks(
  (data) =>{
    const { token, ...ids}= data
   const res= UserService.deleteManyUser(ids, token)
   return res
  } 
)

const getAllUsers = async () =>{
   const res= await UserService.getAllUser()
   return res;
}

const fetchGetDetailsUser = async (rowSelected) =>{
  try{
    const res= await UserService.getDetailUser(rowSelected)
    if(res?.data){
      setStateUserDetails({
        name: res?.data?.name,
      email: res?.data?.email,
      phone: res?.data?.phone,
      isAdmin: res?.data?.isAdmin,
      })
    }
  } catch(error) {
    console.error("Error fetching product details:", error);
    message.error("Sản phẩm không tồn tại hoặc xảy ra lỗi!");
}
  
}

useEffect(() => {
  if (stateUserDetails) {
    form.setFieldsValue(stateUserDetails);
  }
}, [stateUserDetails, form]);

useEffect(()=>{
   if(rowSelected){
    fetchGetDetailsUser(rowSelected)
   }
}, [rowSelected])

const handleDetailsProduct = () => {
  if (rowSelected) {
    fetchGetDetailsUser(rowSelected); // Truyền rowSelected
  } 
  setIsOpenDrawer(true);
};
const queryUser = useQuery({queryKey:['users'],queryFn:getAllUsers})
const {isLoading:isLoadingUser, data:users} = queryUser
const renderAction = () =>{
  return(
    <div>
      <DeleteOutlined style={{color:'red', fontSize:'18px', cursor:'pointer'}} onClick={()=>setIsModalOpenDelete(true)}/>
      <EditOutlined style={{color:'yellow', fontSize:'18px', cursor:'pointer'}} onClick={handleDetailsProduct}/>
    </div>
  )
}
const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};
const handleReset = (clearFilters) => {
  clearFilters();
  setSearchText('');
};
const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div
      style={{
        padding: 8,
      }}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <InputComponent
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
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
  filterDropdownProps: {
    onOpenChange(open) {
      if (open) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  },
});


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter : (a,b)=> a.name.length - b.name.length,
    ...getColumnSearchProps('name')
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter : (a,b)=> a.email.length - b.email.length,
    ...getColumnSearchProps('email')
    },
  {
    title: 'Admin',
    dataIndex: 'isAdmin',
    filters:[
      {
        text:'true',
        value:true,
      },
      {
        text:'false',
        value:false,
      },
    ],  onFilter: (value, record) => record.isAdmin === (value ? "TRUE" : "FALSE"), // So sánh đúng định dạng

  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    sorter : (a,b)=> a.phone - b.phone,
    ...getColumnSearchProps('phone')
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: renderAction,
  }
];
const dataTable = users?.data?.length && users?.data?.map((user) => {
  return {...user ,key: user._id,name: user.name || "", // Thêm giá trị mặc định
    email: user.email || "",
    phone: user.phone || "", isAdmin: user.isAdmin ? 'TRUE' : 'FALSE'}}
)
  


  const {data: dataUpdated, isSuccess:isSuccessUpdated, isError:isErrorUpdated} =mutationUpdate
  const {data: dataDeleted, isSuccess:isSuccessDeleted, isError:isErrorDeleted} =mutationDelete
  const {data: dataDeletedMany, isSuccess:isSuccessDeletedMany, isError:isErrorDeletedMany} =mutationDeleteMany



 
  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Cập nhật người dùng thành công!');
    } else if (isErrorUpdated) {
      message.error('Cập nhật người dùng thất bại!');
    }
  }, [isSuccessUpdated, isErrorUpdated, dataUpdated]);
  
 useEffect(() => {
  if (isSuccessDeleted && dataDeleted?.status === "OK") {
    message.success("Xóa người dùng thành công!");
    handleCancelDelete();
  } else if (isErrorDeleted) {
    const errorMsg = dataDeleted?.message || "Xóa người dùng thất bại!";
    message.error(errorMsg);
  }
}, [isSuccessDeleted, isErrorDeleted, dataDeleted]);

useEffect(() => {
  if (isSuccessDeletedMany && dataDeletedMany?.status === "OK") {
    message.success("Xóa người dùng thành công!");
    handleCancelDelete();
  } else if (isErrorDeletedMany) {
    const errorMsg = dataDeletedMany?.message || "Xóa người dùng thất bại!";
    message.error(errorMsg);
  }
}, [isSuccessDeletedMany, isErrorDeletedMany, dataDeletedMany]);

  const handleCancelDelete = () =>{
    setIsModalOpenDelete(false)
  }

 const handleDeleteUser = () =>{
    mutationDelete.mutate({id: rowSelected, token: user?.access_token},{
      onSettled: () =>{
        queryUser.refetch()
      }
    })
 }

 const handleDeleteManyUser = (ids) => {
  mutationDeleteMany.mutate({ids, token: user?.access_token},{
    onSettled: () =>{
      queryUser.refetch()
    }
  })
}
  
  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  // const handleOnchangeAvatar = async ({ fileList }) => {
  //   const file = fileList[0];
  //   if (file && file.originFileObj) {
  //     try {
  //       const preview = await getBase64(file.originFileObj);
  //       setStateUser({...stateUser,image: preview}); // Set ảnh lên state
  //     } catch (error) {
  //       console.error("Lỗi khi xử lý file ảnh:", error);
  //     }
  //   }
  // };

  // const handleOnchangeAvatarDetails = async ({ fileList }) => {
  //   const file = fileList[0];
  //   if (file && file.originFileObj) {
  //     try {
  //       const preview = await getBase64(file.originFileObj);
  //       setStateUserDetails({...stateUserDetails,image: preview}); // Set ảnh lên state
  //     } catch (error) {
  //       console.error("Lỗi khi xử lý file ảnh:", error);
  //     }
  //   }
  // };

  const onUpdateUser = () =>{
     mutationUpdate.mutate({id:rowSelected,token:user?.access_token, ...stateUserDetails},{
      onSettled: () =>{
        queryUser.refetch()
      }
     })
  }
  
  return (
    <div>
      <WrapperHeader>Quản lí người dùng</WrapperHeader>
      <div style={{ marginTop: "20px" }}>
        <TableComponent handleDeleteMany={handleDeleteManyUser} columns={columns} data={dataTable} onRow={(record, rowIndex) => {
    return {
      onClick: (event) => {setRowSelected(record._id)}, 
    };
  }}/>
      </div>

      <DrawerComponent title="Thông tin người dùng"  isOpen={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)} onOk={handleDeleteUser} width="90vw"> 
      <Form
          name="Thông tin người dùng"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          onFinish={onUpdateUser}
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
              value={stateUserDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.email}
              onChange={handleOnChangeDetails}
              name="email"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetails.phone}
              onChange={handleOnChangeDetails}
              name="phone"
            />
          </Form.Item>

        {/* <Form.Item
            label="Image"
            name="image"
          >
            <WrapperUploadFile onChange={handleOnchangeAvatarDetails} maxCount={1}>
              <Button>Select File</Button>
            </WrapperUploadFile>
            {stateUserDetails?.image&&(
            <img src={stateUserDetails?.image} style={{height:'60px', width:'60px', borderRadius:'50%', objectFit:'cover', marginLeft:'10px'}} alt='avatar'/>
          )}
          </Form.Item> */}

          <Form.Item wrapperCol={{offset:20, span:16}}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
        
      </DrawerComponent>
      <ModalComponent
        forceRender
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <div>Bạn có chắc chắn muốn xóa không?</div>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
