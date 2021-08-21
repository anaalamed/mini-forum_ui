import React, { useEffect } from "react";
import { useRoutes, A } from 'hookrouter';
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getComments } from '../state/slices/posts.slice';
import '../styles/bubbles.css';


import Home from "./pages/Home.view";
import Comments from "./Comments.view";
import SignUp from "./pages/SignUp.view";
import LogIn from "./pages/LogIn.view";
import NoMatch from "./NoMatch.view";
import Profile from "./pages/Profile.view";
import SinglePost from "./pages/SinglePost.view";
import Users from "./pages/Users.view";

const routes = {
    '/': () => <Home />,
    '/signup': () => <SignUp />,
    '/login': () => <LogIn />,
    '/me': (userId) => <Profile id={userId} />,
    '/users': () => <Users />,
    '/user/post/:postId': ({ postId }) => <SinglePost postId={postId} />,
    '/post/:postId': ({ postId }) => <SinglePost postId={postId} />,
    '/post/:postId/comments': ({ postId }) => <Comments postId={postId} />,
    '/user/:userId': ({ userId }) => <Profile id={userId} />
};


const App = () => {
    const dispatch = useDispatch();
    const routeResult = useRoutes(routes);
    const { loggedIn, me } = useSelector(state => state.users);
    const { posts, isLoading } = useSelector(state => state.posts);

    useEffect(() => {
        posts.map(post => dispatch(getComments(post._id)));
    }, [posts.length]);

    var bubbles = [];
    for (var i = 0; i < 100; i++) {
        bubbles.push(<div className="bubble"></div>);
    }

    return (
        <Router>
            <Box>
                <h1>Mini Forum</h1>
                <Menu>
                    <div>
                        <A href="/">Home</A>
                        <A href="/users">Users</A>
                    </div>
                    <img src="forum.png"></img>

                    {(loggedIn === true) ?
                        <A href="/me">Hey, {me.firstName}</A> :
                        <div>
                            {/* <A href="/me">Me</A> */}
                            <A href="/me">Hey, guest</A>
                            <A href="/signup">Sign Up</A>
                            <A href="/login">Log In</A>
                        </div>
                    }
                    <div className="bottom-particles">{bubbles}</div>

                </Menu>
            </Box>
            {routeResult || <NoMatch />}
        </Router>

    )

};
export default App;

const Box = styled.div`
  justify-content: center;
  align-items: center;

  img {
      width: 7rem;
  }
`;

const Menu = styled.div`
    display: flex;
    background: coral;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    A {
    /* color: #0c0c27; */
    font-weight: bold;
    font-size: 1.5rem;
    color: #e0dfdc;
    letter-spacing: .1em;
    text-shadow: 0 -1px 0 #fff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222, 0 8px 0 #202020, 0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212, 0 22px 30px rgba(0,0,0,0.9);


    }
`



