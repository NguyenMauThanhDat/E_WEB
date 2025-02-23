// import axios from 'axios';
// import { useEffect } from 'react';
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { routes } from "./Routes";
// import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
// import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
// import {useQuery} from '@tanstack/react-query'

// function App() {
//   // useEffect(()=>{
//   //   fetchAPI()
//   // },[])

//   const fetchAPI  = async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/api/product/getAll`);
//       return res.data
//     } catch (error) {
//       console.error("Lỗi khi lấy dữ liệu:", error.message);
//     }
//   };
//   const query = useQuery({ queryKey: ['todos'], queryFn: fetchAPI})
//   console.log(query)

//   return (
//     <div>
//       <Router>
//         <Routes>
//           {routes.map((route) => {
//             const Page = route.page;
//             const Layout = route.isShowHeader
//               ? DefaultComponent
//               : React.Fragment;
//             return (
//               <Route
//                 key={route.path}
//                 path={route.path}
//                 element={
//                   <Layout>
//                     <Page />
//                   </Layout>
//                 }
//               />
//             );
//           })}
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;


import axios from 'axios';
import { useEffect } from 'react';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./Routes";
//import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useQuery } from '@tanstack/react-query';
import { isJsonString } from './utils';
//import {isJsonString} from './utils'
import { jwtDecode } from 'jwt-decode';
import * as UseService from './services/UserService';
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from './redux/slice/userSlide';

function App() {
   useEffect(()=>{
      const {storageData, decoded}=handleDecode()
         if(decoded?.id){
            handleGetDetailUser(decoded?.id,storageData)
         }
   },[])
   
  const dispatch = useDispatch()
  const user=useSelector((state)=>state.user)
  const handleGetDetailUser = async (id, token) => {
      const res = await UseService.getDetailUser(id, token)
      dispatch(updateUser({...res?.data,access_token:token}))
  }

  const handleDecode = () =>{
    let storageData=localStorage.getItem('access_token')
    let decoded={}
      if(storageData && isJsonString(storageData)){
         storageData =JSON.parse(storageData)
         decoded=jwtDecode(storageData)
      }
      return {decoded, storageData}
  }
  
  UseService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date();
    const { decoded } = handleDecode();
    if (decoded?.exp < currentTime.getTime() / 1000) {
      const data = await UseService.refreshToken();
      localStorage.setItem('access_token', data.access_token); // Lưu token mới vào localStorage
      config.headers['token'] = `Bearer ${data.access_token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  


  const fetchAPI = async () => {
    try {
      const token = localStorage.getItem("token"); // Lấy token từ localStorage

      // Kiểm tra nếu token không tồn tại
      if (!token) {
        throw new Error("Token không tồn tại");
      }

      const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/api/product/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
      });

      return res.data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message);
    }
  };

  const query = useQuery({ queryKey: ['todos'], queryFn: fetchAPI });
  console.log(query);

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const isCheckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;
            return (
              
              <Route
                key={route.path}
                path={isCheckAuth?route.path:undefined}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
 