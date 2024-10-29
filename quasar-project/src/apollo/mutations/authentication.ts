// version: 1.0.0
// Description: Apollo mutations for authentication

import gql from 'graphql-tag';

const loginWithTokenMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      permissions
    }
  }
`;

export { loginWithTokenMutation };
