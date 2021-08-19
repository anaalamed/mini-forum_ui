import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const login  = createAsyncThunk(
	'users/login',
	async (payload) => {
    console.log(payload);
		const response = await fetch('https://anaalamed-forum-auth.herokuapp.com/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
        email: payload.email, 
        password: payload.password
      })
    });
      if (response.ok) {
        const user = await response.json();
        return { user };
      }
  });

export const logout  = createAsyncThunk(
    'users/logout',
    async (payload) => {
      console.log(payload);
      const response = await fetch('https://anaalamed-forum-auth.herokuapp.com/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
        if (response.ok) {
			    return { message: "log out successfully" };
        }
  });

  export const registration  = createAsyncThunk(
    'users/registration',
    async (payload) => {
      console.log(payload);
      const response = await fetch('https://anaalamed-forum-auth.herokuapp.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName: payload.first_name,
          lastName: payload.last_name,
          email: payload.email, 
          password: payload.password,
          country: payload.country, 
          about: payload.description 
        })
      });
        if (response.ok) {
        const user = await response.json();
			    return { user };
        }
  });

  export const getUsers  = createAsyncThunk(
    'users/getUsers',
    async (payload) => {
      console.log(payload);
      const response = await fetch('https://anaalamed-forum-auth.herokuapp.com/api/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        if (response.ok) {
          const users = await response.json();
          return {users};
        }
    });




const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    me: {},
    loggedIn: false
  },
  reducers: {},
  extraReducers: {
    [registration.fulfilled]: (state, action) => {
      alert("you registrated successfully");
      state.users.push(action.payload.user);
    },
    [login.fulfilled]: (state, action) => {
      state.me = action.payload.user.userFound;
      state.loggedIn = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.me = {};
      state.loggedIn = false;
    },
    [getUsers.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.users=(action.payload.users);
    }


  }
});

export default usersSlice.reducer;