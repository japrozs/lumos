import {
    GetEssayQuery,
    usePublishOrUnPublishEssayMutation,
    useUpdateEssayMutation,
} from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import Head from "next/head";
import Link from "next/link";
import React, { Fragment, LegacyRef, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { AiOutlineDelete } from "react-icons/ai";
import { CgBrowser } from "react-icons/cg";
import { GoShare } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
import { PiHashStraightBold } from "react-icons/pi";
import { VscGlobe } from "react-icons/vsc";
import TextareaAutosize from "react-textarea-autosize";
import { DeleteEssayModal } from "../modals/delete-essay";
import { Meta } from "../shared/meta";
import { Button } from "./button";

interface EditorProps {
    essay: GetEssayQuery["getEssay"];
}

export const Editor: React.FC<EditorProps> = ({ essay }) => {
    const [title, setTitle] = useState(essay.title);
    const [body, setBody] = useState(essay.body);
    const client = useApolloClient();
    const [updateEssayMutation, { loading }] = useUpdateEssayMutation();
    const [publishOrUnpublishEssayMutation, { loading: publishLoading }] =
        usePublishOrUnPublishEssayMutation();
    const [open, setOpen] = useState(false);
    const publishButtonRef = useRef<HTMLButtonElement>();

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

    const publishOrUnpublishEssay = async () => {
        await publishOrUnpublishEssayMutation({
            variables: {
                id: essay.id,
            },
        });
        await client.resetStore();
    };

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
            {essay.published && (
                <div className="py-2 bg-blue-100 mb-2">
                    <div
                        style={{
                            maxWidth: "54rem",
                        }}
                        className="px-4 mx-auto flex items-center justify-center"
                    >
                        <p className="text-primary-color border-none text-sm font-medium">
                            This page is live on the internet
                        </p>
                        <Link
                            target="_blank"
                            href={`/view/${essay.id}`}
                            className="flex items-center mx-4 hover:bg-blue-200 px-1.5 py-1 transition rounded-md"
                        >
                            <VscGlobe className="text-primary-color mr-1.5" />
                            <p className="text-primary-color border-none text-sm">
                                View site
                            </p>
                        </Link>
                        <div
                            onClick={() => publishButtonRef.current?.click()}
                            className="flex items-center cursor-pointer hover:bg-blue-200 px-1.5 py-1 transition rounded-md"
                        >
                            <LuSettings className="text-primary-color mr-1.5" />
                            <p className="text-primary-color border-none text-sm">
                                Site settings
                            </p>
                        </div>
                    </div>
                </div>
            )}
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
                    <Menu as="div" className="w-28 mr-3">
                        <div>
                            <Menu.Button className="w-28">
                                <Button
                                    buttonRef={
                                        publishButtonRef as
                                            | LegacyRef<HTMLButtonElement>
                                            | undefined
                                    }
                                    // onClick={() => setOpen(true)}
                                    label={`Publish`}
                                    iconMargin={2}
                                    icon={GoShare}
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className={
                                    "absolute mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow focus:outline-none border border-gray-200"
                                }
                            >
                                {essay.published ? (
                                    <>
                                        <div className="p-3">
                                            <div className="flex items-center">
                                                {/* <IoIosCheckmarkCircle className="text-primary-color mr-2" /> */}
                                                <svg
                                                    role="graphics-symbol"
                                                    viewBox="0 0 16 16"
                                                    className="blueCircleDot mr-1.5"
                                                    style={{
                                                        width: "17px",
                                                        height: "17px",
                                                        display: "block",
                                                        fill: "inherit",
                                                        flexShrink: "0",
                                                    }}
                                                >
                                                    <circle
                                                        cx="8"
                                                        cy="8"
                                                        r="8"
                                                        fill="none"
                                                        stroke="#2383E2"
                                                    >
                                                        <animate
                                                            attributeName="r"
                                                            from="3"
                                                            to="8"
                                                            dur="1s"
                                                            begin="0s"
                                                            repeatCount="indefinite"
                                                        ></animate>
                                                        <animate
                                                            attributeName="opacity"
                                                            from="1"
                                                            to="0"
                                                            dur="1s"
                                                            begin="0s"
                                                            repeatCount="indefinite"
                                                        ></animate>
                                                    </circle>
                                                    <circle
                                                        cx="8"
                                                        cy="8"
                                                        r="3"
                                                        fill="#2383E2"
                                                    ></circle>
                                                </svg>
                                                <p className="text-primary-color border-none text-sm font-medium">
                                                    Live on the web.
                                                </p>
                                            </div>
                                            <p
                                                className={
                                                    "text-slate-600 group menlo overflow-x-scroll transition-all text-xs placeholder-gray-600 py-1.5 px-3 mt-2.5 mb-1.5 bg-white border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-border-blue-100"
                                                }
                                            >
                                                {process.env.NEXT_PUBLIC_ORIGIN}
                                                /view/
                                                {essay.id}
                                            </p>
                                            <p className="mt-1 text-slate-500 border-none text-xs">
                                                Your essay is live on the
                                                internet. Copy the link above to
                                                access the website.
                                            </p>
                                        </div>
                                        <div className="mt-full mb-0 p-2 border-none flex items-center space-x-1.5">
                                            <Button
                                                loading={publishLoading}
                                                onClick={
                                                    publishOrUnpublishEssay
                                                }
                                                label="Unpublish"
                                            />
                                            <Link
                                                target="_blank"
                                                href={`/view/${essay.id}`}
                                                className="w-full"
                                            >
                                                <Button
                                                    icon={VscGlobe}
                                                    iconMargin={2}
                                                    label="View site"
                                                    colored
                                                />
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-8 pb-4 min-h-40  flex flex-col items-center justify-center ">
                                            <CgBrowser className="text-2xl text-slate-400" />
                                            <p className="mt-1 text-slate-500 border-none text-sm font-medium">
                                                Publish to the web
                                            </p>
                                            <p className="mt-1 text-slate-400 text-center border-none text-sm">
                                                Publish a static website of this
                                                page for others to see.
                                            </p>
                                        </div>
                                        <div className="p-2 border-none">
                                            <Button
                                                loading={publishLoading}
                                                onClick={
                                                    publishOrUnpublishEssay
                                                }
                                                label="Publish"
                                                colored
                                            />
                                        </div>
                                    </>
                                )}
                            </Menu.Items>
                        </Transition>
                    </Menu>
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
