import { gql } from 'apollo-boost';  //for get

const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
        name
    }
  }
`

export { LOGIN_USER };