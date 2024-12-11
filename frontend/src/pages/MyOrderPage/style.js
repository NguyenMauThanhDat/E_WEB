import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
background:rgb(255,255,255);
padding: 9px 16px;
border-radius: 4px;
display: flex;
align-items: center;
span{
  color: rgb(26,26,26);
  font-weight:400;
  font-size:13px;
}
`
export const WrapperStyleHeaderDilivery = styled.div`
background:rgb(255,255,255);
padding: 9px 16px;
border-radius: 4px;
display: flex;
align-items: center;
span{
  color: rgb(26,26,26);
  font-weight:400;
  font-size:13px;
}
  margin-bottom:4px;
`

export const WrapperLeft =styled.div`
 width: 910px;
`
export const WrapperListOrder =styled.div`
`
export const WrapperItemOrder =styled.div`
display:flex;
align-items:center;
padding: 9px 16px;
background:#fff;
margin-top:12px;
flex-direction:column;
width:950px;
margin:0 auto;
border-radius:6px;
box-shadow:0 12px 12px #ccc;
`

export const WrapperRight =styled.div`
width:320px;
margin-left:20px;
display:flex;
flex-direction:column;
gap:10px
align-items:center;
`
export const WrapperInfor =styled.div`
padding:17px 20px;
border-bottom:1px solid #f5f5f5;
background: #fff;
border-top-right-radius:6px;
border-top-left-radius:6px;
width:100%;
`

export const WrapperContainer = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 1270px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background-color:"f5f5f5";
`;

export const WrapperStatus = styled.div`
 display: flex;
 align-items: flex-start;
  width:100%;
  margin-bottom:10px;
  padding-bottom:10px:10px;
  border-bottom:1px solid rgb(235,235,240);
  flex-direction:column;
`;

export const WrapperFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  align-items: flex-end;
  border-top:1px solid rgb(235,235,240);
`;