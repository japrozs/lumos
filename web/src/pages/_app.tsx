import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextTransitionBar from "next-transition-bar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    credentials: "include",
    cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <NextTransitionBar color={"#007AFF"} showSpinner={false} />
            <Component {...pageProps} />
        </ApolloProvider>
    );
}
