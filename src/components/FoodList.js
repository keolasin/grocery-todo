import React from 'react';
import FoodItem from './FoodItem';

import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

function FoodList(props){

    // define our query
    const FEED_QUERY = gql`
        {
            feed {
                id
                name
                quantity
                inCart
                postedBy {
                    name
                }
            }
        }
    `;
    
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
        return (<h5>Error: {error}</h5>);
    }

    // show data once loaded
    return(
        <section>
            {data.feed.map(food => <FoodItem key={food.id} food={food} />)}
        </section>
    );
}

export default FoodList;