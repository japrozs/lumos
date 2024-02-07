import { Spinner } from "@/components/shared/spinner";
import { Button } from "@/components/ui/button";
import { useGetPublishedEssayQuery } from "@/generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import { PiHashStraightBold } from "react-icons/pi";
import ReactTextareaAutosize from "react-textarea-autosize";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import { Meta } from "@/components/shared/meta";
import Head from "next/head";

interface PublishedEssayProps {}

const PublishedEssay: React.FC<PublishedEssayProps> = ({}) => {
    const router = useRouter();
    const id = typeof router.query.id == "string" ? router.query.id : "-1";
    const { data, loading } = useGetPublishedEssayQuery({
        variables: {
            id,
        },
    });

    console.log(data?.getPublishedEssay.body);
    return (
        <>
            {data && !loading ? (
                <>
                    <Head>
                        <Meta title={"Colleges"} />
                        <title>{data.getPublishedEssay.title}</title>
                    </Head>
                    <div className="sticky top-0 z-10 px-4 py-3 border-b border-gray-200">
                        <div
                            style={{
                                maxWidth: "54rem",
                            }}
                            className="truncate text-ellipsis flex items-center mx-auto"
                        >
                            <PiHashStraightBold className="text-xl text-slate-400 mr-3" />
                            <p className="focus:outline-none text-lg blair truncate line-clamp-1 w-full">
                                {data.getPublishedEssay.title}
                            </p>
                            {/* <p className="text-lg blair truncate line-clamp-1">
                        {essay.title}
                    </p> */}
                        </div>
                    </div>
                    <div
                        style={{
                            maxWidth: "54rem",
                        }}
                        className="p-4 mx-auto "
                    >
                        <ReactTextareaAutosize
                            className="mt-5 textarea cursor-default w-full break-words caret-transparent resize-none focus:outline-none pb-56 mb-56"
                            placeholder="A long time ago in a galaxy far, far away..."
                            value={data.getPublishedEssay.body}
                            contentEditable={false}
                        />
                    </div>
                    <Link
                        target="_blank"
                        href={process.env.NEXT_PUBLIC_ORIGIN || ""}
                        className="w-40 absolute top-2 right-2 z-10"
                    >
                        <Button
                            icon={FiExternalLink}
                            iconMargin={2}
                            label="Built with Lumos"
                        />
                    </Link>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center max-w-full min-h-screen dark:bg-black-800">
                    <Spinner />
                </div>
            )}
        </>
    );
};

export default PublishedEssay;
