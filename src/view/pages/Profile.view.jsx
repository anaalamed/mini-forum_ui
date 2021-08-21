import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Title, Button } from '../../styles/global.styles';
import { logout } from '../../state/slices/users.slice'
import Post from "../Post.view";

const Profile = ({ id }) => {
  const dispatch = useDispatch();
  const { me, users } = useSelector(state => state.users);
  const { posts } = useSelector(state => state.posts);

  var user;
  if (id === null) {
    user = me;
  }
  else {
    user = users.find(user => user._id === id);
  }

  const userPosts = posts.filter(post => post.user === user._id);

  return (
    <>
      <Title>{(user.firstName) || null} Profile</Title>
      <Box>

        {(Object.keys(user).length === 0) ?
          (<div><Button><a href="/login">Log In</a></Button></div>) :
          (<Section>

            <p>Name: <span className="property">{user.firstName}</span></p>
            <p>Last Name: <span className="property">{user.lastName}</span></p>
            <p>Country: <span className="property">{user.country}</span></p>
            <p>Joined: <span className="property">{user.created.substring(0, 10)}</span></p>
            <p>About: <span className="property">{user.about}</span></p>

            {(me._id === user._id) ?
              <>
                <p>Email: <span className="property">{user.email}</span></p>
                {/* <Button onClick={() => dispatch(logout())}>Log Out</Button> */}
                <Button onClick={() => dispatch(logout())}>Log Out</Button>
              </>
              : null
            }
          </Section>)
        }
      </Box>

      <Title>{(user.firstName) || null} Posts</Title>
      <Box>
        {(userPosts.map(post => (<Post postData={post} />)))}
      </Box>

    </>
  )
}

export default Profile;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  background-color: #ebebf9;
  margin-top: 1rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  padding: 3rem;
  border-radius: 1rem;
  &:hover {
    /* background-color: coral; */
    transition: 1s;
  }

  span {
    color: midnightblue;
    padding: 1rem;
    font-weight: bold;
    font-size: 2rem;
  }
`;





