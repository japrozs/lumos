import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
// import { Welcome } from "@/components/ui/welcome";
// import { useIsAuth } from "@/utils/use-is-auth";
import React, { useEffect, useState } from "react";
import { LuSettings } from "react-icons/lu";
import { BiSearch, BiSortAlt2 } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { CollegeTable } from "@/components/shared/college-table";
import { MAIN_COLLEGE_LIST } from "../../data/colleges";
import { CollegeListItem } from "@/types";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { RiMapPin2Line } from "react-icons/ri";
import { PiSuitcaseSimple } from "react-icons/pi";
import { paginate, search } from "@/utils/utils";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useIsAuth } from "@/utils/use-is-auth";
import { FaRankingStar } from "react-icons/fa6";
import { Meta } from "@/components/shared/meta";
import Head from "next/head";
import { Spinner } from "@/components/shared/spinner";
import { useApolloClient } from "@apollo/client";
import { useUpdateCollegeListMutation } from "@/generated/graphql";

export default function MainApp() {
    const { data, loading } = useIsAuth();
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<CollegeListItem[]>([]);
    const [list, setList] = useState<CollegeListItem[]>(
        (
            JSON.parse(data?.me?.collegeList || '{"list" : []}') as {
                list: CollegeListItem[];
            }
        ).list
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.trim().length === 0) {
                setSearchResults([]);
            } else {
                setSearchResults(search(query));
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_SIZE = 100;

    const pagesCount = Math.ceil(MAIN_COLLEGE_LIST.length / PAGE_SIZE); // 100/10

    if (pagesCount === 1) return null;
    let pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

    const paginated_data = paginate(MAIN_COLLEGE_LIST, currentPage, PAGE_SIZE);

    const client = useApolloClient();
    const [updateCollegeListMutation] = useUpdateCollegeListMutation();

    useEffect(() => {
        console.log("start saving...", list);
        const timeout = setTimeout(async () => {
            await updateCollegeListMutation({
                variables: {
                    collegeList: JSON.stringify({ list }),
                },
            });
            await client.resetStore();
        }, 500);

        console.log("end saving...");
        return () => clearTimeout(timeout);
    }, [list]);

    return (
        <div>
            <Head>
                <Meta title={"Colleges"} />
                <title>Dashboard - Lumos</title>
            </Head>
            <Wrapper>
                <div className="bg-white z-10 sticky top-0 px-4 py-3 border-b border-gray-200">
                    <p className="text-lg blair">colleges</p>
                </div>
                {!loading ? (
                    <div className="p-4">
                        <div className="flex items-center mb-7">
                            <div className="self-center flex items-center max-w-md w-full rounded-md py-1.5 mr-5 px-2 border border-gray-300 focus-within:outline-none focus-within:border-blue-500 focus-within:ring text-gray-700 text-sm">
                                <BiSearch className="text-slate-500 text-xl" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Dunder Mifflin University"
                                    className="bg-transparent w-full focus:outline-none ml-1.5"
                                />
                                {query.trim().length != 0 && (
                                    <RxCross2
                                        onClick={() => setQuery("")}
                                        className="text-slate-500 cursor-pointer hover:text-blue-600 text-xl"
                                    />
                                )}
                            </div>
                            <div className="flex items-center ml-auto space-x-2">
                                {/* <div className="w-32">
                                <Button label="Customize" icon={LuSettings} />
                            </div>
                            <div className="w-20">
                                <Button label="Sort" icon={BiSortAlt2} />
                            </div> */}
                                {query.length === 0 && (
                                    <div className="flex items-center">
                                        <div className="flex items-centerspace-x-2">
                                            <div className="w-28">
                                                <Button
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            currentPage - 1
                                                        )
                                                    }
                                                    disabled={currentPage === 1}
                                                    label="Previous"
                                                    icon={IoChevronBack}
                                                />
                                            </div>
                                            <p className="text-lg mt-1 menlo mx-4">
                                                {currentPage}
                                            </p>
                                            <div className="w-20">
                                                <Button
                                                    onClick={() =>
                                                        setCurrentPage(
                                                            currentPage + 1
                                                        )
                                                    }
                                                    disabled={
                                                        currentPage ===
                                                        pages.length
                                                    }
                                                    label="Next"
                                                    iconRight
                                                    icon={IoChevronForward}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-t border-gray-200">
                                    <TableHead className=" border-r border-gray-200">
                                        College
                                    </TableHead>
                                    <TableHead className="border-r border-gray-200">
                                        <div className="flex items-center ">
                                            <RiMapPin2Line className="mr-1" />
                                            Location
                                        </div>
                                    </TableHead>
                                    <TableHead className="border-r border-gray-200">
                                        <div className="flex items-center">
                                            <FaRankingStar className="mr-2" />
                                            Rating
                                        </div>
                                    </TableHead>
                                    <TableHead className="">
                                        <div className="flex items-center">
                                            <PiSuitcaseSimple className="mr-1" />
                                            College Profile
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {searchResults.length === 0 &&
                                query.trim().length === 0 ? (
                                    <>
                                        {paginated_data.map(
                                            (
                                                college: CollegeListItem,
                                                idx: number
                                            ) => (
                                                <CollegeTable
                                                    key={idx}
                                                    data={college}
                                                    list={list}
                                                    setList={setList}
                                                />
                                            )
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {searchResults.map(
                                            (
                                                college: CollegeListItem,
                                                idx: number
                                            ) => (
                                                <CollegeTable
                                                    key={idx}
                                                    data={college}
                                                    list={list}
                                                    setList={setList}
                                                />
                                            )
                                        )}
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center max-w-full min-h-screen">
                        <Spinner />
                    </div>
                )}
            </Wrapper>
        </div>
    );
}
