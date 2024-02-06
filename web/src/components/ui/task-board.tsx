import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useIsAuth } from "@/utils/use-is-auth";
import { BiSearch } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { MeQuery, useUpdateTasksMutation } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { DragDropContext } from "@hello-pangea/dnd";
import { GoPlus } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { Table } from "../shared/task-table";
import { v4 } from "uuid";
import { FiDownload } from "react-icons/fi";
import { toast } from "sonner";

interface TaskBoardProps {
    data: MeQuery;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ data }) => {
    const [query, setQuery] = useState("");
    const [board, setBoard] = useState(JSON.parse(data.me?.tasks || "{}"));
    const [updateTasksMutation, { loading }] = useUpdateTasksMutation();
    const client = useApolloClient();
    const [exportLoading, setExportLoading] = useState(false);

    const onDragEnd = (result: any, columns: any, setColumns: any) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setBoard({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setBoard({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    useEffect(() => {
        console.log("start saving...");
        console.log(board);
        const timeout = setTimeout(async () => {
            await updateTasksMutation({
                variables: {
                    tasks: JSON.stringify(board),
                },
            });
            await client.resetStore();
        }, 500);

        console.log("end saving...");
        return () => clearTimeout(timeout);
    }, [board]);

    const exportTaskBoard = () => {
        setExportLoading(true);
        const filename = "task-board";
        const json = JSON.stringify(board, null, 4);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        // create anchor tag with link to download the file
        const link = document.createElement("a");
        link.href = href;
        link.download = `${filename}.json`;
        document.body.appendChild(link);
        link.click();
        setExportLoading(false);

        // clean up & remove anchor tag
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
        toast.success("Task board exported successfully");
    };

    return (
        <>
            <div className="bg-white z-10 sticky top-0 px-4 py-3 border-b border-gray-200">
                <p className="text-lg blair">task board</p>
            </div>
            <div className="p-4">
                <div className="flex items-center mb-7">
                    <div className="self-center flex items-center max-w-md w-full rounded-md py-1.5 mr-5 px-2 border border-gray-300 focus-within:outline-none focus-within:border-blue-500 focus-within:ring text-gray-700 text-sm">
                        <BiSearch className="text-slate-500 text-xl" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Dwight Schrute list of enemies"
                            className="bg-transparent w-full focus:outline-none ml-1.5"
                        />
                        {query.trim().length != 0 && (
                            <RxCross2
                                onClick={() => setQuery("")}
                                className="text-slate-500 cursor-pointer hover:text-blue-600 text-xl"
                            />
                        )}
                    </div>
                    <div className="flex items-center ml-auto space-x-2">
                        {loading ? (
                            <p className="hidden md:block mr-5 text-sm font-medium text-gray-600">
                                Saving...
                            </p>
                        ) : (
                            <div className="flex items-center mr-5 ">
                                <IoMdCheckmark
                                    className={"mr-2 text-green-500"}
                                />
                                <p className="hidden md:block text-sm font-medium text-gray-600">
                                    Saved
                                </p>
                            </div>
                        )}
                        <div className="w-32">
                            <Button
                                onClick={() => {
                                    setBoard({
                                        ...board,
                                        [v4()]: {
                                            name: "New table",
                                            items: [],
                                        },
                                    });
                                    toast.success("Column added to board");
                                }}
                                label="Add table"
                                icon={FiPlus}
                            />
                        </div>
                        <div className="w-24">
                            <Button
                                // onClick={() => {
                                //     setBoard({
                                //         ...board,
                                //         [v4()]: {
                                //             name: "New table",
                                //             items: [],
                                //         },
                                //     });
                                // }}
                                onClick={exportTaskBoard}
                                label="Export"
                                loading={exportLoading}
                                icon={FiDownload}
                            />
                        </div>
                    </div>
                </div>

                {data.me?.tasks === "{}" ? (
                    <>
                        <div className="flex flex-col items-center justify-center w-full h-full p-24">
                            <p className="text-slate-500 menlo">
                                Add a table to manage your tasks
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex h-full mt-3 overflow-x-scroll no-scrollbar">
                            <DragDropContext
                                onDragEnd={(result) =>
                                    onDragEnd(result, board, setBoard)
                                }
                            >
                                {Object.entries(board).map(
                                    ([columnId, column], index) => (
                                        <Table
                                            key={columnId}
                                            columnId={columnId}
                                            column={column as any}
                                            setBoard={setBoard}
                                            board={board}
                                            filter={query}
                                        />
                                    )
                                )}
                            </DragDropContext>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
