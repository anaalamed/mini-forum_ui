import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post.view"
import AddPost from '../AddPost.view';

const Home = () => {
  const { posts, isLoading } = useSelector(state => state.posts);
  const { loggedIn, me } = useSelector(state => state.users);

  if (isLoading) return <h1>Loading posts...</h1>;
  return (
    <Box>
      {(loggedIn) ? (< AddPost userId={me._id} username={me.firstName} />) : null}

      {posts.map((post) => (
        <Post key={post._id} postData={post} />
      ))}
    </Box>
  );

};
export default Home;

const Box = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

