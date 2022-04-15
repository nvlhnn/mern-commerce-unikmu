import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:5000/api/";

// const user = JSON.parse(localStorage.getItem("persist:root")) ? .user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser ? .accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = (token) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token,
    },
  });
};

export const deleteCart = async (token) => {
  try {
    await userRequest(token).delete("carts");
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (token, user, orderId) => {
  try {
    await userRequest(token).delete(`orders/${user.id}/${orderId}`);
  } catch (error) {
    console.log(error);
  }
};