import React from 'react';
import { Link } from 'react-router-dom';


let listItem = {
    margin: '10px',
    maxWidth: 'fit-content'
};

function GroupItem(props) {
    // extract group from props
    const group = props.group;

    // currently, don't show private groups
    if (group.isPrivate){
        return null;
    }

    return (
        <section style={listItem}>
            <Link to={{
                pathname: `/groups/${group.name}`,
                state: { 
                    fromGroup: group // passing the necessary group.id along to the rendered component for that path (FoodList)
                }
            }}>{group.name}</Link>
            <p>Created by: {group.createdBy.name}</p>
        </section>
    );
}

export default GroupItem;