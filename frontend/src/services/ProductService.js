import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async () => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/product/getAll`
    );
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

