import { CollegeListItem } from "@/types";
import {
    getPillBgColor,
    getPillBorderColor,
    getPillEmoji,
    getPillIcon,
    getPillTextColor,
} from "@/utils/pill";
import { toTitleCase } from "@/utils/utils";
import React, { Dispatch, SetStateAction } from "react";
import { Pill } from "../ui/pill";
import { Button } from "../ui/button";
import { FiExternalLink } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CollegeListCardProps {
    college: CollegeListItem;
    index: number;
    list: CollegeListItem[];
    setList: Dispatch<SetStateAction<CollegeListItem[]>>;
}

export const CollegeListCard: React.FC<CollegeListCardProps> = ({
    college,
    index,
    list,
    setList,
}) => {
    return (
        <>
            <div className="max-w-xs flex flex-col pb-2 m-3 rounded-2xl border border-gray-300 overflow-hidden">
                {/* <img
                    src={college.content.photos.default.crops.DesktopHeader}
                    alt=""
                    className="w-full h-20 object-cover object-center"
                /> */}
                <div className="flex items-center  px-3.5 py-2 mb-2">
                    <div className="min-w-12">
                        <img
                            src={
                                college.content.photos.default?.crops
                                    .DesktopHeader ||
                                college.badge.photoURLs.desktop
                            }
                            alt=""
                            className="w-10 h-10 rounded-md mr-2.5 object-cover object-center"
                        />
                    </div>
                    <div className="w-full truncate line-clamp-1">
                        <p className="text-xl font-bold mb-0.5 leading-tight truncate text-ellipsis">
                            {college.content.entity.name}
                        </p>
                        <p className="text-sm text-gray-400 leading-tight ">
                            {toTitleCase(
                                college.content.entity.location?.split(",")[0]
                            )}
                            ,{college.content.entity.location?.split(",")[1]}
                        </p>
                    </div>
                    <RiDeleteBin6Line
                        onClick={() => {
                            const listCopy = [...list];
                            listCopy.splice(index, 1);
                            setList(listCopy);
                        }}
                        className="ml-1.5 text-2xl self-start hover:text-red-500 cursor-pointer transition"
                    />
                </div>
                <div className="px-2  flex flex-wrap space-x-2">
                    <div className="my-0.5">
                        <Pill
                            borderColor={getPillBorderColor(college)}
                            textColor={getPillTextColor(college)}
                            bgColor={getPillBgColor(college)}
                            icon={getPillIcon(college)}
                            noMargin
                            label={`${(
                                college.content.grades[0]?.value || 1
                            )?.toFixed(2)}`}
                        />
                    </div>
                    <div className="my-0.5">
                        <Pill
                            noMargin
                            label={`💯 SAT Range ${
                                college.content.facts[2].value || 400
                            }`}
                        />
                    </div>
                    <div className="my-0.5">
                        <Pill
                            noMargin
                            label={`💰 $ ${(
                                college.content.facts[1].value || 10000
                            )?.toLocaleString()}`}
                        />
                    </div>
                    <div className="my-0.5">
                        <Pill
                            noMargin
                            label={`${getPillEmoji(
                                college
                            )}\tAcceptance rate – ${(
                                (college.content.facts[0].value || 1.0) * 100
                            )
                                .toFixed(1)
                                .toString()} %`}
                        />
                    </div>
                </div>
                {college.content.photos.mapbox_header?.crops.DesktopHeader && (
                    <img
                        className="p-2 h-28 pb-0 object-cover object-center rounded-2xl"
                        src={
                            college.content.photos.mapbox_header?.crops
                                .DesktopHeader
                        }
                    />
                )}
                {/* <div className="px-2 mt-4 mb-0 items-center flex">
                    <a
                        target="_blank"
                        href={college.content.virtualTour[0].value}
                        className="w-full"
                    >
                        <Button
                            label="Virtual tour"
                            icon={FiExternalLink}
                            colored
                        />
                    </a>
                    <RiDeleteBin6Line
                        onClick={() => {
                            const listCopy = [...list];
                            listCopy.splice(index, 1);
                            setList(listCopy);
                        }}
                        className="text-2xl ml-1.5 hover:text-red-500 cursor-pointer transition"
                    />
                </div> */}
            </div>
        </>
    );
};
