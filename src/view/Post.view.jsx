import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";
import { AiFillDelete, AiFillLike, AiOutlineComment } from 'react-icons/ai';
import { FiMoreVertical } from 'react-icons/fi';
import { Row } from '../styles/global.styles';
import { deletePostAsync, toogleLike, deleteComment } from '../state/slices/posts.slice';
import { set } from "react-hook-form";

const Post = ({ postData, single }) => {
  const post = postData;
  const dispatch = useDispatch();
  const { comments, likes } = useSelector(state => state.posts.posts.find(item => item._id === post._id));
  const { me, loggedIn } = useSelector(state => state.users);
  const [showLikes, setShowLikes] = useState(false);

  const handleDelete = () => {
    // delete all comments of the post and then delete the post! 
    post.comments.map(comment => dispatch(deleteComment({ id: comment._id, user: me._id, postId: post._id })));
    dispatch(deletePostAsync({ _id: post._id, user: me._id }));
  }

  const handleLike = () => {
    if (loggedIn) {
      dispatch(toogleLike({ id: post._id, likes: post.likes, userId: me._id, username: me.firstName }));
    }
  }

  return (
    <Box>
      <Row>
        <Content>{post.content}</Content>
        <span>
          {(me._id === post.user) ?
            <Button onClick={handleDelete}><AiFillDelete className="icon" /></Button> :
            null
          }

          {(single !== true) ?
            (<Button onClick={() => navigate(`post/${post._id}`)}><FiMoreVertical className="icon" /></Button>) :
            null}
        </span>
      </Row>

      <Row>
        <Author>{post.username}</Author>
        <p>{post.created.substring(0, 10)} {post.created.substring(11, 16)}</p>
      </Row>

      <div>
        <span className="likes" onClick={handleLike}
          onMouseEnter={() => setShowLikes(true)}
          onMouseLeave={() => setShowLikes(false)}
        ><AiFillLike className="iconL" /> {likes.length}
        </span>
        <AiOutlineComment className="iconL" /> {comments?.length}
      </div>
      <Likes visible={showLikes} >{post.likes.map(obj => obj.name + ", ") || ""}</Likes>
    </Box>
  );
};
export default Post;

const Content = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #242475;
  font-family: "Yanone Kaffeesatz";
  margin: 0;
  `;

const Button = styled.button`
  border-radius: 0.5rem;  
  width: max-content;
  padding: 0.4rem;
  -webkit-box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 8px 9px 13px 5px rgba(0,0,0,0.5); 
  box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 8px 9px 13px 5px rgba(0,0,0,0.5);
`

const Box = styled.div`
  width: 65%;
  background: #ebebf9; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid blue;
  border-radius:10px;
  margin: 10px;

  &:hover {
    background: coral;
    transition: 1s;
  }

  &:hover .iconL {
    color: white;
    transition: 1s;
  }
  &:hover ${Button} {
    width: 4rem;
    transform: rotate(360deg);
    transition: width, transform 2s;
  }

  &:hover ${Content} {
    font-size: 3rem;
    transition: 1s;
    }
  `;



const Author = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #242475;
`;

const Likes = styled.div`
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid midnightblue;
  border-radius: 1rem;
  /* background-color: midnightblue; */
  display: ${({ visible }) => visible ? 'initial' : 'none'};
  width: max-content;
`;






