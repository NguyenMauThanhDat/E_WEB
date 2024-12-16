import { axiosJWT } from "./UserService";

export const createOrder = async ( data, access_token) => {
    const res = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/create`, data,{
            headers: {
                Authorization: `Bearer ${access_token}`, 
            },
        }
    );
    return res.data;
};

export const getOrderByUserId = async ( id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/getAllOrder/${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`, 
            },
        }
    );
    return res.data;
};

export const getOrderDetail = async ( id, access_token) => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/getDetailOrder/${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`, 
            },
        }
    );
    return res.data;
};

export const cancelOrder = async ( id, access_token, orderItem) => {
    const res = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/cancelOrder/${id}`,{data:orderItem}
    );
    return res.data;
};

export const getAllOrder = async () => {
    const res = await axiosJWT.get(
        `${process.env.REACT_APP_API_URL_BACKEND}/order/getAllOrder/`
    );
    return res.data;
};