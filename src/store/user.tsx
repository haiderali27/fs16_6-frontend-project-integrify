import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
import { User } from "../types/types";



export const createUser = createAsyncThunk(
    'users/createUser', 
    async (userData:{name: string, email:string, password: string, avatar: string, role:string}) => {
    const exists = await axios.post(`${BASE_URL}/users/is-available`, JSON.stringify({email: userData.email}), {
            headers: {
              'Content-Type': 'application/json',
            },
        });     
    const avail: isAvail = exists.data;
    if(avail.isAvailable){
        return null
    }else{

    const createResponse = await axios.post(`${BASE_URL}/users/`, JSON.stringify(userData), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
    const tokenResponse = await axios.post(`${BASE_URL}/auth/login`, JSON.stringify({email:userData.email, password:userData.password}), {
            headers: {
              'Content-Type': 'application/json',
            },
    });

        sessionStorage.setItem("tokens", JSON.stringify(tokenResponse.data));
        sessionStorage.setItem("user", JSON.stringify(createResponse.data));
        sessionStorage.setItem("loggedIn", 'true');

      return createResponse.data;;
    }
  });

  export const login = createAsyncThunk(
    'users/login', 
    async (userData:{email:string, password: string}) => {


    
    const tokenResponse = await axios.post(`${BASE_URL}/auth/login`, JSON.stringify({email:userData.email, password:userData.password}), {
            headers: {
              'Content-Type': 'application/json',
            },
    });

        let tokens: tokens = tokenResponse.data;
        sessionStorage.setItem("tokens", JSON.stringify(tokenResponse.data)); 

          const response = await axios.get(`${BASE_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${tokens.access_token}`,
            },
          });
          sessionStorage.setItem("user", JSON.stringify(response.data));
          sessionStorage.setItem("loggedIn", 'true');

          
      return response.data;;
    
  });
 
interface isAvail{
    isAvailable: boolean
}

interface tokens{
  access_token: string,
  refresh_token: string
}

interface UserTokens{
  tokens: null | tokens;
}
const initialUser:User =  {
    currentUser: JSON.parse(sessionStorage.getItem('user') || 'null')
};
const initialTokens:UserTokens =  {
   tokens: JSON.parse(sessionStorage.getItem('tokens') || 'null')
};
const initialLoggedState:Boolean = sessionStorage.getItem('loggedIn')==='true'

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser:initialUser,
        tokens:initialTokens,
        loggedIn:initialLoggedState,
        isLoading: false,
        error: {},
    },
    reducers: {
        logoutUser: (state) => {
            state.currentUser.currentUser = null;
            state.tokens.tokens = null;
            state.loggedIn = false;
            sessionStorage.removeItem("loggedIn");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("tokens");
          },
        
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createUser.fulfilled, (state, { payload }) => {
            state.currentUser.currentUser = payload;
            state.loggedIn = true;
            state.isLoading = false;
        });
        builder.addCase(createUser.rejected, (state) => {
            state.isLoading = false;
            state.error = "Register Failed";
        });
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, { payload }) => {
            state.currentUser.currentUser = payload;
            state.loggedIn = true;
            state.isLoading = false;
        });
        builder.addCase(login.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = "Login Failed";
        });
    }
});

export const { logoutUser } = userSlice.actions;


export default userSlice.reducer;