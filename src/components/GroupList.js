/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';
import { useQuery } from 'react-apollo';

// components
import GroupItem from './GroupItem';
import CreateGroup from './CreateGroup';

// graphQL queries/mutations/subscriptions
import {GET_GROUPS} from '../graphQL/Queries.js';

function GroupList(){    
    // styling 
    const theme = useTheme();
    const style = css`
        label: group-container;
        grid-area: aside;
        text-align: center;
        background-color: ${theme.focus};
        border: 1px solid ${theme.accent};
        border-radius: 5px;
        box-shadow: 5px 10px 20px ${theme.accent};
        ul {
            list-style: none;
            margin-block-start: 0;
            margin-block-end: 0;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-inline-start: 0px;
            overflow-y: scroll;
            overflow-x: hidden;
            max-height: 300px;
            width: 100%;
            
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
        }
        h3 {
            display: inline-block;
            margin: 2px;
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
        li {
            text-decoration: underline;
            text-align: left;
            margin: 10px;
        }
    `;

    // auth prop
    const isAuth = localStorage.getItem('token');

    // call our query, extract loading, error, data states
    const { loading, error, data } = useQuery(GET_GROUPS, {
        pollInterval: 1000
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
        <article css={style}>
            {isAuth ? (
                <CreateGroup />
            ) : null}

            <h3>Check out a group</h3>

            <ul>
                {data.groupList.map(group => <GroupItem key={group.id} group={group} />)}
            </ul>
        </article>
    );
}

export default GroupList;