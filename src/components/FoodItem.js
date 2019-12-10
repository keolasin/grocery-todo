/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';
import { Fragment, useState } from 'react';
import { useMutation } from 'react-apollo';

// graphQL queries/mutations/subscriptions
import { DELETE_FOOD, UPDATE_FOOD } from '../graphQL/Mutations.js';

function FoodItem(props) {
    // styling
    const theme = useTheme();
    const style = css`
        display: grid;
        grid-template-columns: 3fr repeat(2, 2fr) 1fr;
        grid-template-areas:
            "name quantity cart submit";
        align-items: start;
        h4 {
            grid-area: name;
            cursor: pointer;
        }
        h4,p:hover{
            text-decoration: underline ${theme.hover};
        }
        h4,p:active{
            text-decoration: underline ${theme.active};
        }
        .strikethrough {
            text-decoration: line-through;
        }
        p {
            cursor: pointer;
            grid-area: quantity;
            margin-block-start: 0px;
            margin-block-end: 0px;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
        }
        input[type="number"] {
            max-width: 50px;
        }

        #inCart {
            grid-area: cart;
        }
        #delete, button[type='submit'] {
            grid-area: submit;
        }
        
    `;
    
    // specific food item
    let food = props.food;

    // state
    const [editing, setEditing] = useState(false);
    const [editingFood, setEditingFood] = useState(false);
    const [editingQuantity, setEditingQuantity] = useState(false);
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
        <form css={style} onSubmit={updateCart}>    
            <h4 className={food.inCart ? 'strikethrough': null} onClick={editCart}>{editing ? (
                <input 
                    type='text'
                    name='Name'
                    onChange={ event => setName(event.target.value) }
                    placeholder={food.name}
                    required
                    autoFocus
                />
                ) : food.name}
            </h4>
            <p onClick={editCart}>{editing ? (
                <input 
                    type='number'
                    name='Quantity'
                    min='1'
                    onChange={ event => setQuantity(event.target.value) }
                    placeholder={food.quantity}
                    required
                />
                ) : food.quantity}
            </p>
            <button id='inCart' onClick={toggleInCart}>{food.inCart ? `Remove` : `Add`}</button>
            {editing ? <button type='submit'>Confirm changes</button> : <button id='delete' onClick={deleteConfirm}>Delete</button>}
        </form>
    );
}

export default FoodItem;