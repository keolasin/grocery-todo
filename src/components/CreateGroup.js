/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';
import { useState } from 'react';
import { useMutation } from 'react-apollo';
import { CREATE_GROUP } from '../graphQL/Mutations';


function CreateGroup(props){
    // styling
    const theme = useTheme();
    const style = css`
        label: create-group-form;
    `;

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
        <form css={style} onSubmit={onSubmit}>
            <h2>Create a group</h2>
            <label>Name:
                <input
                    id='groupName'
                    type='text'
                    placeholder='Name of group'
                    onChange={ event => setName(event.target.value)}
                    required
                />
            </label>

            <label>Private group:
                <input 
                    id='privateGroup'
                    type='checkbox'
                    onChange={ event => setIsPrivate(!isPrivate)}
                />
            </label>
            
            <button type='submit'>Add Group</button>
        </form>
    );
}

export default CreateGroup;


