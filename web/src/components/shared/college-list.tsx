import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { MeQuery, useUpdateCollegeListMutation } from "@/generated/graphql";
import { CollegeListItem } from "@/types";
import { searchCollegeList } from "@/utils/utils";
import { useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaRankingStar } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { IoListOutline } from "react-icons/io5";
import { PiSquaresFourFill, PiSuitcaseSimple } from "react-icons/pi";
import { RiMapPin2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { AddCollegeModal } from "../modals/add-college";
import { Button } from "../ui/button";
import { ShadCNButton } from "../ui/shadcn-button";
import { CollegeListCard } from "./college-list-card";
import { CollegeTable } from "./college-table";

interface CollegeListProps {
    data: MeQuery | undefined;
    dataLoading: boolean;
}

const CollegeTableWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
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
            <TableBody>{children}</TableBody>
        </Table>
    );
};

export const CollegeList: React.FC<CollegeListProps> = ({
    data,
    dataLoading,
}) => {
    const client = useApolloClient();
    const [updateCollegeListMutation, { loading }] =
        useUpdateCollegeListMutation();
    const [query, setQuery] = useState("");
    const [list, setList] = useState<CollegeListItem[]>(
        (
            JSON.parse(data?.me?.collegeList || '{"list" : []}') as {
                list: CollegeListItem[];
            }
        ).list
    );
    const [open, setOpen] = useState(false);
    const [showAsCards, setShowAsCards] = useState(true);

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
        <>
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
                        {loading ? (
                            <p className="hidden md:block mr-5 text-sm font-medium text-gray-600">
                                Saving...
                            </p>
                        ) : (
                            <div className="flex items-center mr-5">
                                <IoMdCheckmark
                                    className={"mr-2 text-green-500"}
                                />
                                <p className="hidden md:block text-sm font-medium text-gray-600">
                                    Saved
                                </p>
                            </div>
                        )}
                        <div className="flex items-center w-20">
                            {showAsCards ? (
                                <>
                                    <PiSquaresFourFill className="mr-4 cursor-default text-2xl self-start text-primary-color transition " />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger
                                                asChild
                                                className="p-0 m-0 transition "
                                            >
                                                <ShadCNButton
                                                    variant={"ghost"}
                                                    className="p-0"
                                                >
                                                    <IoListOutline
                                                        onClick={() =>
                                                            setShowAsCards(
                                                                false
                                                            )
                                                        }
                                                        className="text-2xl hover:bg-gray-100 rounded self-start text-slate-600 cursor-pointer transition "
                                                    />
                                                </ShadCNButton>
                                            </TooltipTrigger>
                                            {/* <TooltipContent className="bg-gray-50 text-gray-900 border border-gray-200"> */}
                                            <TooltipContent>
                                                <p>Show as list</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </>
                            ) : (
                                <>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger
                                                asChild
                                                className="p-0 m-0 transition"
                                            >
                                                <ShadCNButton
                                                    variant={"ghost"}
                                                    className="p-0"
                                                >
                                                    <PiSquaresFourFill
                                                        onClick={() =>
                                                            setShowAsCards(true)
                                                        }
                                                        className="mr-4 hover:bg-gray-100 rounded cursor-pointer text-2xl self-start text-slate-400 transition"
                                                    />
                                                </ShadCNButton>
                                            </TooltipTrigger>
                                            {/* <TooltipContent className="bg-gray-50 text-gray-900 border border-gray-200"> */}
                                            <TooltipContent>
                                                <p>Show as cards</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <IoListOutline className="text-2xl self-start text-primary-color cursor-default transition" />
                                </>
                            )}
                        </div>
                        <div className="w-32">
                            <Button
                                onClick={() => setOpen(true)}
                                label="Add college"
                                icon={FiPlus}
                            />
                        </div>
                    </div>
                </div>
                {list.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full h-full p-24">
                        <p className="text-slate-500 menlo">
                            Add colleges to your list
                        </p>
                    </div>
                )}
                {showAsCards ? (
                    <div className="flex flex-wrap">
                        {query.length === 0
                            ? list.map(
                                  (college: CollegeListItem, idx: number) => (
                                      <>
                                          {showAsCards && (
                                              <CollegeListCard
                                                  key={idx}
                                                  index={idx}
                                                  college={college}
                                                  list={list}
                                                  setList={setList}
                                              />
                                          )}
                                      </>
                                  )
                              )
                            : searchCollegeList(query, list).map(
                                  (college: CollegeListItem, idx: number) => (
                                      <>
                                          {showAsCards && (
                                              <CollegeListCard
                                                  key={idx}
                                                  index={idx}
                                                  college={college}
                                                  list={list}
                                                  setList={setList}
                                              />
                                          )}
                                      </>
                                  )
                              )}
                    </div>
                ) : (
                    <CollegeTableWrapper>
                        {query.length === 0
                            ? list.map(
                                  (college: CollegeListItem, idx: number) => (
                                      <>
                                          <CollegeTable
                                              key={idx}
                                              data={college}
                                              list={list}
                                              setList={setList}
                                              hideAddToList
                                          />
                                      </>
                                  )
                              )
                            : searchCollegeList(query, list).map(
                                  (college: CollegeListItem, idx: number) => (
                                      <>
                                          <CollegeTable
                                              key={idx}
                                              data={college}
                                              list={list}
                                              setList={setList}
                                              hideAddToList
                                          />
                                      </>
                                  )
                              )}
                    </CollegeTableWrapper>
                )}
                {query.length != 0 &&
                    searchCollegeList(query, list).length === 0 && (
                        <div className="flex flex-col items-center justify-center w-full h-full p-24">
                            <p className="text-slate-500 menlo">
                                No results found
                            </p>
                        </div>
                    )}
            </div>
            <AddCollegeModal
                open={open}
                setOpen={setOpen}
                list={list}
                setList={setList}
            />
        </>
    );
};
