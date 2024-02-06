import { CollegeListItem } from "@/types";
import { list } from "postcss";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { AddCollegeModal } from "../modals/add-college";
import { Button } from "../ui/button";
import { CollegeListCard } from "./college-list-card";
import { useApolloClient } from "@apollo/client";
import { MeQuery, useUpdateCollegeListMutation } from "@/generated/graphql";
import {
    searchCollegeList,
    searchCollegeWithList,
    searchEssayList,
} from "@/utils/utils";

interface CollegeListProps {
    data: MeQuery | undefined;
    dataLoading: boolean;
}

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
                    <p>
                        you have no colleges in your target list as of now.
                        click on the add college button to add potential
                        colleges to your list
                    </p>
                )}
                <div className="flex flex-wrap">
                    {query.length === 0
                        ? list.map((college: CollegeListItem, idx: number) => (
                              <CollegeListCard
                                  key={idx}
                                  index={idx}
                                  college={college}
                                  list={list}
                                  setList={setList}
                              />
                          ))
                        : searchCollegeList(query, list).map(
                              (college: CollegeListItem, idx: number) => (
                                  <CollegeListCard
                                      key={idx}
                                      index={idx}
                                      college={college}
                                      list={list}
                                      setList={setList}
                                  />
                              )
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
