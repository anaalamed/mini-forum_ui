import React from "react";
import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import countries from '../../data/countries';
import { Title, Button } from '../../styles/global.styles';
import { registration } from '../../state/slices/users.slice'

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})&/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;


  const error_messages = {
    first_name: {
      required: "First name is required",
      minLength: "First name is too short"
    },
    last_name: {
      required: "Last name is required",
      minLength: "Last name is too short"
    },
    country: {
      required: "Country is required"
    },
    email: {
      required: "Email is required",
      minLength: "Email is too short",
      pattern: "Email address is not valid"
    },
    description: {
      required: "Description is required",
      minLength: "Description is too short"
    },
    password: {
      required: "Password is required",
      minLength: "Password is too short",
      pattern: "Password is not strong! \n Must contain at least 1 letter, 1 numeric"
    },
    // cpassword: {
    //   required: "Password is required",
    //   minLength: "Password is too short",
    //   // pattern: "Passwords don't match!"
    // }
  };
  const get_error_msg = (errors, error_messages, field_name) => {
    const generate = (name) => {
      if (errors[name]) {
        switch (errors[name].type) {
          case "required":
            return error_messages[name].required;
          case "minLength":
            return error_messages[name].minLength;
          case "pattern":
            return error_messages[name].pattern;
          default:
            return "";
        }
      }
    };
    return generate(field_name);
  };

  const onSubmit = (data) => {
    console.log(data);
    dispatch(registration(data));
  }

  return (
    <Box>
      <Title>Sign Up</Title>
      <br></br>
      <>
        <Form
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>Name: </label>
          <Input
            name="first_name"
            placeholder="First Name"
            {...register('first_name', { required: true, minLength: 2 })}
            error_styled={errors?.first_name}
          ></Input>
          <Error show={errors?.first_name}>
            {get_error_msg(errors, error_messages, "first_name")}
          </Error>
          <br></br>

          <label>Last Name: </label>
          <Input
            name="last_name"
            placeholder="Last Name"
            {...register('last_name', { required: true, minLength: 2 })}
            error_styled={errors?.last_name}
          ></Input>
          <Error show={errors.last_name}>
            {get_error_msg(errors, error_messages, "last_name")}
          </Error>
          <br></br>

          <label>Country: </label>
          <WraperSelect>
            <Select
              type="select"
              name="country"
              {...register('country', { required: true })}
            >
              <option value="">Please select country</option>
              {Object.keys(countries).map((country) => {
                const { name, emoji } = countries[country];
                return (
                  <option key={country} value={name}>
                    {emoji} &nbsp; {name}{" "}
                  </option>
                );
              })}
            </Select>
          </WraperSelect>
          <Error show={errors.country}>
            {get_error_msg(errors, error_messages, "country")}
          </Error>
          <br></br>

          <label>Email: </label>
          <Input
            name="email"
            placeholder="Email"
            {...register('email', { required: true, minLength: 8, pattern: email_regex })}
            error_styled={errors.email}
          ></Input>
          <Error show={errors.email}>
            {get_error_msg(errors, error_messages, "email")}
          </Error>
          <br></br>

          <label>Password: </label>
          <Input
            name="password"
            type='password'
            placeholder="Password"
            {...register('password', { required: true, minLength: 6, pattern: passwordRegex })}
            error_styled={errors.password}
          ></Input>
          <Error show={errors.password}>
            {get_error_msg(errors, error_messages, "password")}
          </Error>
          <br></br>

          {/* <label>Confirm Password: </label>
          <Input
            name="cpassword"
            type='password'
            placeholder="Confirm Password"
            {...register('cpassword', { required: true, minLength: 8 })}
            error_styled={errors.password}
          ></Input>
          <Error show={errors.cpassword}>
            {get_error_msg(errors, error_messages, "cpassword")}

          </Error>
          <br></br> */}

          <label>Description: </label>
          <Textarea
            name="description"
            placeholder="About..."
            rows="4"
            {...register('description', { required: true, minLength: 10 })}
            error_styled={errors.description}
          ></Textarea>
          <Error show={errors.description}>
            {get_error_msg(errors, error_messages, "description")}
          </Error>
          <br></br>

          <Button>Sign Up</Button>
        </Form>
      </>
    </Box>
  )
}

export default SignUp;

const Box = styled.div`

`;

const Form = styled.form`
  width: 50%;
  margin-left: 25%;
  background: #ebebf9;
  padding: 2rem 6rem;
  border-radius: 1rem;
  border: 3px solid midnightblue;
  &:hover {
        /* filter: brightness(90%); */
        background: coral;
        transition: 0.1s;
    }
`;

const Input = styled.input`
  background: ${({ error_styled }) => (error_styled ? "pink" : "white")};
  width: 100%;
  font-size: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: Arial;
  margin-bottom: 2rem;
`;


const WraperSelect = styled.div`
  select {
    background: ${({ error_styled }) => (error_styled ? "pink" : "white")};
  }
`;

const Select = styled.select`
  background: ${({ error_styled }) => (error_styled ? "pink" : "white")};
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1rem;
  color: #aaa;
  font-family: Arial;
`;
const Textarea = styled.textarea`
  background: ${({ error_styled }) => (error_styled ? "pink" : "white")};
  border-radius: 1rem;
  width: 100%;
  font-size: 1rem;
  padding: 1rem;
  font-family: Arial;
`;

const Error = styled.div`
  color: red;
  display: ${({ show }) => (show ? "block" : "none")};
  font-size: 1rem;
`;
