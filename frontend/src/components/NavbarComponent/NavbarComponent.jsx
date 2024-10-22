import React from "react";
import { WrapperContent, WrapperLableText, WrapperPrice, WrapperTextValue } from "./style";
import { Checkbox } from 'antd';
import {Rate} from 'antd';

const NavbarComponent = () => {
  const onChange = () => {

  }

  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
                return (
              <WrapperTextValue>{option}</WrapperTextValue>
            );
        })
       case 'checkbox':
        return <Checkbox.Group style={{ width: '100%', display:'flex', flexDirection:'column', gap:'12px' }} onChange={onChange}>
           {options.map((option)=>{
                return (
                   <Checkbox style={{marginLeft: 0}} value={option.value}>{option.lable}</Checkbox>
                )
           })

           }
      </Checkbox.Group>
      case 'star':
        return options.map((option) => {
          console.log('check',option)
          return (
            <div style={{display:'flex', gap: '4px'}}>
            <Rate style={{fontSize:'12px'}} disabled defaultValue={option} />
            <span>tu {option} sao</span>
            </div>
      );
      })
      case 'price':
        return options.map((option) => {
         
          return (
            <WrapperPrice>
            {option}
            </WrapperPrice>
      );
      })

        default:
        return {};
    }
  };
  return (
    <div>
      <WrapperLableText>Label</WrapperLableText>
      <WrapperContent>
        {renderContent("text", ["Tu lanh", "TV", "May giat"])}
        {renderContent("checkbox", [
            {value:'a', lable: 'A'},
            {value:'b', lable: 'B'}
        ])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("star", [3,4,5])}
      </WrapperContent>
      <WrapperContent>
        {renderContent("price", ['Duoi 40000','Tren 50000'])}
      </WrapperContent>

    </div>
  );
};

export default NavbarComponent;
