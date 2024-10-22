import React from 'react';
import  Slider from 'react-slick';
import {Image} from 'antd';
import slider from 'react-slick/lib/slider';
import {WrapperSliderStyle} from './style'

const SliderComponent = ({arrImages}) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed:1000, 
        autoplay: true
      };
  return (
    <WrapperSliderStyle {...settings}>
        {arrImages.map((image) => {
        return (
          <Image src={image} alt={slider} preview="false" width="100%" height="274px"/>
        );
      })}
    </WrapperSliderStyle>
  );
};

export default SliderComponent;
