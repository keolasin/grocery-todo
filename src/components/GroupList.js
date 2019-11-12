import React from 'react';
import { useQuery } from 'react-apollo';

// components
import GroupItem from './GroupItem';
import CreateGroup from './CreateGroup';

// graphQL queries/mutations/subscriptions
import {GET_GROUPS} from '../graphQL/Queries.js';

const container = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start'
};

function GroupList(props){    
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
        <article style={container}>
            {isAuth ? (
                
                <CreateGroup />
                
            ) : null}
            {data.groupList.map(group => <GroupItem key={group.id} group={group} />)}
        </article>
    );
}

export default GroupList;