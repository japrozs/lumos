import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Essay = {
  __typename?: 'Essay';
  body: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  creator: User;
  creatorId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createEssay: Essay;
  deleteEssay: Scalars['Boolean']['output'];
  forgotPassword: Scalars['Boolean']['output'];
  login: UserResponse;
  logout: Scalars['Boolean']['output'];
  register: UserResponse;
  updateCollegeList: Scalars['Boolean']['output'];
  updateEssay: Scalars['Boolean']['output'];
  updateName: Scalars['Boolean']['output'];
  updateTasks: Scalars['Boolean']['output'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreateEssayArgs = {
  title: Scalars['String']['input'];
};


export type MutationDeleteEssayArgs = {
  id: Scalars['String']['input'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};


export type MutationUpdateCollegeListArgs = {
  collegeList: Scalars['String']['input'];
};


export type MutationUpdateEssayArgs = {
  body: Scalars['String']['input'];
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationUpdateNameArgs = {
  name: Scalars['String']['input'];
};


export type MutationUpdateTasksArgs = {
  tasks: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getEssay: Essay;
  me?: Maybe<User>;
};


export type QueryGetEssayArgs = {
  id: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  collegeList: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  essays: Array<Essay>;
  id: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  tasks: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type UserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularEssayFragment = { __typename?: 'Essay', id: string, title: string, body: string, creatorId: string, createdAt: string, updatedAt: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, creatorId: string, createdAt: string, updatedAt: string }> } | null };

export type RegularUserFragment = { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, creatorId: string, createdAt: string, updatedAt: string }> };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, creatorId: string, createdAt: string, updatedAt: string }> } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, creatorId: string, createdAt: string, updatedAt: string }> } | null } };

export type UpdateCollegeListMutationVariables = Exact<{
  collegeList: Scalars['String']['input'];
}>;


export type UpdateCollegeListMutation = { __typename?: 'Mutation', updateCollegeList: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, creatorId: string, createdAt: string, updatedAt: string }> } | null };

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularEssayFragmentDoc = gql`
    fragment RegularEssay on Essay {
  id
  title
  body
  creatorId
  createdAt
  updatedAt
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  name
  email
  collegeList
  tasks
  essays {
    ...RegularEssay
  }
  createdAt
  updatedAt
  __typename
}
    ${RegularEssayFragmentDoc}`;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateCollegeListDocument = gql`
    mutation updateCollegeList($collegeList: String!) {
  updateCollegeList(collegeList: $collegeList)
}
    `;
export type UpdateCollegeListMutationFn = Apollo.MutationFunction<UpdateCollegeListMutation, UpdateCollegeListMutationVariables>;

/**
 * __useUpdateCollegeListMutation__
 *
 * To run a mutation, you first call `useUpdateCollegeListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollegeListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollegeListMutation, { data, loading, error }] = useUpdateCollegeListMutation({
 *   variables: {
 *      collegeList: // value for 'collegeList'
 *   },
 * });
 */
export function useUpdateCollegeListMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCollegeListMutation, UpdateCollegeListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCollegeListMutation, UpdateCollegeListMutationVariables>(UpdateCollegeListDocument, options);
      }
export type UpdateCollegeListMutationHookResult = ReturnType<typeof useUpdateCollegeListMutation>;
export type UpdateCollegeListMutationResult = Apollo.MutationResult<UpdateCollegeListMutation>;
export type UpdateCollegeListMutationOptions = Apollo.BaseMutationOptions<UpdateCollegeListMutation, UpdateCollegeListMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;