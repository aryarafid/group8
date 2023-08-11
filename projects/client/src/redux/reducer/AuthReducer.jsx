import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
const URL_API = process.env.REACT_APP_API_BASE_URL;

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
    userLogout: (state, action) => {
      state.login = false;
      localStorage.removeItem("token");
      setTimeout(() => {
        // window.location.reload();
        document.location.href = "/";
      }, 350);
    },
  },
});

export const loginAuth = (values, setLoading, toast) => {
  return async (dispatch) => {
    try {
      setLoading(true);
      console.log("=>", values);
      const respon = await axios.post(`${URL_API}/auth-management/auth/login`, {
        username: values.username,
        password: values.password,
      });
      console.log("ini datanya =>", respon);
      const token = respon.data.token;
      console.log("data user", respon.data.isAccountExist);
      console.log("apakah role masuk?", respon.data.isAccountExist.role);
      localStorage.setItem("token", token);
      dispatch(userLogin());
      dispatch(setUser(respon.data.isAccountExist));
      toast({
        title: "Login Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error?.response?.data?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
};

export const changeProfile = (photo, toast, setLoading) => {
  return async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("imgProfile", photo);
    try {
      setLoading(true);
      const respon = await axios.patch(
        `${URL_API}/auth-management/auth/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(respon);
      toast({
        title: "Change Profile Picture Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(true);
    }
  };
};

export const keepLogin = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.get(
        `${URL_API}/auth-management/auth/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("keeplogin", respon);
      dispatch(setUser(respon.data.findUser));
      dispatch(userLogin());
    } catch (error) {
      console.log(error);
    }
  };
};

export const { userLogin, userLogout, setUser } = AuthReducer.actions;
export default AuthReducer.reducer;
