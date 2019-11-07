import React, { Fragment } from 'react';

import FoodList from '../components/FoodList';
import CreateFood from '../components/CreateFood';
import GroupList from '../components/GroupList';

function Dashboard(props){
    return (
        <main>
            <GroupList />
            <CreateFood />
            <FoodList />
        </main>
    );
}

export default Dashboard;