import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';

const DefaultPage = ({children}) => {
  return (
    <div>
      <HeaderComponent/>
      {children}
    </div>
  );
};

export default DefaultPage;