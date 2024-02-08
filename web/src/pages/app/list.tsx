import { CollegeList } from "@/components/shared/college-list";
import { Meta } from "@/components/shared/meta";
import { Spinner } from "@/components/shared/spinner";
import { Wrapper } from "@/components/shared/wrapper";
import { useIsAuth } from "@/utils/use-is-auth";
import Head from "next/head";
import React from "react";

interface ListProps {}

const List: React.FC<ListProps> = ({}) => {
    const { data, loading } = useIsAuth();

    return (
        <>
            <Head>
                <Meta title={"My list – Lumos"} />
                <title>College list - Lumos</title>
            </Head>
            <Wrapper>
                <div className="bg-white z-10 sticky top-0 px-4 py-3 border-b border-gray-200">
                    <p className="text-lg blair">my college list</p>
                </div>
                {!loading ? (
                    <CollegeList data={data} dataLoading={loading} />
                ) : (
                    <div className="flex flex-col items-center justify-center max-w-full min-h-screen">
                        <Spinner />
                    </div>
                )}
            </Wrapper>
        </>
    );
};

export default List;
