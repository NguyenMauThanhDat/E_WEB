import React from 'react';
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ButtonComponent = ({size, styleButton, styleTextButton,textButton, disabled,...rests}) => {
  return (
    <Button
        style={{
          ...styleButton,
          background: disabled ? '#ccc' : styleButton.background}}
        size={size}
        
        // icon={<SearchOutlined style={{color : colorButton }}/>}
        
        {...rests}
      >
       <span style={styleTextButton}>{textButton}</span> 
      </Button>
  );
};

export default ButtonComponent;