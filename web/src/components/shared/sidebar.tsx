import Image from "next/image";
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";
import { FiCompass } from "react-icons/fi";
import { FaUniversity } from "react-icons/fa";
import { MdFormatListBulleted } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegRectangleList } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegFolderOpen } from "react-icons/fa";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { MAIN_COLLEGE_LIST } from "@/data/colleges";
import { useIsAuth } from "@/utils/use-is-auth";
import { FiLogOut } from "react-icons/fi";
import { useLogoutMutation } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const pathname = usePathname();
    const { data, loading } = useIsAuth();
    const [logout] = useLogoutMutation();
    const client = useApolloClient();
    const router = useRouter();

    const logUserOut = async () => {
        await logout();
        router.push("/");
        await client.resetStore();
    };

    return (
        <>
            {!loading && (
                <aside className="flex flex-col h-screen border-r w-60 bg-gray-50 border-gray-200">
                    <div className="px-4 py-3 z-10 border-b border-gray-200">
                        <Image
                            src="/logo.svg"
                            className="h-7 w-auto"
                            height={20}
                            width={20}
                            alt="logo"
                        />
                    </div>
                    {/* <div className="pb-16 border-b border-gray-200"> */}
                    {/* <div className="border-b border-gray-200"> */}
                    <div>
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full px-4"
                            defaultValue="explore"
                        >
                            <AccordionItem value="explore">
                                <AccordionTrigger>
                                    <div className="flex items-center">
                                        <FiCompass className="mr-2 text-lg text-slate-500" />{" "}
                                        Explore
                                    </div>
                                </AccordionTrigger>
                                <Link href="/app">
                                    <AccordionContent>
                                        <div
                                            className={`flex items-center ml-3.5 cursor-pointer rounded-md ${
                                                pathname == "/app"
                                                    ? "bg-gray-200"
                                                    : "hover:bg-gray-200"
                                            } px-3 py-1.5`}
                                        >
                                            <FaUniversity className="mr-2 text-base text-blue-500" />{" "}
                                            Colleges
                                        </div>
                                    </AccordionContent>
                                </Link>
                                <Link href="/app/list">
                                    {/* rename "Your list" to something else. it is ambigous */}
                                    <AccordionContent>
                                        <div
                                            className={`flex items-center ml-3.5 cursor-pointer rounded-md ${
                                                pathname == "/app/list"
                                                    ? "bg-gray-200"
                                                    : "hover:bg-gray-200"
                                            } px-3 py-1.5 `}
                                        >
                                            <MdFormatListBulleted className="mr-2 text-base text-purple-500" />{" "}
                                            My list
                                        </div>
                                    </AccordionContent>
                                </Link>
                            </AccordionItem>
                        </Accordion>
                        <Link href="/app/tasks">
                            <div
                                className={`flex items-center pt-1.5 px-2 pb-2 my-1 mx-2 rounded-md cursor-pointer ${
                                    pathname == "/app/tasks"
                                        ? "bg-gray-200"
                                        : "hover:bg-gray-200"
                                }`}
                            >
                                <IoMdCheckmarkCircleOutline className="mr-2 my-1 text- text-slate-500" />{" "}
                                <p className="text-sm font-medium ">
                                    Task Board
                                </p>
                            </div>
                        </Link>
                        <Link href="/app/essays">
                            <div
                                className={`flex items-center pt-1.5 px-2 my-1 mx-2 pb-2 rounded-md cursor-pointer ${
                                    pathname === "/app/essays"
                                        ? "bg-gray-200"
                                        : "hover:bg-gray-200"
                                }`}
                            >
                                <FaRegRectangleList className="mr-2 text-base text-slate-500" />{" "}
                                <p className="text-sm font-medium ">Essays</p>
                            </div>
                        </Link>

                        {/* <Link href="/app/settings">
                            <div
                                className={`flex items-center pt-1.5 px-2 pb-2 my-1 mx-2 rounded-md cursor-pointer ${
                                    pathname == "/app/settings"
                                        ? "bg-gray-200"
                                        : "hover:bg-gray-200"
                                }`}
                            >
                                <IoSettingsOutline className="mr-2 text-base text-slate-500" />{" "}
                                <p className="text-sm font-medium ">Settings</p>
                            </div>
                        </Link> */}
                    </div>
                    <div className="flex flex-col mt-auto mb-0">
                        <div className="my-2">
                            <div
                                onClick={logUserOut}
                                className="flex items-center pt-1.5 px-2 mx-2 pb-2 rounded-md cursor-pointer hover:bg-gray-200"
                            >
                                <FiLogOut className="mr-2 text-base text-red-500" />{" "}
                                <p className="text-sm text-red-500 font-medium ">
                                    Logout
                                </p>
                            </div>
                            {/* <div className="flex items-center pt-1.5 px-2 mx-2 pb-2 rounded-md cursor-pointer hover:bg-gray-200">
                            <FaRegFolderOpen className="mr-2 text-base text-slate-500" />{" "}
                            <p className="text-sm font-medium ">Collections</p>
                        </div> */}
                        </div>
                        <div className="flex items-center pt-3.5 px-4 pb-2 border-t border-gray-200 z-[0]">
                            {/* <img
                                src="https://i.redd.it/80hxyr8x3h6z.jpg"
                                className="h-8 w-8 object-cover rounded-full mr-2"
                            /> */}
                            <div className="flex flex-col truncate line-clamp-1">
                                <p className="text-sm text-slate-800 font-medium ">
                                    {data?.me?.name}
                                </p>
                                <p className="text-xs menlo text-slate-500 truncate text-ellipsis">
                                    {data?.me?.email}
                                </p>
                            </div>
                            <Link
                                href="/app/settings"
                                className="ml-auto mr-0 "
                            >
                                <FiSettings className="text-xl hover:text-slate-600 transition cursor-pointer text-slate-500" />
                            </Link>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
};
