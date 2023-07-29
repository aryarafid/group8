import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    username: "",
    email: "",
    role: "",
    isActive: false,
    imgProfile: "",
  },
  login: false,
};
export const AuthReducer = createSlice({
  name: "AuthReducer",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, role, isActive, imgProfile } =
        action.payload;
      state.user = {
        id,
        username,
        email,
        role,
        isActive,
        imgProfile,
      };
    },
    userLogin: (state) => {
      state.login = true;
    },
    // userLogout: (state, action) => {
    //   state.login = false;
    //   localStorage.removeItem("token");
    // },
  },
});

export const loginAuth = (values, toast) => {
  return async (dispatch) => {
    try {
      console.log("=>", values);
      const respon = await axios.post(
        "http://localhost:8000/mini-project/api/auth/login",
        {
          username: values.username,
          password: values.password,
        }
      );
      console.log("ini datanya =>", respon);
      const token = respon.data.token;
      console.log("data user", respon.data.user)
      console.log("apakah role masuk?", respon.data.role);
      localStorage.setItem("token", token);
      dispatch(userLogin());
      dispatch(setUser(respon.data.isAccountExist));

      //   toast({
      //     title: "Login Success",
      //     status: "success",
      //     duration: 3000,
      //     isClosable: true,
      //   });
      //   setTimeout(() => {
      //     // window.location.reload();
      //     document.location.href = "/";
      //   }, 350);
    } catch (error) {
      console.log("ini error", error);
      //   toast({
      //     title: "Login Failed",
      //     description: "Account Not Verify",
      //     status: "error",
      //     duration: 3000,
      //     isClosable: true,
      //   });
    }
  };
};

export const { userLogin, setUser } = AuthReducer.actions;
export default AuthReducer.reducer;
