import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux"
import { AiFillDelete } from 'react-icons/ai';
import { Row } from '../styles/global.styles';
import { deleteComment } from "../state/slices/posts.slice"
import AddComment from './AddComment.view';

const Comments = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector(state => state.posts.posts.find(post => post._id === postId));
  const { me, loggedIn } = useSelector(state => state.users);

  return (
    <>
      {(loggedIn) ? (<AddComment postId={postId} />) : null}

      {(comments?.map(comment =>
        <Comment>
          <Row>
            <h3>{comment.content}</h3>

            {(comment.user === me._id) ?
              (<p onClick={() => dispatch(deleteComment({ id: comment._id, user: me._id, postId }))}><AiFillDelete /></p>) : null
            }
          </Row>
          <Row>
            <p>{comment.username}</p>
            <p>{comment.created.substring(0, 10)} {comment.created.substring(11, 16)}</p>
          </Row>
        </Comment>
      ))}
    </>
  );
};
export default Comments;

const Comment = styled.div`
      width: 55%;
      padding: 1rem;
      background: #ebebf9;
      display: flex;
      flex-direction: column;
      border: 2px solid blue;
      border-radius:10px;
      &:hover {
        background: coral;
        transition: 0.5s;
      }
      margin: 10px;
  `;

