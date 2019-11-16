import{ Fragment, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { useMutation } from 'react-apollo';

// graphQL queries/mutations/subscriptions
import { DELETE_FOOD, UPDATE_FOOD } from '../graphQL/Mutations.js';

function FoodItem(props) {
    // styling
    const theme = useTheme();
    const style = {
        display: 'grid',
        
    }
    
    // specific food item
    let food = props.food;

    // state
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(food.name);
    const [quantity, setQuantity] = useState(food.quantity);

    // graphQL mutation hooks
    const [deleteFood] = useMutation(DELETE_FOOD);
    const [updateFood, {loading, error}] = useMutation(UPDATE_FOOD);

    // handler functions
    let updateCart = (event) => {
        event.preventDefault();
        updateFood({ // updateFood hook
            variables: {  // pass variables to the mutation
                id: food.id,
                name: name,
                quantity: parseInt(quantity),
                inCart: food.inCart
            }
        });
        setEditing(!editing); // toggle editing status for conditional rendering
    }

    let toggleInCart = (event) => {
        event.preventDefault();
        updateFood({ // toggling the item in cart
            variables: {
                id: food.id,
                name: food.name,
                quantity: food.quantity,
                inCart: !food.inCart
            }
        });
    }

    // toggle editing on click
    let editCart = (event) => {
        event.preventDefault();
        setEditing(!editing);
    }

    let deleteConfirm = (event) => {
        event.preventDefault();
        deleteFood({ variables: { id: food.id }}); // delete target food
    }

    // conditional rendering
    if(loading){
        return <p>Loading...</p>;
    }
    if(error){
        return <p>Error!</p>;
    }

    return (
        <section css={style}>
            {editing ? (
            <form onSubmit={updateCart}>
                <input 
                    type='text'
                    name='Name'
                    onChange={ event => setName(event.target.value) }
                    placeholder={food.name}
                    required
                    autoFocus
                />
                <input 
                    type='text'
                    name='Quantity'
                    min='0'
                    onChange={ event => setQuantity(event.target.value) }
                    placeholder={food.quantity}
                    required
                />
                <button type='submit'>Confirm changes</button>
            </form>
            ) : (
                <Fragment>
                    <h3>{food.name}</h3>
                    <p>{food.quantity}</p>
                </Fragment>
            )}
            
            <button onClick={editCart}>{editing ? `Cancel` : `Edit`}</button>
            <button onClick={toggleInCart}>{food.inCart ? `Remove from cart` : `Add to cart`}</button>
            <button onClick={deleteConfirm}>Delete</button>
        </section>
    );
}

export default FoodItem;