import { CollegeListItem } from "@/types";
import { search, searchCollegeWithList } from "@/utils/utils";
import { Transition, Dialog } from "@headlessui/react";
import { list } from "postcss";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface AddCollegeModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    list: CollegeListItem[];
    setList: Dispatch<SetStateAction<CollegeListItem[]>>;
}

export const AddCollegeModal: React.FC<AddCollegeModalProps> = ({
    open,
    setOpen,
    list,
    setList,
}) => {
    const [query, setQuery] = useState("");

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 max-z-10 overflow-y-auto"
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 transition-opacity bg-opacity-30 bg-black" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="border border-gray-200 inline-block overflow-hidden text-left align-bottom transition-all transform bg-gray-100 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                            <div className="flex border-b border-gray-300 items-center p-2 px-3 bg-gray-200 text-gray-800">
                                <BiSearch className="w-5 h-5 text-gray-500" />
                                <input
                                    value={query}
                                    className="w-full py-1 ml-2 bg-transparent placeholder-gray-700 focus:outline-none"
                                    placeholder="Search for colleges ..."
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>
                            {searchCollegeWithList(query, list).map(
                                (college: CollegeListItem, idx: number) => (
                                    <div
                                        onClick={() => {
                                            setList([college, ...list]);
                                            setQuery("");
                                            setOpen(false);
                                        }}
                                        key={idx}
                                        className="p-2.5 cursor-pointer hover:bg-gray-200 flex items-center"
                                    >
                                        <p className="text-gray-800 font-medium">
                                            {college.content.entity.name}
                                        </p>
                                        <p className="ml-2 text-sm menlo text-gray-600">
                                            – {college.content.entity.location}
                                        </p>
                                        <p className="ml-auto menlo font-bold text-primary-color">
                                            {college.badge &&
                                                "#" +
                                                    college.badge.ordinal.toString()}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
