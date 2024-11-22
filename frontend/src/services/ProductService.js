import axios from "axios";

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

