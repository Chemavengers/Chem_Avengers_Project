const { gql } = require("apollo-server-express");

const typeDefs = gql`
    enum Gender {
        male
        female
        trans
        nonbinary
    }

    type User {
        id: ID!
        username: String!
        email: String!
        age: Int!
        gender: Gender
        bio: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        GetSelf: User
    }

    type Mutation {
        Login(username: String!, password: String!): Auth
        SignUp(email: String!, username: String!, password: String!): String
        ResetPassword(password: String!): Boolean
    }
`;

module.exports = typeDefs;