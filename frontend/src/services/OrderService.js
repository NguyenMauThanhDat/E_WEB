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
        `${process.env.REACT_APP_API_URL_BACKEND}/order/getOrderDetail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`, 
            },
        }
    );
    return res.data;
};