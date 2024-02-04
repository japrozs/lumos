import { Column } from "@/types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import { BiDetail, BiPlus } from "react-icons/bi";
import { v4 } from "uuid";
import { PiPencil } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { formatText } from "@/utils/utils";
// import { EditColumn } from "../modals/edit-column";
import { useUpdateTasksMutation } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { matchFilter } from "../../utils/utils";
import { AiOutlineDelete } from "react-icons/ai";

interface TableProps {
    columnId: string;
    column: Column;
    setBoard: React.Dispatch<any>;
    board: any;
    filter: string;
}

export const Table: React.FC<TableProps> = ({
    column,
    columnId,
    setBoard,
    board,
    filter,
}) => {
    const [creatingNewNote, setCreatingNewNote] = useState(false);
    const [note, setNote] = useState("");
    const [open, setOpen] = useState(false);
    const [updateTasksMutation] = useUpdateTasksMutation();
    const client = useApolloClient();
    console.log(column);
    console.log("columnId ::", columnId);

    useEffect(() => {
        console.log(`something changed with column ${column.name}`);
        console.log(column);
        board[columnId] = column;
        console.log(board);
        setBoard(board);
        (async () => {
            await updateTasksMutation({
                variables: {
                    tasks: JSON.stringify(board),
                },
            });
            // await client.resetStore();
        })();
    }, [column.items]);

    // TODO – add functionality to edit cards and column information

    return (
        <div className="flex flex-col" key={columnId}>
            <div className="mr-5">
                <div className="flex items-center p-5 pt-2.5 rounded-tr-lg rounded-tl-lg px-3 border-t border-l border-r bg-gray-50 border-gray-200">
                    <p className="font-medium ">{column.name}</p>
                    <div className="flex items-center ml-auto mr-1">
                        <PiPencil
                            onClick={() => setOpen(true)}
                            className="text-lg cursor-pointer mx-1.5 text-gray-400 hover:text-purple-500"
                        />
                        {/* <BiPlus
                            onClick={() => setCreatingNewNote(true)}
                            className="text-xl cursor-pointer mx-1.5 text-gray-400 hover:text-blue-500"
                        /> */}
                        <RiDeleteBin6Line
                            onClick={() => {
                                const boardCopy = structuredClone(board);
                                delete boardCopy[columnId];
                                console.log(
                                    "board with table deleted ::",
                                    boardCopy
                                );
                                setBoard(boardCopy);
                            }}
                            className="text-lg cursor-pointer mx-1.5 text-gray-400 hover:text-red-500"
                        />
                        {/* <BoardMenu
                            column={column}
                            columnId={columnId}
                            setBoard={setBoard}
                            setOpen={setOpen}
                        /> */}
                    </div>
                </div>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                        return (
                            <div className="bg-gray-50 border-l rounded-bl-lg rounded-br-lg border-r border-gray-200">
                                {creatingNewNote ? (
                                    <div className="px-3">
                                        <textarea
                                            value={note}
                                            onChange={(e) =>
                                                setNote(e.target.value)
                                            }
                                            placeholder="Enter a task"
                                            className="w-full p-2 border border-gray-200 rounded-md focus:border-blue-500 focus:ring-2 focus:outline-none text-sm h-max"
                                        />
                                        <div className="flex items-center space-x-2">
                                            <div className="w-full">
                                                <Button
                                                    label="Add"
                                                    disabled={
                                                        note.trim().length == 0
                                                    }
                                                    onClick={() => {
                                                        column.items = [
                                                            {
                                                                id: v4(),
                                                                content: note,
                                                            },
                                                            ...column.items,
                                                        ];
                                                        setNote("");
                                                        setCreatingNewNote(
                                                            false
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div className="">
                                                {/* <Button
                                                label="Cancel"
                                                onClick={() =>
                                                    setCreatingNewNote(
                                                        false
                                                    )
                                                }
                                            /> */}
                                                <AiOutlineDelete
                                                    onClick={() =>
                                                        setCreatingNewNote(
                                                            false
                                                        )
                                                    }
                                                    className="ml-1 text-xl self-start hover:text-red-500 cursor-pointer transition"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => setCreatingNewNote(true)}
                                        className="cursor-pointer hover:bg-gray-100 transition flex items-center text-sm font-medium text-slate-500 pt-2 justify-center border border-slate-300 mb-0 mx-2 border-dashed rounded-lg py-2"
                                    >
                                        <p>Add a card</p>
                                    </div>
                                )}
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="p-2 rounded-bl-lg min-h-screen rounded-br-lg px-3 border-b bg-gray-50 border-gray-200"
                                    style={{
                                        width: "310px",
                                        minHeight: "70vh",
                                    }}
                                >
                                    <>
                                        {column.items.map((item, index) => {
                                            return (
                                                <Draggable
                                                    key={item.id}
                                                    draggableId={item.id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <>
                                                                {matchFilter(
                                                                    filter,
                                                                    item.content
                                                                ) ? (
                                                                    <div
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={`flex group align-top move border bg-white border-gray-200 shadow-sm p-2 mb-2 relative rounded-lg ${
                                                                            snapshot.isDragging
                                                                                ? "ring"
                                                                                : ""
                                                                        }`}
                                                                        style={{
                                                                            ...provided
                                                                                .draggableProps
                                                                                .style,
                                                                        }}
                                                                    >
                                                                        {/* <div className="hidden group-hover:block bg-gray-900 rounded p-1.5 group-hover:flex items-center border border-gray-700 absolute top-1 right-1 z-30">
                                                                        <PiPencil
                                                                            onClick={() => {
                                                                                setNote(
                                                                                    item.content
                                                                                );
                                                                                setCreatingNewNote(
                                                                                    true
                                                                                );
                                                                                // discretely delete the old note
                                                                                const boardCopy: any =
                                                                                    structuredClone(
                                                                                        board
                                                                                    );
                                                                                boardCopy[
                                                                                    columnId
                                                                                ].items.splice(
                                                                                    index,
                                                                                    1
                                                                                );
                                                                                setBoard(
                                                                                    boardCopy
                                                                                );
                                                                            }}
                                                                            className="text-base mr-2 cursor-pointer text-gray-400 hover:text-purple-500"
                                                                        />

                                                                        <RiDeleteBin6Line
                                                                            onClick={() => {
                                                                                console.log(
                                                                                    "--- delete note output ---"
                                                                                );
                                                                                console.log(
                                                                                    board
                                                                                );
                                                                                const boardCopy: any =
                                                                                    structuredClone(
                                                                                        board
                                                                                    );
                                                                                boardCopy[
                                                                                    columnId
                                                                                ].items.splice(
                                                                                    index,
                                                                                    1
                                                                                );
                                                                                setBoard(
                                                                                    boardCopy
                                                                                );
                                                                                console.log(
                                                                                    "--- END delete note output ---"
                                                                                );
                                                                            }}
                                                                            className="text-base cursor-pointer text-gray-400 hover:text-red-500"
                                                                        />
                                                                    </div> */}
                                                                        <p
                                                                            className="w-full text-sm font-medium text-slate-900 break-words"
                                                                            style={{
                                                                                overflowWrap:
                                                                                    "break-word",
                                                                            }}
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: formatText(
                                                                                    item.content
                                                                                ),
                                                                            }}
                                                                        ></p>
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className="hidden"
                                                                    ></div>
                                                                )}
                                                            </>
                                                        );
                                                    }}
                                                </Draggable>
                                            );
                                        })}
                                    </>
                                    {provided.placeholder}
                                </div>
                            </div>
                        );
                    }}
                </Droppable>
            </div>
            {/* <EditColumn
                setOpen={setOpen}
                open={open}
                id={columnId}
                column={column}
                board={board}
                setBoard={setBoard}
            /> */}
        </div>
    );
};
