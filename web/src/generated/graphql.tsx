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
  starred: Scalars['Boolean']['output'];
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
  starOrUnStarEssay: Scalars['Boolean']['output'];
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


export type MutationStarOrUnStarEssayArgs = {
  id: Scalars['String']['input'];
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

export type RegularEssayFragment = { __typename?: 'Essay', id: string, title: string, body: string, starred: boolean, creatorId: string, createdAt: string, updatedAt: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, starred: boolean, creatorId: string, createdAt: string, updatedAt: string }> } | null };

export type RegularUserFragment = { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, starred: boolean, creatorId: string, createdAt: string, updatedAt: string }> };

export type CreateEssayMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateEssayMutation = { __typename?: 'Mutation', createEssay: { __typename?: 'Essay', id: string, title: string, body: string, starred: boolean, creatorId: string, createdAt: string, updatedAt: string } };

export type DeleteEssayMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteEssayMutation = { __typename?: 'Mutation', deleteEssay: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, starred: boolean, creatorId: string, createdAt: string, updatedAt: string }> } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null, user?: { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, starred: boolean, creatorId: string, createdAt: string, updatedAt: string }> } | null } };

export type StarOrUnStarEssayMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type StarOrUnStarEssayMutation = { __typename?: 'Mutation', starOrUnStarEssay: boolean };

export type UpdateCollegeListMutationVariables = Exact<{
  collegeList: Scalars['String']['input'];
}>;


export type UpdateCollegeListMutation = { __typename?: 'Mutation', updateCollegeList: boolean };

export type UpdateEssayMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
}>;


export type UpdateEssayMutation = { __typename?: 'Mutation', updateEssay: boolean };

export type UpdateTasksMutationVariables = Exact<{
  tasks: Scalars['String']['input'];
}>;


export type UpdateTasksMutation = { __typename?: 'Mutation', updateTasks: boolean };

export type GetEssayQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetEssayQuery = { __typename?: 'Query', getEssay: { __typename?: 'Essay', id: string, title: string, body: string, starred: boolean, creatorId: string, createdAt: string, updatedAt: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename: 'User', id: number, name: string, email: string, collegeList: string, tasks: string, createdAt: string, updatedAt: string, essays: Array<{ __typename?: 'Essay', id: string, title: string, body: string, starred: boolean, creatorId: string, createdAt: string, updatedAt: string }> } | null };

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
  starred
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
export const CreateEssayDocument = gql`
    mutation createEssay($title: String!) {
  createEssay(title: $title) {
    ...RegularEssay
  }
}
    ${RegularEssayFragmentDoc}`;
export type CreateEssayMutationFn = Apollo.MutationFunction<CreateEssayMutation, CreateEssayMutationVariables>;

