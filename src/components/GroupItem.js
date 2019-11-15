import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function GroupItem(props) {
    // extract group from props
    const group = props.group;

    // currently, don't show private groups
    if (group.isPrivate){
        return null;
    }

    return (
        <Fragment>
            <Link to={{
                pathname: `/groups/${group.name}`,
                state: { 
                    fromGroup: group // passing the necessary group.id along to the rendered component for that path (FoodList)
                }
            }}>{group.name}</Link>
        </Fragment>
    );
}

export default GroupItem;