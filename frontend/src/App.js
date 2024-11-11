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
import {useDispatch} from 'react-redux'
import { updateUser } from './redux/slice/userSlide';

function App() {
   useEffect(()=>{
      let storageData=localStorage.getItem('access_token')
      if(storageData && isJsonString(storageData)){
         storageData =JSON.parse(storageData)
         const decoded=jwtDecode(storageData)
         if(decoded?.id){
            handleGetDetailUser(decoded?.id,storageData)
         }
      }
      console.log(storageData)
   },[])
   
  const dispatch = useDispatch()
  const handleGetDetailUser = async (id, token) => {
      const res = await UseService.getDetailUser(id, token)
      dispatch(updateUser({...res?.data,access_token:token}))
  }
  

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
            const Layout = route.isShowHeader ? DefaultComponent : React.Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
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
 