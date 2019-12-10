/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';
import { useState, Fragment } from 'react';
import { useMutation } from 'react-apollo';
import { Link } from 'react-router-dom';

// graphQL queries/mutations/subscriptions
import { ADD_FOOD } from '../graphQL/Mutations';

function CreateFood(props){
    // styling
    const theme = useTheme();
    console.log(theme);
    const style = css`
        font-size: ${theme.fontSizes};
        grid-area: form;
        place-self: center;
        text-align: left;
        display: grid;
        grid-template-columns: 3fr repeat(2, 2fr) 1fr;
        grid-template-rows: 1fr;
        grid-template-areas:
            "name quantity cart submit";
        h3, label {
            display: inline-block;
            text-align: center;
        }
        input {
            padding: 5px 10px;
            margin: 0px 10px;
            background-color: ${theme.background};
            color: ${theme.body};
        }
        #name {
            grid-area: name;
        }
        #quantity {
            grid-area: quantity;
            input {
                max-width: 50px;
            }
        }
        #cart {
            grid-area: cart;
        }
        #submit {
            grid-area: submit;
        }
        
    `;

    // auth check
    const authToken = localStorage.getItem('token');

    // state
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [inCart, setInCart] = useState(false);

    // graphQL mutation
    const [addFood, { loading, error }] = useMutation(ADD_FOOD);

    // handlers
    let onSubmit = (event) => {
        event.preventDefault();
        addFood({ variables: { name: name, quantity: parseInt(quantity), inCart: inCart, groupId: props.groupId } }); // call addFood mutation
        // reset after submission
        setName('');
        setQuantity(1);
        setInCart(false);
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
        <form css={style} onSubmit={onSubmit}>
            <label id='name'><h3>Product</h3>
                <input 
                    type='text'
                    name='Name'
                    onChange={ event => setName(event.target.value) }
                    placeholder='Avocado'
                    required
                    autoFocus
                />
            </label>

            <label id='quantity'><h3>Quantity</h3>
                <input 
                    type='number'
                    name='Quantity'
                    min='1'
                    onChange={ event => setQuantity(event.target.value) }
                    placeholder='1'
                    required
                />
            </label>

            <label id='cart'>
                <h3>In cart?</h3>
                <input 
                    type='checkbox'
                    name='inCart'
                    onChange={ event => setInCart(!inCart) }
                />
            </label>
            <button id='submit' type='submit'>Add item{quantity > 1 ? 's' : ''}</button>
        </form>
    );
};

export default CreateFood;