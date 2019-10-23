import React from 'react';

let listItem = {
    margin: '10px',
    maxWidth: 'fit-content'
};

function FoodItem(props) {
    return (
        <section style={listItem}>
            <h3>{props.food.name}</h3>
            <p>{props.food.quantity}</p>
            <p>{props.food.inCart ? `In` : `Not in`} cart</p>
        </section>
    );
}

export default FoodItem;