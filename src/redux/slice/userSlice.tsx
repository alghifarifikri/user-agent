import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  deleteUserApi,
  fetchUserApi,
  fetchUserImage,
  postUserApi,
  updateUserApi,
} from "../../utils/api";
import { User, UserState } from "../../utils/interface";

export const fetchUsers = () => async (dispatch: any) => {
  dispatch(started());
  try {
    const response = await fetchUserApi();
    if (response) {
      const image = await fetchUserImage();
      const slice = image.slice(0, 10);
      const temp = response.map((item: any, index: number) => {
        const data = {
          ...item,
          image: slice[index]?.download_url + ".jpg",
        };
        return data;
      });
      for (const user of temp) {
        await dispatch(deleteUser(user));
        await dispatch(postUser(user));
      }
      dispatch(getUserSuccess(temp));
    }
  } catch (err: any) {
    console.log({ err });
    dispatch(failed(err.message));
  }
};

export const postUser = (payload: User) => async (dispatch: any) => {
  dispatch(started());
  try {
    const response = await postUserApi(payload);
    if (response) {
      dispatch(addUserSuccess(response));
    }
  } catch (err: any) {
    console.log({ err });
    dispatch(failed(err.message));
  }
};

export const updateUser = (payload: User) => async (dispatch: any) => {
  dispatch(started());
  try {
    const response = await updateUserApi(payload);
    console.log({ response });
    if (response) {
      dispatch(updateUserSuccess(response));
    }
  } catch (err: any) {
    console.log({ err });
    dispatch(failed(err.message));
  }
};

export const deleteUser = (payload: User) => async (dispatch: any) => {
  dispatch(started());
  try {
    await deleteUserApi(payload);
    dispatch(deleteUserSuccess(payload));
  } catch (err: any) {
    console.log({ err });
    dispatch(failed(err.message));
  }
};

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    started: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    addUserSuccess: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.loading = false;
      state.success = true;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      const { id, name, username, email, phone } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.name = name ?? user.name;
        user.username = username ?? user.username;
        user.email = email ?? user.email;
        user.phone = phone ?? user.phone;
      }
      state.loading = false;
      state.success = true;
    },
    deleteUserSuccess: (state, action: PayloadAction<User>) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
      state.loading = false;
      state.success = true;
    },
    failed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

// Export Actions and Reducer
export const {
  started,
  getUserSuccess,
  addUserSuccess,
  updateUserSuccess,
  deleteUserSuccess,
  failed,
  clear,
} = userSlice.actions;

export default userSlice.reducer;
