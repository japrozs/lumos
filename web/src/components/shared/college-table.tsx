import React, { useState } from "react";
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

interface CollegeTableProps {
    query: string;
    data: CollegeListItem;
}

export const CollegeTable: React.FC<CollegeTableProps> = ({ query, data }) => {
    return (
        <TableRow>
            <TableCell className="font-medium border-r border-gray-200">
                {data.content.entity.name}
            </TableCell>
            <TableCell className="text-gray-500 border-r border-gray-200">
                {/* convert CITY NAME, ST to City Name, ST */}
                {toTitleCase(data.content.entity.location?.split(",")[0])},
                {data.content.entity.location?.split(",")[1]}
            </TableCell>
            <TableCell className="text-gray-500 border-r border-gray-200">
                <div className="w-16">
                    {/* TODO – instead of showing 4.33, show A+  */}
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
                    label={`💯 SAT Range ${data.content.facts[2].value || 400}`}
                />
                <Pill
                    noMargin
                    label={`💰 $ ${(
                        data.content.facts[1].value || 10000
                    )?.toLocaleString()}`}
                />
                <Pill
                    noMargin
                    label={`${getPillEmoji(data)}\tAcceptance rate – ${(
                        (data.content.facts[0].value || 1.0) * 100
                    )
                        .toFixed(1)
                        .toString()} %`}
                />
            </TableCell>
        </TableRow>
    );
};
