import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    Login(username: $username, password: $password) {
        token
        user
    }
}`;

export const SIGNUP = gql`
mutation SignUp($email: String!, $username: String!, $password: String!) {
    SignUp(email: $email, username: $username, password: $password)
}`;