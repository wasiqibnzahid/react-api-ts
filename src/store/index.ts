import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./slices/posts";
export const store = configureStore({
  reducer: { posts: PostSlice },
});
