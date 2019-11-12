import React, { useState, Fragment } from 'react';
import { useMutation } from 'react-apollo';
import { Link } from 'react-router-dom';

// graphQL queries/mutations/subscriptions
import { ADD_FOOD } from '../graphQL/Mutations';

function CreateFood(props){
    // auth check
    const authToken = localStorage.getItem('token');

    // state
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [inCart, setInCart] = useState(false);

    // graphQL mutation
    const [addFood, { loading, error }] = useMutation(ADD_FOOD);

    // handlers
    let onSubmit = (event) => {
        event.preventDefault();
        addFood({ variables: { name: name, quantity: parseInt(quantity), inCart: inCart, groupId: props.groupId } }); // call addFood mutation
    };

    // conditional rendering
    if (!authToken){ // not authenticated
        return (
            <section>
                <Link to="/login">Log in to add foods to the list!</Link>
            </section>
        )
    }
    if (loading){
        return <p>Loading...</p>
    }
    if (error){
        return <p>Error: ${error.message}</p>
    }
    return (
        <form onSubmit={onSubmit}>
            <input 
                type='text'
                name='Name'
                onChange={ event => setName(event.target.value) }
                placeholder='Add an item'
                required
                autoFocus
            >
            </input>

            <input 
                type='text'
                name='Quantity'
                min='0'
                onChange={ event => setQuantity(event.target.value) }
                placeholder='How many?'
                required
            >
            </input>

            <label>Add to cart?</label>
            <input 
                type='checkbox'
                name='inCart'
                onChange={ event => setInCart(!inCart) }
            >
            </input>
            <button type='submit'>Submit</button>
        </form>
    );
};

export default CreateFood;