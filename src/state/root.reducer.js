import { combineReducers } from "redux";
import postsSlice from "./slices/posts.slice";
import users_slice from "./slices/users.slice";
// import commentsSlice from "./slices/comments.slice";

const rootReducer = combineReducers({
  users: users_slice,
  posts: postsSlice,
  // comments: commentsSlice
});

export default rootReducer;
