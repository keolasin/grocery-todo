import gql from 'graphql-tag';

const FEED_QUERY = gql`
    query showFeed($filter: String) {
        groupList(filter: $filter) {
            id
            createdBy {
                name
            }
            foods {
                id
                name
                quantity
                inCart
                postedBy {
                    name
                }
            }
        }
    }
`;

const GET_GROUPS = gql`
    query allGroups {
        groupList(orderBy: createdAt_DESC){
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