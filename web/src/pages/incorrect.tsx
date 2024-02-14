import { useApolloClient } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { RxCrossCircled } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { Meta } from "@/components/shared/meta";
import Head from "next/head";

interface VerifyUserProps {}

const VerifyUser: React.FC<VerifyUserProps> = ({}) => {
    return (
        <div>
            <Head>
                <Meta title="Lumos – Incorrect verification code" />
                <title>Lumos – Incorrect verification code</title>
            </Head>
            <div className="h-screen">
                <div className="px-6 py-5 z-10">
                    <a href="/">
                        <Image
                            src="/logo.svg"
                            className="h-8 w-auto"
                            height={20}
                            width={20}
                            alt="logo"
                        />
                    </a>
                </div>
                <div
                    style={{
                        marginTop: "13.8vh",
                    }}
                    className="max-w-lg ml-auto mr-auto  flex flex-col items-center justify-center"
                >
                    <div className="flex items-center mb-5">
                        <RxCrossCircled className="w-10 text-error-red h-auto mr-3" />
                        <p className="big_title text-5xl font-semibold">
                            Incorrect link
                        </p>
                    </div>
                    <p className="text-gray-500 text-md text-center">
                        The link that you used to authorize your account is
                        either incorrect or corrupted. Please check that you
                        copied the URL correctly.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyUser;
