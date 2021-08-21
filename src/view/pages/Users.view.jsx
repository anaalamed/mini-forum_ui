import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Title } from '../../styles/global.styles';
import { getUsers } from '../../state/slices/users.slice';
import { navigate } from "hookrouter";



const Users = () => {
    const { users } = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <>
            <Title>Users</Title>
            <Box>
                {(users.map(user =>
                    (<h3 onClick={() => navigate(`user/${user._id}`)}>{user.firstName} {user.lastName}</h3>)
                ))}
            </Box>
        </>
    );
};
export default Users;

const Box = styled.div`
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-color: coral; */

  h3 {
      /* margin: 0 auto; */
      width: 40%;
      text-align: center;
      padding: 1rem;
      color: white;
  }
  h3:hover {
      background-color: midnightblue;
      color: white;
      text-decoration: none;
      border-radius: 1rem;
      /* font-size: 3rem; */
      transform: rotate(360deg);
      transition: transform 2s;
  }
  `;








