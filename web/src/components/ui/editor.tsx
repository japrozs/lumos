import { GetEssayQuery } from "@/generated/graphql";
import React from "react";
import { PiHashStraightBold } from "react-icons/pi";

interface EditorProps {
    essay: GetEssayQuery["getEssay"];
}

export const Editor: React.FC<EditorProps> = ({ essay }) => {
    return (
        <>
            <div className="bg-white z-10 sticky top-0 px-4 py-3 border-b border-gray-200">
                <div className="truncate text-ellipsis flex items-center  mx-auto max-w-4xl ">
                    <PiHashStraightBold className="text-xl text-slate-400 mr-3" />
                    <p className="text-lg blair truncate line-clamp-1">
                        {essay.title}
                    </p>
                </div>
            </div>
            <div className="p-4 mx-auto max-w-4xl">
                <pre className="menlo text-purple-500">
                    #include {"<stdio.h>\n\n"}
                    int main(void){"{\n"}
                    {"\t"}printf("hello, universe!\n");{"\n"}
                    {"\t"}return 0;
                    {"\n"}
                    {"}"}
                </pre>
            </div>
        </>
    );
};
