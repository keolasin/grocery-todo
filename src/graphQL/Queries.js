import gql from 'graphql-tag';

const FEED_QUERY = gql`
    {
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

export default FEED_QUERY;