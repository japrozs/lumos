import React from "react";
import { Sidebar } from "./sidebar";
import { Toaster } from "@/components/ui/sonner";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div className="h-screen flex dark:bg-[#1F1F1F]">
            <Sidebar />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
                <Toaster />
            </main>
        </div>
    );
};
