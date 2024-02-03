import React from "react";
import { IconType } from "react-icons";

interface PillProps {
    label: string;
    borderColor?: string;
    textColor?: string;
    bgColor?: string;
    noMargin?: boolean;
    icon?: IconType;
}

export const Pill: React.FC<PillProps> = ({
    label,
    borderColor,
    textColor,
    bgColor,
    noMargin,
    icon: Icon,
}) => {
    return (
        <div
            className={`border ${
                borderColor ? borderColor : "border-gray-300"
            } ${bgColor && bgColor} ${
                noMargin ? "" : "ml-4"
            } px-2 py-1 flex items-center rounded-lg min-w-max`}
        >
            {Icon && (
                <Icon
                    className={`transition-all ${
                        label.length != 0 && "mr-1"
                    } text-xs ${
                        textColor ? `${textColor} opacity-60` : "text-gray-300"
                    }`}
                />
            )}
            <p
                className={`text-xs font-semibold ${
                    textColor ? textColor : "text-gray-500"
                }`}
            >
                {label}
            </p>
        </div>
    );
};
