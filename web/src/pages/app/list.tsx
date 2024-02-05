import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { BiSearch, BiSortAlt2 } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { MAIN_COLLEGE_LIST } from "../../data/colleges";
import { CollegeListItem } from "@/types";
import { CollegeListCard } from "@/components/shared/college-list-card";
import { AddCollegeModal } from "@/components/modals/add-college";
import { useIsAuth } from "@/utils/use-is-auth";
import { useUpdateCollegeListMutation } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { IoMdCheckmark } from "react-icons/io";
import { Spinner } from "@/components/shared/spinner";
import { CollegeList } from "@/components/shared/college-list";

interface ListProps {}

const List: React.FC<ListProps> = ({}) => {
    const { data, loading } = useIsAuth();

    return (
        <>
            <Wrapper>
                <div className="bg-white z-10 sticky top-0 px-4 py-3 border-b border-gray-200">
                    <p className="text-lg blair">college list</p>
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
