import { Wrapper } from "@/components/shared/wrapper";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

interface EssaysProps {}

const Essays: React.FC<EssaysProps> = ({}) => {
    const [query, setQuery] = useState("");
    return (
        <>
            <Wrapper>
                <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-lg blair">essays</p>
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
                            <div className="w-32">
                                <Button label="New essay" icon={FiPlus} />
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
                </div>
            </Wrapper>
        </>
    );
};

export default Essays;
