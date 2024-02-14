import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
    const { data, loading, ...rest } = useMeQuery();
    const router: NextRouter = useRouter();
    useEffect(() => {
        if (["/login", "/signup", "/", "/verify"].includes(router.pathname)) {
            if (!loading && data?.me != null) {
                if (data.me.verified) {
                    router.push("/app");
                } else {
                    router.replace("/verify", undefined, { shallow: false });
                }
            }
            return;
        }
        // if (router.pathname == "/verify") {
        //     if (!loading && data?.me != null && data.me.verified) {
        //         router.push("/app");
        //     }
        // }
        if (!loading && !data?.me) {
            router.replace("/");
        } else if (
            !loading &&
            data?.me &&
            typeof router.query.code !== "string" &&
            !data?.me?.verified
        ) {
            router.replace("/verify", undefined, { shallow: false });
        }
    }, [loading, data, router]);
    return { data, loading, ...rest };
};
