import React from 'react';
import { useQuery } from 'react-apollo';

// components
import FoodItem from './FoodItem';

// graphQL queries/mutations/subscriptions
import FEED_QUERY from '../graphQL/Queries.js';

const container = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
};

function FoodList(props){    
    // call our query, extract loading, error, data states
    const { loading, error, data } = useQuery(FEED_QUERY, {
        pollInterval: 500
    });
    
    // while loading from API
    if(loading){
        return (<h5>Loading...</h5>);
    }

    // show error if encountered
    if(error){
        console.log(error);
        return (
            <h5>Error!</h5>
        );
    }

    // show data once loaded
    return(
        <article style={container}>
            {data.feed.map(food => <FoodItem key={food.id} food={food} />)}
        </article>
    );
}

export default FoodList;