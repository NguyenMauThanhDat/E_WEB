import React, { useEffect, useRef, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import H14 from "../../assets/image/H14.png";
import H15 from "../../assets/image/H15.png";
import H16 from "../../assets/image/H16.png";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { WrapperProduct } from "./style";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";

const HomePage = () => {
  const arr=['TV','MG']
  const searchProduct = useSelector((state)=>state?.product?.search)
  const [limit, setLimit]=useState(5)
  const [stateProducts, setStateProducts]=useState([])
  const [typeProduct, setTypeProduct]=useState([])
  const refSearch = useRef()

  const fetchProductAll = async (context) =>{
    const search=''
    const limit = context?.queryKey?.[1] || 5;
   const res= await ProductService.getAllProduct(search,limit)
   if(search.length>0||refSearch.current){
    setStateProducts(res?.data)
   }else{
    return res;
   }
  }
  //const {isLoading, data:products} = useQuery(['products'], fetchProductAll, {retry:3, retryDeplay:1000})
  useEffect(()=>{
     fetchProductAll(searchProduct)
  },[searchProduct])
  
  const { isLoading, data: products, isPreviousData } = useQuery({
    queryKey: ['products', limit, searchProduct],
    queryFn: ({ queryKey }) => {
      const [, limit, search] = queryKey;
      return ProductService.getAllProduct(search, limit);
    },
    retry: 3,
    retryDelay: 1000,
    keepPreviousData:true
  });

  useEffect(()=>{
     if(products?.data?.length>0){
        setStateProducts(products?.data)
     }
  },[products])
  
  const fetchAllTypeProduct = async () =>{
    const res=await ProductService.getAllTypeProduct()
    //console.log('res',res)
    // if(res?.data==='Ok'){
    //   setTypeProduct(res?.data)
    // }
    setTypeProduct(res?.data)
  }
  useEffect(()=>{
     fetchAllTypeProduct()
  },[])
  return (
    <>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {typeProduct.map((item) => {
            return(<TypeProduct name={item} key={item} />) 
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#efefef" }}
      >
        <div
          id="container"
          style={{ margin: "0 auto", height: "1000px", width: "1210px" }}
        >
          <SliderComponent arrImages={[H14, H15, H16]} />
          <WrapperProduct>
            {stateProducts?.map((product)=>{
              return (
                <CardComponent 
                key={product._id} 
                countInStock={product.countInStock} 
                description={product.description} 
                image={product.image}
                 name={product.name}
                 price={product.price}
                 rating={product.rating} 
                 type={product.type}
                 selled={product.selled}
                 discount={product.discount}
                 id={product._id}/>
              )
            })}
          </WrapperProduct>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <WrapperButtonMore
              textButton={isPreviousData?"Load more":'Xem thêm'}
              type="outline"
              styleButton={{
                border: "1px solid rgb(11,116,229)",
                color: `${products?.total===products?.data?.length ? '#ccc' : 'rgb(11,116,229)'}`,
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              disabled={products?.total===products?.data?.length||products?.totalPage===1}
              styleTextButton={{ fontWeight: 500, color: products?.total===products?.data?.length&&'#fff'}}
              onClick={() => setLimit((prev) => prev + 5)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
