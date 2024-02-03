import { Wrapper } from "@/components/shared/wrapper";
import React from "react";

interface EssaysProps {}

const Essays: React.FC<EssaysProps> = ({}) => {
    return (
        <>
            <Wrapper>
                <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-lg blair">essays</p>
                </div>
                <div className="p-4">
                    <pre className="menlo text-purple-500">
                        #include {"<stdio.h>\n\n"}
                        int main(void){"{\n"}
                        {"\t"}printf("hello, universe!\n");{"\n"}
                        {"\t"}return 0;
                        {"\n"}
                        {"}"}
                    </pre>
                </div>
            </Wrapper>
        </>
    );
};

export default Essays;
