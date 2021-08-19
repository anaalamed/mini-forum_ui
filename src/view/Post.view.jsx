import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "hookrouter";
import { AiFillDelete, AiFillLike, AiOutlineComment } from 'react-icons/ai';
import { FiMoreVertical } from 'react-icons/fi';
import { Row } from '../styles/global.styles';
import { deletePostAsync, toogleLike, deleteComment } from '../state/slices/posts.slice';

const Post = ({ postData, single }) => {
  const post = postData;
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.posts);
  const { comments, likes } = useSelector(state => state.posts.posts.find(item => item._id === post._id));
  const { me, users } = useSelector(state => state.users);

  // var whoLiked = [];

  // delete all comments of the post and then delete the post! 
  const handleDelete = () => {
    post.comments.map(comment => dispatch(deleteComment({ id: comment._id, user: me._id, postId: post._id })));
    dispatch(deletePostAsync({ _id: post._id, user: me._id }));
  }

  const handleLike = () => {
    dispatch(toogleLike({ id: post._id, likes: post.likes, user: me._id }));
  }

  // const handleViewLikes = () => {
  //   const likes = findName();
  //   alert(likes);
  //   whoLiked = likes;
  // }

  // const findName = () => {
  //   var names = [];
  //   likes.forEach(id => {
  //     names.push(users.find(user => user._id === id)?.firstName);
  //   });
  //   // console.log(names);
  //   return names;
  // };

  if (isLoading) return <h1>Loading data...</h1>;
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
        <span onClick={handleLike}
        // onMouseEnter={handleViewLikes}
        ><AiFillLike className="iconL" /> {likes.length}
        </span>
        <AiOutlineComment className="iconL" /> {comments?.length}
      </div>

      {/* <div>
        {(whoLiked.length !== 0) ? (whoLiked.map(like => (<p>{like}</p>))) : null}
      </div> */}

      <br></br>
    </Box>

  );
};
export default Post;


const Box = styled.div`
  width: 65%;
  background: #ebebf9; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  border: 2px solid blue;
  border-radius:10px;
  &:hover {
    background: coral;
    transition: 1s;
  }

  &:hover Button {
    background-color: #0c0c27;
    transition: 1s;
  }
  &:hover .icon {
    color: white;
    transition: 1s;
  }
  margin: 10px;
  `;

const Button = styled.button`
  /* background-color: coral; */
  /* color: white; */
  border-radius: 0.5rem;  
  padding: 0.4rem;
  /* box-shadow: coral; */

  -webkit-box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 8px 9px 13px 5px rgba(0,0,0,0.5); 
  box-shadow: inset -1px 3px 8px 5px #1F87FF, 2px 5px 16px 0px #0B325E, 8px 9px 13px 5px rgba(0,0,0,0.5);
  `

const Content = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: #242475;
  font-family: "Yanone Kaffeesatz";
  margin: 0;
  `;

const Author = styled.div`
  font-size: 1rem;
`;




