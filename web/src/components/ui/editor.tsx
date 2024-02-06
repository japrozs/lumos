import {
    GetEssayQuery,
    useDeleteEssayMutation,
    useUpdateEssayMutation,
} from "@/generated/graphql";
import React, { useEffect, useRef, useState } from "react";
import { PiHashStraightBold } from "react-icons/pi";
import ContentEditable from "react-contenteditable";
import useAutosizeTextArea from "@/utils/utils";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./button";
import { GoShare } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { IoMdCheckmark } from "react-icons/io";
import { DeleteEssayModal } from "../modals/delete-essay";
import Head from "next/head";
import { Meta } from "../shared/meta";

interface EditorProps {
    essay: GetEssayQuery["getEssay"];
}

export const Editor: React.FC<EditorProps> = ({ essay }) => {
    const [title, setTitle] = useState(essay.title);
    const [body, setBody] = useState(essay.body);
    const client = useApolloClient();
    const [updateEssayMutation, { loading }] = useUpdateEssayMutation();
    const [open, setOpen] = useState(false);

    const titleElementRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            console.log("start saving...");
            await updateEssayMutation({
                variables: {
                    id: essay.id,
                    title: title.length === 0 ? "Untitled" : title,
                    body: body,
                },
            });
            await client.resetStore();
        }, 500);

        return () => clearTimeout(timeout);
    }, [title, body]);

    return (
        <>
            <Head>
                <Meta title={"Colleges"} />
                <title>{essay.title}</title>
            </Head>
            <div className="px-4 py-3 border-b border-gray-200">
                <div
                    style={{
                        maxWidth: "54rem",
                    }}
                    className="truncate text-ellipsis flex items-center mx-auto"
                >
                    <PiHashStraightBold className="text-xl text-slate-400 mr-3" />
                    <ContentEditable
                        innerRef={titleElementRef}
                        tagName="p"
                        html={title}
                        className="focus:outline-none text-lg blair truncate line-clamp-1 w-full"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {/* <p className="text-lg blair truncate line-clamp-1">
                        {essay.title}
                    </p> */}
                </div>
            </div>
            <div
                style={{
                    maxWidth: "54rem",
                }}
                className="px-4 mx-auto m-4 flex items-center"
            >
                <p className="text-sm font-medium text-gray-600">
                    {body.trim().length === 0 ? 0 : body.split(" ").length}{" "}
                    words
                </p>
                <div className="ml-auto flex items-center">
                    {loading ? (
                        <p className="hidden md:block mr-5 text-sm font-medium text-gray-600">
                            Saving...
                        </p>
                    ) : (
                        <div className="flex items-center mr-5 ">
                            <IoMdCheckmark className={"mr-2 text-green-500"} />
                            <p className="hidden md:block text-sm font-medium text-gray-600">
                                Saved
                            </p>
                        </div>
                    )}
                    {/* FIX – implement share functionality */}
                    {/* <div className="w-24 mr-3">
                        <Button
                            // onClick={() => setOpen(true)}
                            label="Share"
                            iconMargin={2}
                            icon={GoShare}
                        />
                    </div> */}
                    <div className="w-24">
                        <Button
                            onClick={() => setOpen(true)}
                            label="Delete"
                            colored
                            color={
                                "text-red-500 border-gray-300 hover:bg-gray-50"
                            }
                            iconMargin={2}
                            icon={AiOutlineDelete}
                        />
                    </div>
                </div>
            </div>
            <div
                style={{
                    maxWidth: "54rem",
                }}
                className="p-4 mx-auto "
            >
                {/* <pre className="menlo text-purple-500">
                    #include {"<stdio.h>\n\n"}
                    int main(void){"{\n"}
                    {"\t"}printf("hello, universe!\n");{"\n"}
                    {"\t"}return 0;
                    {"\n"}
                    {"}"}
                </pre> */}
                <TextareaAutosize
                    className="mt-5 textarea w-full break-words cursor-text resize-none focus:outline-none pb-56 mb-56"
                    placeholder="A long time ago in a galaxy far, far away..."
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                />
                {/* <span
                    className="textarea w-full cursor-text focus:outline-none h-full"
                    role="textbox"
                    contentEditable
                >
                    Start writing here...{" "}
                </span> */}
                {/* <span
                    className="textarea focus:outline-none text-md"
                    role="textbox"
                    contentEditable
                ></span> */}
                {/* <ContentEditable
                    innerRef={bodyElementRef}
                    tagName="p"
                    html={body}
                    className={`focus:outline-none`}
                    onChange={(e) => setBody(e.target.value)}
                /> */}
                {/* <ContentEditable
                    className="editable inter-var focus:outline-none"
                    tagName="p"
                    html={body} // innerHTML of the editable div
                    onChange={(e) => setBody(e.target.value)}
                /> */}
            </div>
            <DeleteEssayModal open={open} setOpen={setOpen} id={essay.id} />
        </>
    );
};
