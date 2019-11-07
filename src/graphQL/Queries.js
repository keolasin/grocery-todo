import gql from 'graphql-tag';

const FEED_QUERY = gql`
    query showFeed {
        feed {
            id
            name
            quantity
            inCart
            postedBy {
                name
            }
        }
    }
`;

const GET_GROUPS = gql`
    query showFirstFive {
        groupList(first: 5){
            id
            name
            isPrivate
            createdBy {
                name
            }
        }
    }
`;

export {
    FEED_QUERY,
    GET_GROUPS,
};