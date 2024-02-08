import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { CollegeListItem } from "@/types";
import { Pill } from "../ui/pill";
import {
    getPillBgColor,
    getPillBorderColor,
    getPillEmoji,
    getPillIcon,
    getPillTextColor,
} from "@/utils/pill";
import { toTitleCase } from "@/utils/utils";
import { FaRegSquarePlus, FaSquarePlus } from "react-icons/fa6";
import { FaSquareMinus } from "react-icons/fa6";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ShadCNButton } from "../ui/shadcn-button";
import { Observable, ObservableQuery, useApolloClient } from "@apollo/client";
import { useUpdateCollegeListMutation } from "@/generated/graphql";
import { toast } from "sonner";
import Link from "next/link";

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
                    <Pill
                        borderColor={getPillBorderColor(data)}
                        textColor={getPillTextColor(data)}
                        bgColor={getPillBgColor(data)}
                        icon={getPillIcon(data)}
                        noMargin
                        label={`${(data.content.grades[0]?.value || 1)?.toFixed(
                            2
                        )}`}
                    />
                </div>
            </TableCell>
            <TableCell className="flex items-center text-right space-x-2">
                <Pill
                    noMargin
                    label={`$ ${
                        data.content.complete_profile
                            ? data.content.complete_profile.cost.net_price.split(
                                  "$"
                              )[1]
                            : (
                                  data.content.facts[1].value || 10000
                              )?.toLocaleString()
                    }`}
                />
                <Pill
                    noMargin
                    label={`${getPillEmoji(data)}\tAcceptance rate – ${(
                        (data.content.facts[0].value || 1.0) * 100
                    )
                        .toFixed(1)
                        .toString()} %`}
                />
                <Pill
                    noMargin
                    label={`🎓 SAT Range ${data.content.facts[2].value || 400}`}
                />
            </TableCell>
        </TableRow>
    );
};
