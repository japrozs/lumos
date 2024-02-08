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
import { ExploreCollege } from "@/components/shared/explore-college";

export default function MainApp() {
    const { data, loading } = useIsAuth();
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
                    <ExploreCollege data={data} />
                ) : (
                    <div className="flex flex-col items-center justify-center max-w-full min-h-screen">
                        <Spinner />
                    </div>
                )}
            </Wrapper>
        </div>
    );
}
