import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
//import { typeDefs } from './schema';

// const schema = makeExecutableSchema({ typeDefs });
// addMockFunctionsToSchema({ schema });

// const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const networkInterface = createNetworkInterface({ uri: 'https://holly-nevzatalkan.c9users.io/graphql' });

const client = new ApolloClient({
  networkInterface
});

const UsersList = ({ data: { loading, error, users } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <ul>
    { users.map( ch => <li key={ch.id}>{ch.email}</li> ) }
  </ul>;
};

const usersListQuery = gql `
  query UserListQuery {
    users {
      id
      email
    }
  }
`;

const addUserMutation = gql `
mutation ($input: createUserInput!) {
  createUser(input: $input) {
    newUser {
      id
    }
  }
}
`;

let TodoCompleteButtonWithMutation = graphql(addUserMutation)(TodoCompleteButton);

function TodoCompleteButton({ mutate }) {
  return (
    <button onClick={() => mutate({ variables:  {"input": {
  "clientMutationId": "sadasdasdasd",
   "email": "na3@mail.com",
  	"password":"asd"
} } })}>
      Complete
    </button>
  );
}

const UsersListWithData = graphql(usersListQuery)(UsersList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to Apollo</h2>
          </div>
          <TodoCompleteButtonWithMutation />
          <UsersListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
