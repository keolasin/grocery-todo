import React from 'react';

let listItem = {
    margin: '10px',
    maxWidth: 'fit-content'
};

function GroupItem(props) {
    if (props.group.isPrivate){
        return null;
    }
    return (
        <section style={listItem}>
            <h3>{props.group.name}</h3>
            <p>Created by: {props.group.createdBy.name}</p>
        </section>
    );
}

export default GroupItem;