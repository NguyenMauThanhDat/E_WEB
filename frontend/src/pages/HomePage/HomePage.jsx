import React from "react";
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

const HomePage = () => {
  const arr = ["TV", "Tu", "May", "Giat"];
  const fetchProductAll = async () =>{
   const res= await ProductService.getAllProduct()
   console.log('res',res)
   return res;
  }
  //const {isLoading, data:products} = useQuery(['products'], fetchProductAll, {retry:3, retryDeplay:1000})
  const { isLoading, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  });
  
  console.log('data',products)
  return (
    <>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProduct name={item} key={item} />;
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
            {products?.data?.map((product)=>{
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
                 discount={product.discount}/>
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
              textButton="Xem them"
              type="outline"
              styleButton={{
                border: "1px solid rgb(11,116,229)",
                color: "rgb(11,116,229 ",
                width: "240px",
                height: "38px",
                borderRadius: "4px",
              }}
              styleTextButton={{ fontWeight: 500 }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