/**
 * __useCreateEssayMutation__
 *
 * To run a mutation, you first call `useCreateEssayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEssayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEssayMutation, { data, loading, error }] = useCreateEssayMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateEssayMutation(baseOptions?: Apollo.MutationHookOptions<CreateEssayMutation, CreateEssayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEssayMutation, CreateEssayMutationVariables>(CreateEssayDocument, options);
      }
export type CreateEssayMutationHookResult = ReturnType<typeof useCreateEssayMutation>;
export type CreateEssayMutationResult = Apollo.MutationResult<CreateEssayMutation>;
export type CreateEssayMutationOptions = Apollo.BaseMutationOptions<CreateEssayMutation, CreateEssayMutationVariables>;
export const DeleteEssayDocument = gql`
    mutation deleteEssay($id: String!) {
  deleteEssay(id: $id)
}
    `;
export type DeleteEssayMutationFn = Apollo.MutationFunction<DeleteEssayMutation, DeleteEssayMutationVariables>;

/**
 * __useDeleteEssayMutation__
 *
 * To run a mutation, you first call `useDeleteEssayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEssayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEssayMutation, { data, loading, error }] = useDeleteEssayMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEssayMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEssayMutation, DeleteEssayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEssayMutation, DeleteEssayMutationVariables>(DeleteEssayDocument, options);
      }
export type DeleteEssayMutationHookResult = ReturnType<typeof useDeleteEssayMutation>;
export type DeleteEssayMutationResult = Apollo.MutationResult<DeleteEssayMutation>;
export type DeleteEssayMutationOptions = Apollo.BaseMutationOptions<DeleteEssayMutation, DeleteEssayMutationVariables>;
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
export const StarOrUnStarEssayDocument = gql`
    mutation starOrUnStarEssay($id: String!) {
  starOrUnStarEssay(id: $id)
}
    `;
export type StarOrUnStarEssayMutationFn = Apollo.MutationFunction<StarOrUnStarEssayMutation, StarOrUnStarEssayMutationVariables>;

/**
 * __useStarOrUnStarEssayMutation__
 *
 * To run a mutation, you first call `useStarOrUnStarEssayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStarOrUnStarEssayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [starOrUnStarEssayMutation, { data, loading, error }] = useStarOrUnStarEssayMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStarOrUnStarEssayMutation(baseOptions?: Apollo.MutationHookOptions<StarOrUnStarEssayMutation, StarOrUnStarEssayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StarOrUnStarEssayMutation, StarOrUnStarEssayMutationVariables>(StarOrUnStarEssayDocument, options);
      }
export type StarOrUnStarEssayMutationHookResult = ReturnType<typeof useStarOrUnStarEssayMutation>;
export type StarOrUnStarEssayMutationResult = Apollo.MutationResult<StarOrUnStarEssayMutation>;
export type StarOrUnStarEssayMutationOptions = Apollo.BaseMutationOptions<StarOrUnStarEssayMutation, StarOrUnStarEssayMutationVariables>;
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
export const UpdateEssayDocument = gql`
    mutation updateEssay($id: String!, $title: String!, $body: String!) {
  updateEssay(id: $id, title: $title, body: $body)
}
    `;
export type UpdateEssayMutationFn = Apollo.MutationFunction<UpdateEssayMutation, UpdateEssayMutationVariables>;

/**
 * __useUpdateEssayMutation__
 *
 * To run a mutation, you first call `useUpdateEssayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEssayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEssayMutation, { data, loading, error }] = useUpdateEssayMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useUpdateEssayMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEssayMutation, UpdateEssayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEssayMutation, UpdateEssayMutationVariables>(UpdateEssayDocument, options);
      }
export type UpdateEssayMutationHookResult = ReturnType<typeof useUpdateEssayMutation>;
export type UpdateEssayMutationResult = Apollo.MutationResult<UpdateEssayMutation>;
export type UpdateEssayMutationOptions = Apollo.BaseMutationOptions<UpdateEssayMutation, UpdateEssayMutationVariables>;
export const UpdateTasksDocument = gql`
    mutation updateTasks($tasks: String!) {
  updateTasks(tasks: $tasks)
}
    `;
export type UpdateTasksMutationFn = Apollo.MutationFunction<UpdateTasksMutation, UpdateTasksMutationVariables>;

/**
 * __useUpdateTasksMutation__
 *
 * To run a mutation, you first call `useUpdateTasksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTasksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTasksMutation, { data, loading, error }] = useUpdateTasksMutation({
 *   variables: {
 *      tasks: // value for 'tasks'
 *   },
 * });
 */
export function useUpdateTasksMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTasksMutation, UpdateTasksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTasksMutation, UpdateTasksMutationVariables>(UpdateTasksDocument, options);
      }
export type UpdateTasksMutationHookResult = ReturnType<typeof useUpdateTasksMutation>;
export type UpdateTasksMutationResult = Apollo.MutationResult<UpdateTasksMutation>;
export type UpdateTasksMutationOptions = Apollo.BaseMutationOptions<UpdateTasksMutation, UpdateTasksMutationVariables>;
export const GetEssayDocument = gql`
    query getEssay($id: String!) {
  getEssay(id: $id) {
    ...RegularEssay
  }
}
    ${RegularEssayFragmentDoc}`;

/**
 * __useGetEssayQuery__
 *
 * To run a query within a React component, call `useGetEssayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEssayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEssayQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEssayQuery(baseOptions: Apollo.QueryHookOptions<GetEssayQuery, GetEssayQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEssayQuery, GetEssayQueryVariables>(GetEssayDocument, options);
      }
export function useGetEssayLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEssayQuery, GetEssayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEssayQuery, GetEssayQueryVariables>(GetEssayDocument, options);
        }
export function useGetEssaySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEssayQuery, GetEssayQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEssayQuery, GetEssayQueryVariables>(GetEssayDocument, options);
        }
export type GetEssayQueryHookResult = ReturnType<typeof useGetEssayQuery>;
export type GetEssayLazyQueryHookResult = ReturnType<typeof useGetEssayLazyQuery>;
export type GetEssaySuspenseQueryHookResult = ReturnType<typeof useGetEssaySuspenseQuery>;
export type GetEssayQueryResult = Apollo.QueryResult<GetEssayQuery, GetEssayQueryVariables>;
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