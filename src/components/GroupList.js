/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from 'emotion-theming';
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
        grid-area: group;
    `;

    const listStyle = css`
    
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
        <aside css={style}>
            {isAuth ? (
                <CreateGroup />
            ) : null}

            <h3>Check out a group below:</h3>

            <ul css={listStyle}>
                {data.groupList.map(group => <GroupItem key={group.id} group={group} />)}
            </ul>
        </aside>
    );
}

export default GroupList;