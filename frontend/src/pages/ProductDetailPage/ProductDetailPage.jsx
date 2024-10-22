import React from 'react';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';

const ProductDetailPage = () => {
  return (
    <div style={{padding:'0 120px', background:'#efefef', height:'1000px'}}>
        <h5>Trang chủ</h5>
        <div style={{display:'flex', background:'#fff'}}>
        <ProductDetailComponent/>
        </div>
    </div>
  );
};

export default ProductDetailPage;