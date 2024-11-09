import axios from 'axios'

//export const axiosJWT = axios.create()

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

// export const getDetailUser = async (id, access_token) =>{
//     console.log(process.env.REACT_APP_API_URL_BACKEND)
//     const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/user/get-detail/${id}`, {
//         headers:{
//             token:`Bearer ${access_token}`,
//         }
//     });
//     return res.data;
// }

export const getDetailUser = async (id, access_token) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/user/get-detail/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`, 
            },
        });

        return res.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error.message);
        throw error; 
    }
};

// export const refreshToken = async () => {
//     try {
//         console.log(process.env.REACT_APP_API_URL_BACKEND);
//         const res = await axios.post(
//             `${process.env.REACT_APP_API_URL_BACKEND}/user/refresh-token`,
//             { withCredentials: true }
//         );
//         return res.data;
//     } catch (error) {
//         console.error("Lỗi khi lấy thông tin người dùng:", error.message);
//         throw error; 
//     }
// };
