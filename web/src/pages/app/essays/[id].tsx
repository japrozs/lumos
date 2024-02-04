import { Spinner } from "@/components/shared/spinner";
import { Wrapper } from "@/components/shared/wrapper";
import { Editor } from "@/components/ui/editor";
import { useGetEssayQuery } from "@/generated/graphql";
import { useIsAuth } from "@/utils/use-is-auth";
import { useRouter } from "next/router";
import React from "react";

interface EssayPageProps {}

const EssayPage: React.FC<EssayPageProps> = ({}) => {
    useIsAuth();
    const router = useRouter();
    const id = typeof router.query.id == "string" ? router.query.id : "-1";
    const { data, loading } = useGetEssayQuery({
        variables: {
            id,
        },
    });
    return (
        <Wrapper>
            {data && !loading ? (
                <Editor essay={data.getEssay} />
            ) : (
                <div className="flex flex-col items-center justify-center max-w-full min-h-screen dark:bg-black-800">
                    <Spinner />
                </div>
            )}
        </Wrapper>
    );
};

export default EssayPage;
