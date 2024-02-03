import React from "react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface SidebarItemProps {
    label: string;
    icon: IconType;
    link: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    icon: Icon,
    link,
}) => {
    return (
        <Link href={link}>
            <div className="flex items-center inter-var cursor-pointer transition-all text-base font-medium text-gray-300 hover:bg-dark-compliment-hovered px-3.5 py-2.5">
                <Icon className="mr-4" />
                <p>{label}</p>
            </div>
        </Link>
    );
};
