import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { UserDto, UserDtoKeys } from "../../types/User.interface"; 
import { getDataFromLocalStorage } from "../../utils/checkLocalStorage";
interface UserState {
  user: UserDto | null;
  isLoading: boolean;
  error: string | null;
}   

const initialState: UserState = {
  user: getDataFromLocalStorage("user", null) ,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart(state) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<UserDto>) { 
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("views", "[]");
      state.isLoading = false;
    }, 
    changeInformationUser(state: UserState, action: PayloadAction<{key: UserDtoKeys, value: string}> ){ 
      if(state.user)  {
        const key = action.payload.key;
        state.user = {
            ...state.user,
            [key]: action.payload.value
        };
        localStorage.setItem("user", JSON.stringify(state.user));
      } 
    },
    registerSuccess(state) { 
      state.isLoading = false;
    },
    authFailure(state, action: PayloadAction<string>) {
      state.error = action.payload; 
      state.isLoading = false;
    }, 
    logOut(state) {
      state.user = null;
      localStorage?.removeItem("user");
      localStorage?.removeItem("cart");
      localStorage?.removeItem("views"); 
      localStorage?.removeItem("notifications");
      state.isLoading = false;
    }, 
  },
});

export default authSlice.reducer;

export const { authStart, loginSuccess, authFailure,changeInformationUser, logOut, registerSuccess } = authSlice.actions;  
export type RootAuthAction = 
  | typeof changeInformationUser
  | typeof authStart
  | typeof loginSuccess
  | typeof authFailure
  | typeof logOut;