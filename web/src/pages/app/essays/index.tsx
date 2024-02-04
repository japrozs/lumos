import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import { PiSuitcaseSimple } from "react-icons/pi";
import { RiDeleteBin6Line, RiMapPin2Line } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa6";
import { useIsAuth } from "@/utils/use-is-auth";
import { Spinner } from "@/components/shared/spinner";
import {
    RegularEssayFragment,
    useCreateEssayMutation,
    useStarOrUnStarEssayMutation,
} from "@/generated/graphql";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useRouter } from "next/router";
import { DeleteEssayModal } from "@/components/modals/delete-essay";
import { useApolloClient } from "@apollo/client";
import { searchEssayList } from "@/utils/utils";

interface EssaysProps {}

const Essays: React.FC<EssaysProps> = ({}) => {
    const { data, loading } = useIsAuth();
    const [query, setQuery] = useState("");
    const router = useRouter();
    const [createEssaymutation] = useCreateEssayMutation();
    const [starOrUnStarMutation] = useStarOrUnStarEssayMutation();
    const client = useApolloClient();
    const [open, setOpen] = useState(false);

    const createEssay = async () => {
        const essay = await createEssaymutation({
            variables: {
                title: `new essay`,
            },
        });
        router.push(`/app/essays/${essay.data?.createEssay.id}`);
    };

    const starEssay = async (id: string) => {
        await starOrUnStarMutation({
            variables: {
                id,
            },
        });
        await client.resetStore();
    };

    return (
        <>
            <Wrapper>
                <div className="bg-white z-10 sticky top-0 px-4 py-3 border-b border-gray-200">
                    <p className="text-lg blair">essays</p>
                </div>
                {!loading ? (
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
                                <div className="w-32">
                                    <Button
                                        onClick={createEssay}
                                        label="New essay"
                                        icon={FiPlus}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <pre className="menlo text-purple-500">
                        #include {"<stdio.h>\n\n"}
                        int main(void){"{\n"}
                        {"\t"}printf("hello, universe!\n");{"\n"}
                        {"\t"}return 0;
                        {"\n"}
                        {"}"}
                    </pre> */}
                        <Table>
                            <TableHeader>
                                <TableRow className="border-t border-gray-200">
                                    <TableHead className="w-4/6 border-r border-gray-200">
                                        Name
                                    </TableHead>
                                    <TableHead className="w-1/6 border-r border-gray-200">
                                        <div className="flex items-center ">
                                            <FaRegClock className="mr-2" />
                                            Last modified
                                        </div>
                                    </TableHead>
                                    {/* <TableHead className="w-1/6 border-r border-gray-200">
                                    <div className="flex items-center">
                                        <RiMapPin2Line className="mr-2" />
                                        Rating
                                    </div>
                                </TableHead> */}
                                    <TableHead className="w-1/6">
                                        <div className="ml-auto flex items-center">
                                            {/* <PiSuitcaseSimple className="mr-2" /> */}
                                            Actions
                                        </div>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {query.trim().length === 0
                                    ? data?.me?.essays.map(
                                          (essay: RegularEssayFragment) => (
                                              <TableRow className="group cursor-pointer">
                                                  <TableCell className="font-medium border-r border-gray-200 flex ">
                                                      <a
                                                          href={`/app/essays/${essay.id}`}
                                                          className="w-full flex items-center group-hover:underline"
                                                      >
                                                          {essay.title}{" "}
                                                          {essay.starred && (
                                                              <FaStar className="ml-3 text-purple-500 text-lg" />
                                                          )}
                                                      </a>
                                                  </TableCell>
                                                  <TableCell className="text-gray-500 border-r border-gray-200">
                                                      <p>
                                                          {new Date(
                                                              parseInt(
                                                                  essay.updatedAt
                                                              )
                                                          ).toLocaleDateString(
                                                              "en-us",
                                                              {
                                                                  year: "numeric",
                                                                  month: "short",
                                                                  day: "numeric",
                                                              }
                                                          )}
                                                      </p>
                                                  </TableCell>
                                                  {/* <TableCell className="text-gray-500 border-r border-gray-200">
                                    <p>hi there</p>
                                </TableCell> */}
                                                  <TableCell className="opacity-0 group-hover:opacity-100 flex items-center text-right space-x-2">
                                                      {essay.starred ? (
                                                          <FaStar
                                                              onClick={() =>
                                                                  starEssay(
                                                                      essay.id
                                                                  )
                                                              }
                                                              className="mr-3 text-xl self-start text-purple-500 cursor-pointer transition "
                                                          />
                                                      ) : (
                                                          <FaRegStar
                                                              onClick={() =>
                                                                  starEssay(
                                                                      essay.id
                                                                  )
                                                              }
                                                              className="mr-3 text-xl self-start hover:text-purple-500 cursor-pointer transition "
                                                          />
                                                      )}
                                                      <AiOutlineDelete
                                                          onClick={() =>
                                                              setOpen(true)
                                                          }
                                                          className="ml-10 text-xl self-start hover:text-red-500 cursor-pointer transition"
                                                      />
                                                  </TableCell>
                                                  <DeleteEssayModal
                                                      open={open}
                                                      setOpen={setOpen}
                                                      id={essay.id}
                                                  />
                                              </TableRow>
                                          )
                                      )
                                    : searchEssayList(
                                          query,
                                          data?.me
                                              ?.essays as RegularEssayFragment[]
                                      ).map(
                                          (
                                              essay: RegularEssayFragment,
                                              idx: number
                                          ) => (
                                              // TODO – refactor this into another component to prevent repetitive stuff
                                              <TableRow
                                                  key={idx}
                                                  className="group cursor-pointer"
                                              >
                                                  <TableCell className="font-medium border-r border-gray-200 flex ">
                                                      <a
                                                          href={`/app/essays/${essay.id}`}
                                                          className="w-full flex items-center group-hover:underline"
                                                      >
                                                          {essay.title}{" "}
                                                          {essay.starred && (
                                                              <FaStar className="ml-3 text-purple-500 text-lg" />
                                                          )}
                                                      </a>
                                                  </TableCell>
                                                  <TableCell className="text-gray-500 border-r border-gray-200">
                                                      <p>
                                                          {new Date(
                                                              parseInt(
                                                                  essay.updatedAt
                                                              )
                                                          ).toLocaleDateString(
                                                              "en-us",
                                                              {
                                                                  year: "numeric",
                                                                  month: "short",
                                                                  day: "numeric",
                                                              }
                                                          )}
                                                      </p>
                                                  </TableCell>
                                                  {/* <TableCell className="text-gray-500 border-r border-gray-200">
                                    <p>hi there</p>
                                </TableCell> */}
                                                  <TableCell className="opacity-0 group-hover:opacity-100 flex items-center text-right space-x-2">
                                                      {essay.starred ? (
                                                          <FaStar
                                                              onClick={() =>
                                                                  starEssay(
                                                                      essay.id
                                                                  )
                                                              }
                                                              className="mr-3 text-xl self-start text-purple-500 cursor-pointer transition "
                                                          />
                                                      ) : (
                                                          <FaRegStar
                                                              onClick={() =>
                                                                  starEssay(
                                                                      essay.id
                                                                  )
                                                              }
                                                              className="mr-3 text-xl self-start hover:text-purple-500 cursor-pointer transition "
                                                          />
                                                      )}
                                                      <AiOutlineDelete
                                                          onClick={() =>
                                                              setOpen(true)
                                                          }
                                                          className="ml-10 text-xl self-start hover:text-red-500 cursor-pointer transition"
                                                      />
                                                  </TableCell>
                                                  <DeleteEssayModal
                                                      open={open}
                                                      setOpen={setOpen}
                                                      id={essay.id}
                                                  />
                                              </TableRow>
                                          )
                                      )}
                                {query.trim().length != 0 &&
                                    searchEssayList(
                                        query,
                                        data?.me
                                            ?.essays as RegularEssayFragment[]
                                    ).length === 0 && <p>no results found</p>}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center max-w-full min-h-screen">
                        <Spinner />
                    </div>
                )}
            </Wrapper>
        </>
    );
};

export default Essays;
