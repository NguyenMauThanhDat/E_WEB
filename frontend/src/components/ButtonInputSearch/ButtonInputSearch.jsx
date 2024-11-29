import React from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => {
  const {
    size,
    placeholder,
    textButton,
    bordered,
    backgroundColorInput="#fff",
    backgroundColorButton="rgb(13,92,182",
    colorButton="#fff"
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <ButtonComponent
        size={size}
        // bordered={false}
        icon={<SearchOutlined color={colorButton} style={{color : "#fff" }}/>}
        styleButton={{ background: backgroundColorButton, border: !bordered && 'none'}}
        textButton={textButton}
        styleTextButton={{ color: colorButton}}
      >
       <span style={{color:colorButton}}>{textButton}</span> 
      </ButtonComponent>
    </div>
  );
};

export default ButtonInputSearch;
