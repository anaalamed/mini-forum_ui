import styled from "styled-components";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdAdd } from 'react-icons/md';
import { addComment } from '../state/slices/posts.slice';

const AddComment = ({ postId }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const { me } = useSelector(state => state.users);

    const onSubmitForm = (event) => {
        event.preventDefault();
        dispatch(addComment({ content: value, user: me._id, entity: postId, username: me.firstName }));
        setValue("");
    };

    return (
        <Main>
            <Form onSubmit={onSubmitForm}>
                {/* <label>Your Post</label> */}
                <Input
                    type="text"
                    placeholder="Add your comment..."
                    onChange={(event) => setValue(event.target.value)}
                    value={value}>
                </Input>
                <Button type="submit" ><h2 className="icon"><MdAdd /></h2></Button>
            </Form>
            {/* <p>{value}</p> */}
            {/* <p>{userId}</p> */}

        </Main>
    )
}

export default AddComment;

const Main = styled.div`
    width: 55%;
    padding: 3rem 0;
    margin: 0 auto;
    /* border-radius: 1rem; */
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
      background-color: coral;
      transition: 1s;
    }

`;

const Button = styled.button`
    width: 10rem;
    margin-left: 0;
    margin: 0 auto;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    background-color: #0c0c27;
`;