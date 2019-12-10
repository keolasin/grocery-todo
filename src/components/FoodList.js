/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';
import { useQuery } from 'react-apollo';

// components
import FoodItem from './FoodItem';
import CreateFood from './CreateFood';

// graphQL queries/mutations/subscriptions
import { FEED_QUERY } from '../graphQL/Queries.js';

function FoodList(props){
    // styling
    const theme = useTheme();
    const style = css`
        background-color: ${theme.focus};
        border: 1px solid ${theme.accent};
        border-radius: 5px;
        box-shadow: 5px 10px 20px ${theme.accent};
        color: ${theme.body};
        grid-area: main;
        display: grid;
        grid-template-rows: 0.25fr 0.5fr;
        grid-auto-rows: 1fr;
        overflow: auto;
        text-align: center;
        grid-template-areas:
            "title"
            "form";
        h2 {
            font-style: italic;
            grid-area: title;
            border-bottom: 1px solid ${theme.accent};
            place-self: center-stretch;
        }
        button {
            background-color: ${theme.body};
            color: ${theme.background};
            border: 1px solid ${theme.accent};
            border-radius: 5px;
            cursor: pointer;
            padding: 3%;
            margin: 2px;
            box-shadow: 2px solid ${theme.active};
            font-size: ${theme.fontSizes.tertiaryHeading};
            font-weight: bold;
        }
        button:hover {
            background-color: ${theme.hover};
        }
        button:active {
            background-color: ${theme.active};
        }
        ::-webkit-scrollbar {
            width: 10px;
            margin: 1px;
        }
        ::-webkit-scrollbar-track {
            background: ${theme.background};
        }
        ::-webkit-scrollbar-thumb {
            background: ${theme.body};
            border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: ${theme.hover};
        }
    `;

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
            <h2>Shopping List</h2>
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