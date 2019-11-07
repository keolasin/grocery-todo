import React, { useState, Fragment } from 'react';
import { useMutation } from 'react-apollo';
import { CREATE_GROUP } from '../graphQL/Mutations';

function CreateGroup(props){
    const [name, setName] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [createGroup, {loading, error}] = useMutation(CREATE_GROUP);

    //handlers
    let onSubmit = (event) => {
        event.preventDefault();
        createGroup({variables: { name: name, isPrivate: isPrivate }});
    }

    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error!</p>
    }

    return (
        <section>
            <form onSubmit={onSubmit}>
                <label for='groupName'>Group name</label>
                <input
                    type='text'
                    name='groupName'
                    label='groupName'
                    placeholder='Name of group'
                    onChange={ event => setName(event.target.value)}
                    required
                />
                <label for='isPrivate'>Private group?</label>
                <input 
                    type='checkbox'
                    name='isPrivate'
                    label='isPrivate'
                    onChange={ event => setIsPrivate(!isPrivate)}
                />
                <button type='submit'>Add Group</button>
            </form>
        </section>
    );
}

export default CreateGroup;


