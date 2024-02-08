import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CollegeListItem } from "@/types";
import { toTitleCase } from "@/utils/utils";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaRegSquarePlus, FaSquareMinus } from "react-icons/fa6";
import { toast } from "sonner";
import { ShadCNButton } from "../ui/shadcn-button";
import { TableCell, TableRow } from "../ui/table";
import {
    AcceptanceRatePill,
    FeesPill,
    RatingPill,
    SATRangePill,
} from "./component-pill";

interface CollegeTableProps {
    data: CollegeListItem;
    list: CollegeListItem[];
    setList: Dispatch<SetStateAction<CollegeListItem[]>>;
    hideAddToList?: boolean;
}

export const CollegeTable: React.FC<CollegeTableProps> = ({
    data,
    list,
    setList,
    hideAddToList,
}) => {
    const [isCollegePresentInList, setIsCollegePresentInList] = useState(
        list.some((c) => JSON.stringify(c) === JSON.stringify(data))
    );

    return (
        <TableRow>
            <TableCell className="group flex items-center font-medium border-r border-gray-200 cursor-pointer">
                <Link
                    href={`/app/college/${data.guid}`}
                    className={"flex items-center w-full"}
                >
                    <p className="group-hover:underline">
                        {data.content.entity.name}
                    </p>
                </Link>
                {!hideAddToList && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <ShadCNButton
                                    variant={"ghost"}
                                    className="ml-auto mr-0"
                                >
                                    {isCollegePresentInList ? (
                                        <FaSquareMinus
                                            onClick={() => {
                                                const index = list.findIndex(
                                                    (c) =>
                                                        JSON.stringify(c) ===
                                                        JSON.stringify(data)
                                                );
                                                if (index === -1) {
                                                    return;
                                                }
                                                const listCopy = [...list];
                                                listCopy.splice(index, 1);
                                                setList(listCopy);
                                                setIsCollegePresentInList(
                                                    false
                                                );
                                                toast.success(
                                                    "College removed from my list"
                                                );
                                            }}
                                            className="text-lg self-start text-primary-color cursor-pointer transition "
                                        />
                                    ) : (
                                        <FaRegSquarePlus
                                            onClick={() => {
                                                setList([data, ...list]);
                                                setIsCollegePresentInList(true);
                                                toast.success(
                                                    "College added to my list"
                                                );
                                            }}
                                            className="text-lg self-start text-slate-400 cursor-pointer transition "
                                        />
                                    )}
                                </ShadCNButton>
                            </TooltipTrigger>
                            {/* <TooltipContent className="bg-gray-50 text-gray-900 border border-gray-200"> */}
                            <TooltipContent>
                                {isCollegePresentInList ? (
                                    <p>Remove from my list</p>
                                ) : (
                                    <p>Add to my list</p>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
                {/* <FaSquarePlus className="ml-auto mr-2 text-xl self-start text-primary-color cursor-pointer transition " /> */}
            </TableCell>
            <TableCell className="text-gray-500 border-r border-gray-200">
                {/* convert CITY NAME, ST to City Name, ST */}
                {toTitleCase(data.content.entity.location?.split(",")[0])},
                {data.content.entity.location?.split(",")[1]}
            </TableCell>
            <TableCell className="text-gray-500 border-r border-gray-200">
                <div className="w-16">
                    <RatingPill college={data} />
                </div>
            </TableCell>
            <TableCell className="flex items-center text-right space-x-2">
                <FeesPill college={data} />
                <AcceptanceRatePill college={data} />
                <SATRangePill college={data} />
            </TableCell>
        </TableRow>
    );
};
