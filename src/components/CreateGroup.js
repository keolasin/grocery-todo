import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { CREATE_GROUP } from '../graphQL/Mutations';

// styling
import styled from '@emotion/styled';

const Form = styled.form`
    label: create-group-form;
`;


function CreateGroup(props){
    // state
    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    // graphQL mutations
    const [createGroup, {loading, error}] = useMutation(CREATE_GROUP);

    //handlers
    let onSubmit = (event) => {
        event.preventDefault();
        createGroup({variables: { name: name, isPrivate: isPrivate }});
    }

    // conditional rendering
    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error!</p>
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a group</h2>
            <label for='name'>Name</label>
            <input
                id='name'
                type='text'
                placeholder='Name of group'
                onChange={ event => setName(event.target.value)}
                required
            />
            <label for='private'>Private group</label>
            <input 
                type='checkbox'
                onChange={ event => setIsPrivate(!isPrivate)}
            />
            <button type='submit'>Add Group</button>
        </Form>
    );
}

export default CreateGroup;


