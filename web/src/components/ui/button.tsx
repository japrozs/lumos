import React, { LegacyRef } from "react";
import { IconType } from "react-icons/lib";
import { Spinner } from "../shared/spinner";

type ButtonProps = {
    label: string;
    className?: string;
    colored?: boolean;
    color?: string;
    disabled?: boolean;
    loading?: boolean;
    iconAnimate?: boolean;
    iconRight?: boolean;
    iconMargin?: number;
    icon?: IconType;
    buttonRef?: LegacyRef<HTMLButtonElement> | undefined;
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = ({
    label,
    colored,
    color,
    disabled,
    icon: Icon,
    iconAnimate,
    loading = false,
    iconRight,
    className,
    iconMargin,
    buttonRef,
    ...props
}) => {
    return (
        <button
            disabled={disabled}
            ref={buttonRef}
            style={{
                fontFamily: "Inter",
                fontWeight: 444,
            }}
            className={`${
                (loading || disabled) && "cursor-not-allowed"
            } flex items-center justify-center group button-component ${
                colored
                    ? `${
                          color
                              ? color
                              : "bg-primary-color border-blue-400 text-white"
                      } hover:opacity-90`
                    : "bg-white border-gray-300 hover:bg-gray-50"
            } focus:ring-2 ${
                disabled && "opacity-40 disabled"
            } focus:ring-border-blue-100 transition-all text-sm py-1.5 w-full rounded-lg border  ${className}`}
            {...props}
        >
            {loading ? (
                <>
                    <Spinner className="w-6 h-6 text-gray-200 fill-primary-color" />
                </>
            ) : (
                <>
                    {!iconRight && (
                        <>
                            {Icon && (
                                <Icon
                                    className={`transition-all ${
                                        label.length != 0 &&
                                        `${
                                            iconAnimate
                                                ? `mr-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "1"
                                                  } group-hover:ml-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "2"
                                                  }`
                                                : `mr-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "1"
                                                  }`
                                        }`
                                    } text-lg`}
                                />
                            )}
                        </>
                    )}
                    {label}{" "}
                    {iconRight && (
                        <>
                            {Icon && (
                                <Icon
                                    className={`transition-all ${
                                        label.length != 0 &&
                                        `${
                                            iconAnimate
                                                ? `ml-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "1"
                                                  } group-hover:ml-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "2"
                                                  }`
                                                : `ml-${
                                                      iconMargin
                                                          ? iconMargin
                                                          : "1"
                                                  }`
                                        }`
                                    } text-lg`}
                                />
                            )}
                        </>
                    )}
                </>
            )}
        </button>
    );
};
