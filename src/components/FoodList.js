/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { useQuery } from 'react-apollo';

// components
import FoodItem from './FoodItem';
import CreateFood from './CreateFood';

// graphQL queries/mutations/subscriptions
import { FEED_QUERY } from '../graphQL/Queries.js';

function FoodList(props){
    // styling
    const theme = useTheme();
    const style = css({
        backgroundColor: theme.background,
        color: theme.body,
        gridArea: 'main',
        overflow: 'auto'
    });

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

    const isFoodsEmpty = data.groupList[0].foods.length > 0 ? true : false; // check data if there are foods in list or not
    const foods = data.groupList[0].foods; // access those foods from data

    // show data once loaded
    return(
        <main css={style}>
            <CreateFood groupId={fromGroup.id}/>
            {
                isFoodsEmpty ? 
                    foods.map(food => <FoodItem key={food.id} food={food} />) // truthy case (foods in list, so render)
                    : <h4>There's nothing here...</h4> // falsy case (no foods in list)
            }
        </main>
    );
}

export default FoodList;