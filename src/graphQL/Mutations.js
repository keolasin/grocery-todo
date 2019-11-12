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
    mutation AddFood($name: String!, $quantity: Int!, $inCart: Boolean!, $groupId: ID!){
        createFood(
            name: $name
            quantity: $quantity
            inCart: $inCart 
            groupId: $groupId
        ) {
            id
            name
        }
    }
`;

const UPDATE_FOOD = gql`
    mutation updateFood($id: ID!, $name: String!, $quantity: Int!, $inCart: Boolean!){
        updateFood(
            id: $id
            name: $name
            quantity: $quantity
            inCart: $inCart
        ) {
            id
            name
            quantity
            inCart
        }
    }
`;

const DELETE_FOOD = gql`
    mutation deleteFood($id: ID!){
        deleteFood(
            id: $id
        ) {
            name
        }
    }
`;

const CREATE_GROUP = gql`
    mutation CreateGroup($name: String!, $isPrivate: Boolean!){
        createGroup(
            name: $name
            isPrivate: $isPrivate
        ) {
            name
            isPrivate
        }
    }
`;

export {
    SIGNUP_MUTATION,
    LOGIN_MUTATION,
    CREATE_GROUP,
    ADD_FOOD,
    UPDATE_FOOD,
    DELETE_FOOD
};