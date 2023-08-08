import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const initialState = {
  product: [],
  cart: [],
  totalHarga: 0,
};
export const ProductReducer = createSlice({
  name: "ProductReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      console.log("?", action.payload);
      const existCart = state.cart.findIndex((item) => item.id === id);
      if (existCart !== -1) {
        state.cart[existCart].quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      state.totalHarga += action.payload.harga_produk;
    },
    deleteFromCart: (state, action) => {
      const { id } = action.payload;
      const existCart = state.cart.findIndex((item) => item.id === id);
      if (existCart !== -1) {
        console.log("=>", state.cart[existCart].quantity);
        if (state.cart[existCart].quantity > 0) {
          state.cart[existCart].quantity -= 1;
          state.totalHarga -= action.payload.harga_produk;
        }
      }
    },
    deleteCart: (state, action) => {
      const { id } = action.payload;
      const existCart = state.cart.findIndex((item) => item.id === id);
      state.totalHarga -=
        action.payload.harga_produk * state.cart[existCart].quantity;
      state.cart.splice(existCart, 1);
    },
  },
});

export const payment = (totalPrice, carts, toast) => {
  return async () => {
    const token = localStorage.getItem("token");
    try {
      const respon = await axios.post(
        `${URL_API}/transaction-management/transaction`,
        { totalPrice },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const transactionId = respon.data.result.id;
      carts.forEach(async (item) => {
        try {
          const res = await axios.post(
            `${URL_API}/transaction-management/transaction/item`,
            { item, transactionId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      });
      toast({
        title: "Transaction Success",
        status: "success",
        description: "Data has been save in database",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
};

export const { addToCart, deleteFromCart, deleteCart } = ProductReducer.actions;
export default ProductReducer.reducer;
