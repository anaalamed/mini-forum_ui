import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdAdd } from 'react-icons/md';
import { addPostAsync } from '../state/slices/posts.slice';

const AddPost = ({ userId, username }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const onSubmitForm = (event) => {
        event.preventDefault();
        dispatch(addPostAsync({ content: value, user: userId, username }));
        setValue("");
    };

    return (
        <Main>
            <Form onSubmit={onSubmitForm}>
                <Input
                    type="text"
                    placeholder="Add your post..."
                    onChange={(event) => setValue(event.target.value)}
                    value={value}>
                </Input>
                <Button type="submit" ><h2 className="icon"><MdAdd /></h2></Button>
            </Form>
        </Main>
    )
}

export default AddPost;

const Main = styled.div`
    width: 55%;
    padding: 3rem 0;
    margin: 0 auto;
`;

const Form = styled.form`
    display: flex;
`;


const Input = styled.input`
    width: 100%;
    padding-left: 2rem;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    ::placeholder {
        letter-spacing: 0.5rem;
    }
    &:hover {
      background-color: #ecb7a1;
      transition: 1s;
    }

`;

const Button = styled.button`
    width: 10rem;
    margin-left: 0;
    margin: 0 auto;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: coral;

    &:hover {
        background-color: #0c0c27;
        transition: 1s;

    }
`;