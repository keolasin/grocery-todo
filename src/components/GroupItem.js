/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useTheme } from '../styles/theme/ThemeContext';
import { Link } from 'react-router-dom';

function GroupItem(props) {
    //styling
    const theme = useTheme();
    const style = css`

    `;

    // extract group from props
    const group = props.group;

    // currently, don't show private groups
    if (group.isPrivate){
        return null;
    }

    return (
        <li css={style}>
            <Link to={{
                pathname: `/groups/${group.name}`,
                state: { 
                    fromGroup: group // passing the necessary group.id along to the rendered component for that path (FoodList)
                }
            }}>{group.name}</Link>
        </li>
    );
}

export default GroupItem;