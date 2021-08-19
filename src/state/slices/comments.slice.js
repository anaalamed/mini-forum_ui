import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
	'comments/getComments',
	async (payload) => {
        console.log(payload);
		const response = await fetch(`http://localhost:4002/api/comments?entity=${payload}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
    if (response.ok) {
      const comments = await response.json();
      console.log(comments);
      return {comments};
		}
	}
);

export const addComment = createAsyncThunk(
	'comments/addComment',
	async (payload) => {
        console.log(payload);
		const response = await fetch(`http://localhost:4002/api/comments`, {
			method: 'POST',
      headers: {
				'Content-Type': 'application/json',
        user: JSON.stringify( payload.user )
			},
      body: JSON.stringify({entity: payload.entity, 
                            content: payload.content, 
                            username: payload.username })
		});
    if (response.ok) {
      const comment = await response.json();
      return {comment};
		}
	}
);

export const deleteComment = createAsyncThunk(
	'comments/deleteComment',
	async (payload) => {
        console.log(payload);
		const response = await fetch(`http://localhost:4002/api/comments/${payload.id}`, {
			method: 'DELETE',
      headers: {
				'Content-Type': 'application/json',
        user: JSON.stringify( payload.user )
			},
		});
    if (response.ok) {
      // return {message: "removed sucessfully"};
      return {id: payload.id};
		}
	}
);


const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: {
      [getComments.fulfilled]: (state, action) => {
        state.comments = action.payload.comments;
        state.isLoading = false;
      },
      [addComment.fulfilled]: (state, action) => {
        state.comments.push(action.payload.comment);
      },
      [deleteComment.fulfilled]: (state, action) => {
        const index = state.comments.findIndex(item => item._id === action.payload.id);
        state.comments.splice(index,1);
      }

    }
  });

export default commentsSlice.reducer;
export const {  } = commentsSlice.actions;




