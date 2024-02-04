import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BiSearch } from "react-icons/bi";
import { CollegeListItem } from "@/types";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
import { useDeleteEssayMutation } from "@/generated/graphql";
import { Button } from "../ui/button";
import { GoShare } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "sonner";

interface DeleteEssayModalProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    id: string;
}

export const DeleteEssayModal: React.FC<DeleteEssayModalProps> = ({
    open,
    setOpen,
    id,
}) => {
    const router = useRouter();
    const client = useApolloClient();
    const [deleteEssayMutation] = useDeleteEssayMutation();

    const deleteEssay = async () => {
        await deleteEssayMutation({
            variables: {
                id,
            },
        });
        router.push("/app/essays");
        await client.resetStore();
        toast.success("Essay deleted successfully");
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-30 overflow-y-auto"
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
                        <div className="p-4 border border-gray-200 inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                            <p className="mb-1 text-lg font-semibold">
                                Are you sure?
                            </p>
                            <p className="text-sm text-slate-500">
                                This action cannot be undone. All of the content
                                in this essay will be permanently lost.
                            </p>
                            <div className="mt-5 flex items-center">
                                <div className="ml-auto flex items-center">
                                    <div className="w-24 mr-3">
                                        <Button
                                            onClick={() => setOpen(false)}
                                            label="Cancel"
                                            iconMargin={2}
                                        />
                                    </div>
                                    <div className="w-24">
                                        <Button
                                            onClick={deleteEssay}
                                            label="Delete"
                                            colored
                                            color={
                                                "text-red-500 border-gray-300 hover:bg-gray-50"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
