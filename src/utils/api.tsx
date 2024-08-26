import axios from "axios";
import { User } from "./interface";

export const fetchUserApi = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response?.data;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

export const fetchUserImage = async () => {
  try {
    const response = await axios.get(
      "https://picsum.photos/v2/list?page=1&size=10"
    );
    return response?.data;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

export const postUserApi = async (payload: User) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/users",
      payload
    );
    return response?.data;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

export const updateUserApi = async (payload: User) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/api/users/${payload.id}`,
      payload
    );
    return response?.data;
  } catch (err) {
    console.log({ err });
    return err;
  }
};

export const deleteUserApi = async (payload: User) => {
  try {
    await axios.delete(`http://localhost:3001/api/users/${payload.id}`);
    return payload;
  } catch (err) {
    console.log({ err });
    return err;
  }
};
