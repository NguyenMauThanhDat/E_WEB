import axios from 'axios';
import { useEffect } from 'react';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./Routes";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import {useQuery} from '@tanstack/react-query'

function App() {
  // useEffect(()=>{
  //   fetchAPI()
  // },[])

  const fetchAPI  = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/api/product/getAll`);
      return res.data
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error.message);
    }
  };
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchAPI})
  console.log(query)

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader
              ? DefaultComponent
              : React.Fragment;
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
