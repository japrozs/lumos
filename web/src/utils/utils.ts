import { MAIN_COLLEGE_LIST } from "@/pages/data/colleges";
import { CollegeListItem } from "@/types";

export const toTitleCase = (str: string) => {
    return str?.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

export const paginate = (
    items: CollegeListItem[],
    pageNumber: number,
    pageSize: number
) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
};

export const search = (query: string): CollegeListItem[] => {
    const results = MAIN_COLLEGE_LIST.filter((college) => {
        return college.content.entity.name
            .trim()
            .replaceAll("-", "")
            .replaceAll(".", "")
            .split(" ")
            .join("")
            .toLowerCase()
            .includes(
                query
                    .trim()
                    .replaceAll("-", "")
                    .replaceAll(".", "")
                    .split(" ")
                    .join("")
                    .toLowerCase()
            );
    });
    console.log(results);
    return results;
};

export const searchCollegeWithList = (
    query: string,
    list: CollegeListItem[]
): CollegeListItem[] => {
    const results = MAIN_COLLEGE_LIST.filter((college) => {
        return (
            college.content.entity.name
                .trim()
                .replaceAll("-", "")
                .replaceAll(".", "")
                .split(" ")
                .join("")
                .toLowerCase()
                .includes(
                    query
                        .trim()
                        .replaceAll("-", "")
                        .replaceAll(".", "")
                        .split(" ")
                        .join("")
                        .toLowerCase()
                ) && !list.includes(college)
        );
    }).slice(0, 5);
    return results;
};
