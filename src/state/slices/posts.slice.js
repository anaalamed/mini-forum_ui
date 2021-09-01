import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPosts = createAsyncThunk(
	'posts/getPosts',
	async () => {
		const response = await fetch('https://anaalamed-forum-posts.herokuapp.com/api/posts', {
		// const response = await fetch('http://localhost:4001/api/posts', {
			headers: {
				'Content-Type': 'application/json',
			},
		});
    	if (response.ok) {
      	const posts = await response.json();
      	return {posts};
		}
	}
);

export const addPostAsync = createAsyncThunk(
	'posts/addPostAsync',
	async (payload) => {
		const response = await fetch('https://anaalamed-forum-posts.herokuapp.com/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
    		    'user':  (payload.user),
			},
			body: JSON.stringify({ content: payload.content, username: payload.username }),
		});
		if (response.ok) {
			const post = await response.json();
			return { post };
		}
	}
);

export const deletePostAsync = createAsyncThunk(
	'posts/deletePostAsync',
	async (payload) => {
		const response = await fetch(`https://anaalamed-forum-posts.herokuapp.com/api/posts/${payload._id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
        		"user": payload.user,
			},
		});
		if (response.ok) {
			return { id: payload._id };
		}
	}
);

// ----------------------------- comments ------------------------------------
export const getComments = createAsyncThunk(
	'posts/comments/getComments',
	async (payload) => {
        // console.log(payload);
		const response = await fetch(`https://anaalamed-forum-comments.herokuapp.com/api/comments?entity=${payload}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
    	if (response.ok) {
      		const comments = await response.json();
      		return {id: payload, comments};
		}
	}
);

export const addComment = createAsyncThunk(
	'posts/comments/addComment',
	async (payload) => {
        console.log(payload);
		const response = await fetch(`https://anaalamed-forum-comments.herokuapp.com/api/comments`, {
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
        	return {id: payload.entity, comment};
		}
	}
);

export const deleteComment = createAsyncThunk(
	'comments/deleteComment',
	async (payload) => {
		const response = await fetch(`https://anaalamed-forum-comments.herokuapp.com/api/comments/${payload.id}`, {
			method: 'DELETE',
    	    headers: {
				'Content-Type': 'application/json',
        	user: JSON.stringify( payload.user )
			},
		});
    	if (response.ok) {
      		return {id: payload.id, postId: payload.postId};
		}
	}
);

// ----------------------------- likes ------------------------------------
export const toogleLike = createAsyncThunk(
'posts/addLikeAsync',
async (payload) => {
	// console.log(payload);
		const response = await fetch(`https://anaalamed-forum-posts.herokuapp.com/api/posts/${payload.id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'user':  (payload.userId),
		},
		body: JSON.stringify({username: payload.username}),
	});
		if (response.ok) {
			const likes = await response.json();
			console.log(likes);
			return { id: payload.id, likes };
		}
	}
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: true,
  },
  reducers: {},
  extraReducers: {
      [getPosts.fulfilled]: (state, action) => {
        state.posts = action.payload.posts;
        state.isLoading = false;
      },
      [addPostAsync.fulfilled]: (state, action) => {
        state.posts.unshift(action.payload.post);
      },  
      [deletePostAsync.fulfilled]: (state, action) => {
		const index = state.posts.findIndex(item => item._id === action.payload.id);
		state.posts.splice(index,1);
      },
// ----------------------------- comments ------------------------------------
	  [getComments.fulfilled]: (state, action) => {
		state.posts.find(post => post._id === action.payload.id).comments = action.payload.comments;
      },
	  [addComment.fulfilled]: (state, action) => {
		state.posts.find(post => post._id === action.payload.id).comments.unshift( action.payload.comment);
      },
	  [deleteComment.fulfilled]: (state, action) => {
		const index = state.posts.find(post => post._id === action.payload.postId).comments.findIndex(comment => comment._id === action.payload.id);
		state.posts.find(post => post._id === action.payload.postId).comments.splice(index,1);
      },
	  [toogleLike.fulfilled]: (state, action) => {
		console.log(action.payload);
		const index = state.posts.findIndex(post => post._id === action.payload.id);
		state.posts[index].likes = action.payload.likes;
      },
    }
  });

export default postsSlice.reducer;




