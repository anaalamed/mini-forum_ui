import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { navigate } from "hookrouter";
import { login } from '../../state/slices/users.slice';
import { Title, Button, Input } from '../../styles/global.styles';


const LogIn = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(state => state.users);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  }

  return (
    <Box>
      <Title>Log In</Title>
      <br></br>

      <Form onSubmit={handleSubmit(onSubmit)} >
        <Input
          name="email"
          placeholder="Email"
          {...register('email', { required: true, minLength: 8 })}
        ></Input>
        <label>Email: </label>
        <br></br>

        <Input
          name="password"
          type='password'
          placeholder="Password"
          {...register('password', { required: true, minLength: 6 })}
        ></Input>
        <label>Password: </label>
        <br></br>
        <Button>Log In</Button>
      </Form>

      {(loggedIn) ? (navigate('/me')) : null}

      <Fake>
        <h3>Fake Account:</h3>
        <p>email: moshe@gmail.com</p>
        <p>password: 123456</p>
      </Fake>
    </Box>
  )
}

export default LogIn;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Form = styled.form`
  width: 50%;
  margin-left: 25%;
  background: #ebebf9;
  padding: 2rem 6rem;
  border-radius: 1rem;
  border: 3px solid midnightblue;
  &:hover {
        background-color: #ecb7a1;
    }
`;


const Fake = styled.div`
  margin: 0 auto;
  margin-top: 4rem;
  background-color: #2d2da3;
  /* width: 30%; */
  padding: 1rem 2rem;
  border-radius: 1rem;
  border: 1rem solid coral;
  color: coral;
`;

