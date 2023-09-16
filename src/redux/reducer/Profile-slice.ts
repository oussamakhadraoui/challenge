import { createSlice } from '@reduxjs/toolkit'

export interface initialState {
  FirstName:string
  LastName:string
  email:string
  Picture:string
  Links:{type:string|undefined,link:string|undefined}[]
}

const initialState: initialState = {
email:'',
FirstName:'',
LastName:'',
Picture:'',
Links:[]
}
const User = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload
    },
    setFirstName(state, action) {
      state.FirstName = action.payload
    },
    setLastName(state, action) {
      state.LastName = action.payload
    },
    setPicture(state, action) {
      state.Picture = action.payload
    },
    setLinks(state,action){
      state.Links=action.payload
    }
  },
})

export default User.reducer
export const {setEmail,setFirstName,setLastName,setPicture,setLinks } = User.actions
