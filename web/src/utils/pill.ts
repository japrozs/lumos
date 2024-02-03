import { CollegeListItem } from "@/types";
import { IconType } from "react-icons";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { AiOutlineStock } from "react-icons/ai";

export const getPillBorderColor = (item: CollegeListItem): string => {
    const rate = item.content.grades[0].value;
    if (5 >= rate && rate > 4) {
        return "border-green-500";
    } else if (4 >= rate && rate > 3) {
        return "border-yellow-500";
    } else {
        return "border-red-500";
    }
};

export const getPillTextColor = (item: CollegeListItem): string => {
    const rate = item.content.grades[0].value;
    if (5 >= rate && rate > 4) {
        return "text-green-900";
    } else if (4 >= rate && rate > 3) {
        return "text-yellow-900";
    } else {
        return "text-red-900";
    }
};

export const getPillBgColor = (item: CollegeListItem): string => {
    const rate = item.content.grades[0].value;
    if (5 >= rate && rate > 4) {
        return "bg-green-300 bg-opacity-60";
    } else if (4 >= rate && rate > 3) {
        return "bg-yellow-300 bg-opacity-60";
    } else {
        return "bg-red-300 bg-opacity-60";
    }
};

export const getPillIcon = (item: CollegeListItem): IconType => {
    const rate = item.content.grades[0].value;
    if (5 >= rate && rate > 4) {
        return FaArrowUp;
    } else if (4 >= rate && rate > 3) {
        return AiOutlineStock;
    } else {
        return FaArrowDown;
    }
};

export const getPillEmoji = (item: CollegeListItem): string => {
    const rate = item.content.facts[0].value * 100;
    if (0 <= rate && rate < 20) {
        return "🟢";
    } else if (20 <= rate && rate <= 50) {
        return "🟡";
    } else {
        return "🔴";
    }
};
