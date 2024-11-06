import axios from 'axios'


export const loginUser = async (data) =>{
    console.log(process.env.REACT_APP_API_URL_BACKEND)
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sign-in`, data);
    return res.data;
}

export const signupUser = async (data) =>{
    console.log(process.env.REACT_APP_API_URL_BACKEND)
    const res = await axios.post(`${process.env.REACT_APP_API_URL_BACKEND}/user/sign-up`, data);
    return res.data;
}