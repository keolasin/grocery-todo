import React from 'react';

function FoodItem(props) {
    return (
        <section>
            <h3>{props.food.name}</h3>
            <h4>{props.food.quantity}</h4>
        </section>
    );
}

export default FoodItem;