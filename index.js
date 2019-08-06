const { ApolloServer, gql } = require('apollo-server');
const crypto = require('crypto');

const avatarUrl = https://ke.jumia.is/BIrhfaZwyE6103TlFUi3m9XpS2s=/fit-in/500x500/filters:fill(white):sharpen(1,0,false):quality(100)/product/35/651001/1.jpg;

const db = {
  users: [
    { id: '1', email: 'alex@gmail.com', name: 'Alex', avatarUrl },
    { id: '2', email: 'max@gmail.com', name: 'Max', avatarUrl },
  ],
  messages: [
    { id: '1', userId: '1', body: 'Hello', createdAt: Date.now() },
    { id: '2', userId: '2', body: 'Hi', createdAt: Date.now() },
    { id: '3', userId: '1', body: 'What\'s up?', createdAt: Date.now() },
  ]
}

class User {
  constructor (user) {
    Object.assign(this, user);
  }

  get message () {
    return db.messages.filter(message => message.userId === this.userId);
  }
}

const typeDefs = gql`
  type Query {
    user: [User!]!
    user(id: ID!): User
    messages: [Message!]!
  }

  type Mutation {
    addUser(email: String!, name: String): User!
  }

  type User {
    id: ID!
    email: String!
    name: String
    avatarUrl: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    body: String!
    createdAt: String!
  }
`;

const resolvers = {
  Query: {
    users: () => db.users,
    user: (root, { id }) => db.users.find(user => user.id === id),
    messages: () => db.messages,
  },

  Mutation: {
    addUser: (root, { email, name }) => {
      const user = {
        id: crypto.randomBytes(10).toString('hex'),
        email,
        name
      }

      db.users.push(user);

      return user;
    }
  },

  User: {
    messages: user => db.messages.filter(message => message.userId === user.userId)
  }
}