import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  name: '',
  email:'',
  phone:'',
  address:'',
  avatar:'',
  id:'',
  access_token:'',
  isAdmin:false,
  city:''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser:(state, action) => {
      const {name = '', email= '', address= '',phone= '', avatar= '', access_token= '', _id='', isAdmin, city=''} = action.payload;
      console.log(action)
      state.name =name;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.id = _id;
      state.avatar = avatar;
      state.access_token=access_token;
      state.isAdmin=isAdmin;
      state.city=city;
    },
    resetUser:(state) => {
      state.name = '';
      state.email = '';
      state.address = '';
      state.phone = '';
      state.id='';
      state.avatar = '';
      state.access_token='';
      state.isAdmin=false;
      state.city='';

    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer