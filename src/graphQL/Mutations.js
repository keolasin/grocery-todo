import gql from 'graphql-tag';

const SIGNUP_MUTATION = gql`
    mutation Signup( $email: String!, $password: String!, $name: String! ){
        signup(
            email: $email
            password: $password
            name: $name
        ) {
            token
            user {
                foods {
                    name
                    quantity
                    inCart
                }
            }
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation Login( $email: String!, $password: String! ){
        login(
            email: $email
            password: $password
        ) {
            token
            user {
                foods {
                    name
                    quantity
                    inCart
                }
            }
        }
    }
`;

const ADD_FOOD = gql`
    mutation AddFood($name: String!, $quantity: Int!, $inCart: Boolean!){
        post(
            name: $name
            quantity: $quantity
            inCart: $inCart 
        ) {
            id
            name
        }
    }
`;

export {
    SIGNUP_MUTATION,
    LOGIN_MUTATION,
    ADD_FOOD
};