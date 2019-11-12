import React from 'react';
import { useQuery } from 'react-apollo';

// components
import FoodItem from './FoodItem';
import CreateFood from './CreateFood';

// graphQL queries/mutations/subscriptions
import { FEED_QUERY } from '../graphQL/Queries.js';


const container = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
};

function FoodList(props){
    // receiving our necessary group data for query
    const fromGroup = props.location.state.fromGroup;
    
    // call our query, extract loading, error, data states
    const { loading, error, data } = useQuery(FEED_QUERY, {
        variables: { filter: fromGroup.name }, // filter, showing only foods for group selected
        pollInterval: 5,
    });

    

    // while loading from API
    if(loading){
        return (<h5>Loading...</h5>);
    }

    // show error if encountered
    if(error){
        return (
            <h5>Error!</h5>
        );
    }

    // show data once loaded
    return(
        <main style={container}>
            <CreateFood groupId={fromGroup.id}/>
            {data.groupList[0].foods.length > 0 ? data.groupList[0].foods.map(food => <FoodItem key={food.id} food={food} />) : <h4>There's nothing here...</h4>}
        </main>
    );
}

export default FoodList;