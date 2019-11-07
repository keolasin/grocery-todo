import React, { useState } from 'react';
import { useMutation } from 'react-apollo';

// graphQL queries/mutations/subscriptions
import { ADD_FOOD } from '../graphQL/Mutations';

function CreateFood(props){
    

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [inCart, setInCart] = useState(false);
    const [addFood, { loading, error, data }] = useMutation(ADD_FOOD);

    let onSubmit = (event) => {
        event.preventDefault();
        addFood({ variables: { name: name, quantity: parseInt(quantity), inCart: inCart } }); // call addFood mutation
    };

    if (loading){
        return <p>Loading...</p>
    }
    if (error){
        return <p>Error: ${error.message}</p>
    }
    return (
        <section>
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
        </section>
    );
};

export default CreateFood;