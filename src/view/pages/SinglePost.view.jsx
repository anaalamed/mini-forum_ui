import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Post from '../Post.view.jsx';
import Comments from '../Comments.view';


const SinglePost = ({ postId }) => {
  const { posts, isLoading } = useSelector(state => state.posts);
  const post = posts.find(post => post._id === postId);
  // const { me } = useSelector(state => state.users);

  if (isLoading) return <h1>Loading data...</h1>;

  return (
    <Box>
      <Post postData={post} single={true}></Post>

      <Comments postId={postId}></Comments>
    </Box>

  );
};
export default SinglePost;




const Box = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;








