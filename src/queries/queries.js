import { gql } from 'apollo-boost'; //for get

const LOGIN_USER = gql`
	mutation($email: String!, $password: String!) {
		login(input: { email: $email, password: $password }) {
			user {
				id
				email
				name
			}
		}
	}
`;

export { LOGIN_USER };
