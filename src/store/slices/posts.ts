import { createSlice } from "@reduxjs/toolkit";
import { postSliceType, postListType, userType } from "../../assets/interfaces";

const initialState: postSliceType = {
  postList: [],
  userList: [],
  commentData: {
    selectedId: "-1",
    commentList: [],
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const { payload }: { payload: postListType[] } = action;
      state.postList = payload;
    },
    setUsers: (state, action) => {
      const { payload }: { payload: userType[] } = action;
      state.userList = payload;
    },
    setComments: (state, action) => {
      const { payload }: { payload: typeof initialState.commentData } = action;
      state.commentData = payload;
    },
  },
});

export const { setPosts, setUsers, setComments } = postSlice.actions;

export default postSlice.reducer;
