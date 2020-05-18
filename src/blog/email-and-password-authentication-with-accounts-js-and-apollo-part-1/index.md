---
title: Email and password authentication with accounts-js and Apollo GraphQL - Part 1
date: '02/17/2020'
description: 'Part 1 - setting up the GraphQL server'
---

## What is accounts-js?

**[accounts-js](https://github.com/accounts-js/accounts) is a fullstack authentication and accounts-management for Javascript.** We provide you a set of tools to authenticate and manage your users in your application. These tools work with REST, GraphQL and are database agnostic.

I am writing a few articles to demonstrate how you can use accounts-js in your app, hope you will like them :).
**Part 2 will be a react application** with all the functionalities you expect from a modern app (login, signup, reset password, protected routes etc..).

Today, we will implement the Authentication GraphQL API in NodeJS using accounts-js and Apollo. **Note: You can also this tutorial and replace Apollo with graphql-js**
At the end of this article our server will be able to sign up new users, allow the users to login and authenticate them to protect some restricted information.

_At the end of this post, you can find a link to a repository containing the sources._

## Table of contents

- [Requirements](#requirements)
- [Setup the node project](#setup-the-node-project)
- [Setup accounts-js](#setup-accountsjs)
- [Creating our first user](#creating-our-first-user)
- [Protecting our query](#protecting-our-query)

## Requirements

For this project, you will need to have nodejs and mongodb installed on your system.

## Setup the node project

Let's start by creating our NodeJS project. Create a new folder named `accounts-js-server`, all the project files should be inside this folder.
Let's initialize our new project using `npm` (you can use `yarn` if you prefer):

```
npm init
```

Now, let's add the dependencies we need to setup our Apollo GraphQL server.

```
npm install apollo-server graphql
```

Create a new `index.js` file (to make this tutorial simpler all our code will be in a single file) and add this code to setup the Apollo server. _If you want to read more about what this code is about you can take a look at the [Apollo Server documentation](https://www.apollographql.com/docs/apollo-server/getting-started/)._

```javascript
// index.js

const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    # This query will be protected so only authenticated users can access it
    sensitiveInformation: String
  }
`;

const resolvers = {
  Query: {
    sensitiveInformation: () => 'Sensitive info',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

Now let's start the server to make sure everything is working as expected.

```
node index.js
```

In your console you should see:

```
🚀  Server ready at http://localhost:4000/
```

Our GraphQL server is now ready, it's time to add accounts-js!

## Setup accounts-js

First, we will setup mongoose and connect to our database.

```
npm install @accounts/mongo mongoose
```

```javascript
// index.js

const mongoose = require('mongoose');
const { Mongo } = require('@accounts/mongo');

// We connect mongoose to our local mongodb database
mongoose.connect('mongodb://localhost:27017/accounts-js-server', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// We tell accounts-js to use the mongo connection
const accountsMongo = new Mongo(mongoose.connection);
```

Then, we add the accounts-js server dependencies.

```
npm install @accounts/server @accounts/password
```

- `@accounts/server`: The accounts-js core dependency.
- `@accounts/password`: The accounts-js password service, it expose a set of function to manage and authenticate users using email + password.

It's time to setup the accounts-js server configuration

```javascript
// index.js

const { AccountsServer } = require('@accounts/server');
const { AccountsPassword } = require('@accounts/password');

const accountsPassword = new AccountsPassword({
  // You can customise the behavior of the password service by providing some options
});

const accountsServer = new AccountsServer(
  {
    // We link the mongo adapter we created in the previous step to the server
    db: accountsMongo,
    // Replace this value with a strong random secret
    tokenSecret: 'my-super-random-secret',
  },
  {
    // We pass a list of services to the server, in this example we just use the password service
    password: accountsPassword,
  }
);
```

Then, we add the accounts-js graphql dependencies.

```
npm install @accounts/graphql-api @graphql-toolkit/schema-merging @graphql-modules/core
```

- `@accounts/graphql-api`: The transport layer exposing all the queries and mutations accounts-js provide.
- `@graphql-toolkit/schema-merging`: Expose a set of tools that will help us to merge our schemas.
- `@graphql-modules/core`: An internal dependency that accounts-js use to manage his graphql schema and resolvers.

Let's merge the accounts-js GraphQL schema and our schema, so the user can access it

```javascript
// index.js

// Add makeExecutableSchema to the imported variables
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging');
const { AccountsModule } = require('@accounts/graphql-api');

// We generate the accounts-js GraphQL module
const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

// A new schema is created combining our schema and the accounts-js schema
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
  resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
  schemaDirectives: {
    ...accountsGraphQL.schemaDirectives,
  },
});

// When we instantiate our Apollo server we use the schema and context properties
const server = new ApolloServer({
  schema,
  context: accountsGraphQL.context,
});
```

At the end, our file should look like this:

```javascript
// index.js

const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server');
const mongoose = require('mongoose');
const { Mongo } = require('@accounts/mongo');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging');
const { AccountsServer } = require('@accounts/server');
const { AccountsPassword } = require('@accounts/password');
const { AccountsModule } = require('@accounts/graphql-api');

// We connect mongoose to our local mongodb database
mongoose.connect('mongodb://localhost:27017/accounts-js-server', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const accountsMongo = new Mongo(mongoose.connection);

const typeDefs = gql`
  type Query {
    # This query will be protected so only authenticated users can access it
    sensitiveInformation: String
  }
`;

const resolvers = {
  Query: {
    sensitiveInformation: () => 'Sensitive info',
  },
};

const accountsPassword = new AccountsPassword({});

const accountsServer = new AccountsServer(
  {
    db: accountsMongo,
    // Replace this value with a strong secret
    tokenSecret: 'my-super-random-secret',
  },
  {
    password: accountsPassword,
  }
);

// We generate the accounts-js GraphQL module
const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

// A new schema is created combining our schema and the accounts-js schema
const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
  resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
  schemaDirectives: {
    ...accountsGraphQL.schemaDirectives,
  },
});

const server = new ApolloServer({ schema, context: accountsGraphQL.context });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

If we restart our server and visit http://localhost:4000/, we should see that the accounts-js queries and mutations are merged with our schema. Our authentication server is now ready 🚀.

![GraphiQL](https://dev-to-uploads.s3.amazonaws.com/i/ud3ptilvz38a2k7pizs2.png)

## Creating our first user

Inside the GraphQL Playground, let's execute the following mutation:

```graphql
mutation {
  createUser(
    user: { email: "john.doe@john.com", password: "superSecurePassword" }
  )
}
```

Congrats, our first user has been created 👏!

If you take a look at the `users` collection inside mongodb you should see that your user was created and looks like this:

```json
{
  "_id": ObjectId("5e3da6ba13ef1a137bbc8fe4"),
  "services": {
    "password": {
      "bcrypt": "$2a$10$WwhjvbDzQpS2LrdkcgQJwODn.EE95T0b9NmMUNcHKyrDOlXEeybSq"
    }
  },
  "createdAt": 1581098682713,
  "updatedAt": 1581098682713,
  "emails": [
    {
      "address": "john.doe@john.com",
      "verified": false
    }
  ]
}
```

What we can see is that a `createdAt` and `updatedAt` fields have been created. We also see that the password has been saved hashed in the database, we use bcrypt as a default but you can change it to argon2 via the options if you prefer.

Now let's try to login with this user:

```graphql
mutation {
  authenticate(
    serviceName: "password"
    params: {
      user: { email: "john.doe@john.com" }
      password: "superSecurePassword"
    }
  ) {
    sessionId
    tokens {
      accessToken
      refreshToken
    }
  }
}
```

You should see in the playground that a new session has been created.
The session is represented by:

- a sessionId (you can check the session in the database)
- a short lived JWT accessToken used to authenticate the user
- a long lived refreshToken that can be used to get a new accessToken once it's expired

Save the access token, we will need it to authenticate our requests in the next part.

## Protecting our query

Our first user has been created and we are now able to login via the API. Next step is to protect our `sensitiveInformation` query so only the authenticated users can access it.

accounts-js provide an `@auth` directive that we can use to protect our private queries.

Let's add the directive to the query in our schema:

```javascript
// index.js

const typeDefs = gql`
  type Query {
    # We add the @auth directive
    sensitiveInformation: String @auth
  }
`;
```

If you try this query, you should get an `Unauthorized` error 🛑.
We can't access this resource because we are not authenticated.
To authenticate our request with the server we need to add the access token saved previously as a header of the request. The header key should be `authorization` and the value should be prefixed with `Bearer`.
eg: `{ "authorization": "Bearer my-access-token" }`

![GrapiQL](https://dev-to-uploads.s3.amazonaws.com/i/tkat54liy7txdsf8aa08.png)

You made your first authenticated query, how cool is that?

Well, that's it, you are done, you now have a Graphql server that can register and authenticate new users. Pretty simple right?
Next step for you is to play with the different queries and mutations (verify the email, change the password etc..) :).

⌛ **In part 2** we will create the react application that will communicate with our server (coming soon).

You can find the source here https://github.com/pradel/accounts-js-server-tutorial.
