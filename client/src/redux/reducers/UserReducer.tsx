// Path: ./src/redux/reducers/UserReducer.tsx

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../interfaces";
import UserApi from "../api/UserApi";

const initialState: UserState = { // initialState === state
  // Use for fetching users
  loadingGetUsers: false,
  users: [],
  errorGetUsers: null,

  // Use for saving or editing user
  loadingSaveUser: false,
  savedUser: null,
  errorSaveUser: null,

  // Use for deleting user
  loadingDeleteUser: false,
  successDeleteUser: null,
  errorDeleteUser: null,
};

export const getUsersThunk = createAsyncThunk(
  "getUsers",
  async (email: string, { rejectWithValue }) => {
    try {
      return (await UserApi.getUsers(email)).data;
    } catch (error: any) {
      if (error.response && error.response.data.message)
        return rejectWithValue(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const saveUserThunk = createAsyncThunk(
  "saveUser",
  async (user: User, { rejectWithValue }) => {
    try {
      return (await UserApi.saveUser(user)).data;
    } catch (error: any) {
      if (error.response && error.response.data.message)
        return rejectWithValue(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const editUserThunk = createAsyncThunk(
  "editUser",
  async (user: User, { rejectWithValue }) => {
    try {
      return (await UserApi.editUser(user)).data;
    } catch (error: any) {
      if (error.response && error.response.data.message)
        return rejectWithValue(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "deleteUser",
  async (email: string, { rejectWithValue }) => {
    try {
      return (await UserApi.deleteUser(email)).data; // <=> action
    } catch (error: any) {
      if (error.response && error.response.data.message) // <=> action
        return rejectWithValue(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

// slice <=> reducer
export const userSlice = createSlice({
  name: "user",
  initialState,

  // Luc dau chay web: 2 users
  // Them 1: 2 + 1 = 3 users
  // Cach 1: goi lai API getUsers() --> loading
  // Cach 2: addNewUser() -> ko load
  reducers: { // Xu ly dong bo | <=> actions
    addNewUser: (state, action) => {
      const updatedUserList = [ ...state.users, action.payload ]; // --> 3 users
      state.users = updatedUserList;
    },
    updateUser: (state, action) => {
      const updatedUserList = state.users.map((user) => {
        if (user.email === action.payload.email) return action.payload;
        return user;
      });
      state.users = updatedUserList;
    },
    deleteUser: (state, action) => {
      const updatedUserList = state.users.filter(
        (user) => user.email !== action.payload
      );
      state.users = updatedUserList;
    },
  },

  extraReducers: (builder) => { // Xu ly bat dong bo
    // Fetching users
    builder.addCase(getUsersThunk.pending, (state) => {
      state.loadingGetUsers = true;
      state.users = [];
      state.errorGetUsers = null;
    });
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.loadingGetUsers = false;
      state.users = action.payload;
      state.errorGetUsers = null;
    });
    builder.addCase(getUsersThunk.rejected, (state, action) => {
      state.loadingGetUsers = false;
      state.users = [];
      state.errorGetUsers =
        action.payload !== undefined ? action.payload : null;
    });

    // Save user
    builder.addCase(saveUserThunk.pending, (state, action) => {
      state.loadingSaveUser = true;
      state.savedUser = null;
      state.errorSaveUser = null;
    });
    builder.addCase(saveUserThunk.fulfilled, (state, action) => {
      state.loadingSaveUser = false;
      state.savedUser = action.payload;
      state.errorSaveUser = null;
    });
    builder.addCase(saveUserThunk.rejected, (state, action) => {
      state.loadingSaveUser = false;
      state.savedUser = null;
      state.errorSaveUser =
        action.payload !== undefined ? action.payload : null;
    });

    // Edit user
    builder.addCase(editUserThunk.pending, (state, action) => {
      state.loadingSaveUser = true;
      state.savedUser = null;
      state.errorSaveUser = null;
    });
    builder.addCase(editUserThunk.fulfilled, (state, action) => {
      state.loadingSaveUser = false;
      state.savedUser = action.payload;
      state.errorSaveUser = null;
    });
    builder.addCase(editUserThunk.rejected, (state, action) => {
      state.loadingSaveUser = false;
      state.savedUser = null;
      state.errorSaveUser =
        action.payload !== undefined ? action.payload : null;
    });

    // Delete user
    builder.addCase(deleteUserThunk.pending, (state, action) => {
      state.loadingDeleteUser = true;
      state.successDeleteUser = null;
      state.errorDeleteUser = null;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.loadingDeleteUser = false;
      state.successDeleteUser = action.payload;
      state.errorDeleteUser = null;
    });
    builder.addCase(deleteUserThunk.rejected, (state, action) => {
      state.loadingDeleteUser = false;
      state.successDeleteUser = null;
      state.errorDeleteUser =
        action.payload !== undefined ? action.payload : null;
    });
  },
});

export const { addNewUser, updateUser, deleteUser } = userSlice.actions; // <=> reducers
export default userSlice.reducer;
