import { MeQuery, RegularEssayFragment } from "@/generated/graphql";
import { MAIN_COLLEGE_LIST } from "@/data/colleges";
import { CollegeListItem } from "@/types";
import { useEffect } from "react";
import sanitizeHTML from "sanitize-html";

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
        // FIX – find a way to make this faster
        //            or find a simpler way to do this
        // && !list.some((c) => JSON.stringify(c) === JSON.stringify(college)
    });
    // results.forEach((college) => {
    //     console.log({
    //         name: college.content.entity.name,
    //         list,
    //         college,
    //         includes: list.some(
    //             (c) => JSON.stringify(c) === JSON.stringify(college)
    //         ),
    //     });
    // });
    return results;
};

export const searchCollegeList = (query: string, list: CollegeListItem[]) => {
    const results = list.filter((listItem: CollegeListItem) => {
        return listItem.content.entity.name
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
    return results;
};

export const searchEssayList = (
    query: string,
    list: RegularEssayFragment[]
): RegularEssayFragment[] => {
    const results = list.filter((essay: RegularEssayFragment) => {
        return essay.title
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
    return results;
};

export const timeSince = (date: string | undefined) => {
    const dateToString = new Date(parseInt(date || "")).toString();
    const d = new Date(dateToString);
    var seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
};

export const timeSinceShort = (date: string | undefined) => {
    const dateToString = new Date(parseInt(date || "")).toString();
    const d = new Date(dateToString);
    var seconds = Math.floor((new Date().getTime() - d.getTime()) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " y ";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " m ";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " h";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " m";
    }
    return Math.floor(seconds) + " s";
};

// Updates the height of a <textarea> when the value changes.
const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    value: string
) => {
    useEffect(() => {
        if (textAreaRef) {
            // We need to reset the height momentarily to get the correct scrollHeight for the textarea
            textAreaRef.style.height = "0px";
            const scrollHeight = textAreaRef.scrollHeight;

            // We then set the height directly, outside of the render loop
            // Trying to set this with state or a ref will product an incorrect value.
            textAreaRef.style.height = scrollHeight + "px";
        }
    }, [textAreaRef, value]);
};

export default useAutosizeTextArea;

export const formatText = (str: string) => {
    str = sanitizeHTML(str);
    str = str?.replace(/(www|http:|https:)+[^\s]+[\w]/g, (t) => {
        console.log("link ::", t);

        return `<a href="${t}" class="text-blue-500 hover:underline"  target="_blank">${t}</a>`;
    });

    // match tildes/backticks(`) - (code)
    console.log(str);
    str = str?.replace(/`(.*?)`/g, (t) => {
        console.log("code in tilde ::", t);
        return `<code>${t.substring(1, t.length - 1)}</code>`;
    });
    return str;
};

export const matchFilter = (filter: string, text: string) => {
    if (filter.trim().length == 0) {
        return true;
    }

    if (
        text
            .trim()
            .split(" ")
            .join("")
            .toLowerCase()
            .includes(filter.trim().split(" ").join("").toLowerCase())
    ) {
        return true;
    }
    return false;
};

// const essayTitles: string[] = [
//     "Bears, beets, battlestar galactica",
//     "I declare bankruptcy",
//     "that's what she said",
//     "michael scott",
// ];

// export const essayTitleGenerator = () => {
//     return bios[Math.floor(Math.random() * essayTitles.length)];
// };
