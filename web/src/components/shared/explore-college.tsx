import { CollegeListItem } from "@/types";
import { pages } from "next/dist/build/templates/app-page";
import { list } from "postcss";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaRankingStar } from "react-icons/fa6";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { PiSuitcaseSimple } from "react-icons/pi";
import { RiMapPin2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
} from "../ui/table";
import { CollegeTable } from "./college-table";
import { MAIN_COLLEGE_LIST } from "@/data/colleges";
import { MeQuery, useUpdateCollegeListMutation } from "@/generated/graphql";
import { search, paginate } from "@/utils/utils";
import { useApolloClient } from "@apollo/client";

interface ExploreCollegeProps {
    data: MeQuery | undefined;
}

export const ExploreCollege: React.FC<ExploreCollegeProps> = ({ data }) => {
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState<CollegeListItem[]>([]);
    const [list, setList] = useState<CollegeListItem[]>(
        (
            JSON.parse(data?.me?.collegeList as string) as {
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
                                            setCurrentPage(currentPage - 1)
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
                                            setCurrentPage(currentPage + 1)
                                        }
                                        disabled={currentPage === pages.length}
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
                    {searchResults.length === 0 && query.trim().length === 0 ? (
                        <>
                            {paginated_data.map(
                                (college: CollegeListItem, idx: number) => (
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
                                (college: CollegeListItem, idx: number) => (
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
    );
};
