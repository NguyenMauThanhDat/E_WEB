import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (search,limit) => {
    let res=[]
    if(search?.length>0){
        res = await axios.get(
            `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll?filter=name&filter=${search}`
        );
    }
    else{
        res = await axios.get(
            `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll?limit=${limit}`
        );
    }
    return res.data;
};

export const createProduct = async (data) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/create`,data
    );
    return res.data;
};

export const getDetailsProduct = async (id) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/get-detail/${id}`
    );
    return res.data;
};

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/update/${id}`, data,{
            headers: {
                Authorization: `Bearer ${access_token}`, 
            },
        }
    );
    return res.data;
};

export const deleteProduct = async (id, access_token) => {
    const res = await axios.delete(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/delete/${id}`,{
            headers: {
                Authorization: `Bearer ${access_token}`, 
            },
        }
    );
    return res.data;
};

export const deleteManyProduct = async (data, access_token) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/delete-many`,data,{
            headers: {
                Authorization: `Bearer ${access_token}`, 
            },
        }
    );
    return res.data;
};

export const getAllTypeProduct = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/get-all-type`
    );
    return res.data;
};
