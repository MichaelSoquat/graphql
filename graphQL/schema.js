const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type User {
        _id: ID!
        email: String!
        name: String!
        password: String
    }


    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type AuthData {
        userId: ID!
        token: String!
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    

`)