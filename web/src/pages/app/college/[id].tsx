import { Meta } from "@/components/shared/meta";
import { Wrapper } from "@/components/shared/wrapper";
import { MAIN_COLLEGE_LIST } from "@/data/colleges";
import { AdmissionStatsType, CollegeListItem, ReportCardType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { LuSchool } from "react-icons/lu";
import {
    getPillBgColor,
    getPillBorderColor,
    getPillEmoji,
    getPillIcon,
    getPillTextColor,
} from "@/utils/pill";
import { Pill } from "@/components/ui/pill";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { LiaBookSolid } from "react-icons/lia";
import { FaMoneyBill } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { getReportCardColors, getStatName } from "@/utils/utils";
import { Spinner } from "@/components/shared/spinner";

interface CollegePageProps {}

const CollegePage: React.FC<CollegePageProps> = ({}) => {
    const router = useRouter();
    const [college, setCollege] = useState<CollegeListItem | undefined>(
        undefined
    );
    const id = typeof router.query.id == "string" ? router.query.id : "-1";
    const index = MAIN_COLLEGE_LIST.findIndex(
        (c: CollegeListItem) => c.guid === id
    );
    useEffect(() => {
        setCollege(MAIN_COLLEGE_LIST[index]);
    }, [index]);
    const [showMore, setShowMore] = useState(false);
    console.log(college);

    return (
        <Wrapper>
            {college && (
                <>
                    <Head>
                        <Meta title={"Colleges"} />
                        <title>{college.content.entity.name} - Lumos</title>
                    </Head>
                    <div className="bg-white z-10 sticky top-0 px-4 py-3 border-b border-gray-200">
                        <p className="text-lg blair">
                            {college.content.entity.name.toLowerCase()}
                        </p>
                    </div>
                    <div className="p-4">
                        <div className="flex items-start space-x-2">
                            <div className="w-full p-2">
                                <img
                                    src={
                                        college.content.photos.default?.crops
                                            .DesktopHeader ||
                                        "https://d33a4decm84gsn.cloudfront.net/search/2024/colleges/colleges-best_2048.png"
                                    }
                                    alt=""
                                    className="w-full h-44 rounded-lg mr-2.5 object-cover object-center border border-gray-200"
                                />
                                <div className="my-4 flex items-center">
                                    <LuSchool className="p-2 text-5xl bg-blue-100 rounded-lg text-primary-color" />
                                    <div className="ml-5 truncate line-clamp-1">
                                        <p className="text-lg font-semibold truncate text-ellipsis">
                                            {college.content.entity.name}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            <span className="font-medium text-primary-color">
                                                #
                                                {college.badge.ordinal.toString()}
                                            </span>{" "}
                                            in Best college in america
                                        </p>
                                    </div>
                                    {college.content.complete_profile
                                        ?.admissions.deadlines && (
                                        <Link
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-36 ml-auto mr-0"
                                            passHref={true}
                                            href={`https://${college.content.complete_profile?.admissions.deadlines.application_website}`}
                                        >
                                            <Button label="Apply now" colored />
                                        </Link>
                                    )}
                                </div>
                                <div className="flex flex-wrap space-x-2">
                                    <div className="my-0.5">
                                        <Pill
                                            borderColor={getPillBorderColor(
                                                college
                                            )}
                                            textColor={getPillTextColor(
                                                college
                                            )}
                                            bgColor={getPillBgColor(college)}
                                            icon={getPillIcon(college)}
                                            noMargin
                                            label={`${(
                                                college.content.grades[0]
                                                    ?.value || 1
                                            )?.toFixed(2)}`}
                                        />
                                    </div>
                                    <div className="my-0.5">
                                        <Pill
                                            noMargin
                                            label={`💯 SAT Range ${
                                                college.content.facts[2]
                                                    .value || 400
                                            }`}
                                        />
                                    </div>
                                    <div className="my-0.5">
                                        <Pill
                                            noMargin
                                            label={`💰 $ ${(
                                                college.content.facts[1]
                                                    .value || 10000
                                            )?.toLocaleString()}`}
                                        />
                                    </div>
                                    <div className="my-0.5">
                                        <Pill
                                            noMargin
                                            label={`${getPillEmoji(
                                                college
                                            )}\tAcceptance rate – ${(
                                                (college.content.facts[0]
                                                    .value || 1.0) * 100
                                            )
                                                .toFixed(1)
                                                .toString()} %`}
                                        />
                                    </div>
                                </div>
                                {college.content.photos.mapbox_header?.crops
                                    .DesktopHeader && (
                                    <div className="flex my-4 items-center space-x-2">
                                        <img
                                            className="w-7/12 border border-gray-200 h-20 pb-0 object-cover object-center rounded-2xl"
                                            src={
                                                college.content.photos
                                                    .mapbox_header?.crops
                                                    .DesktopHeader
                                            }
                                        />
                                        <div className="w-5/12">
                                            <div className="flex items-start">
                                                <MdOutlineLocationOn className="m-1 text-slate-500 text-xl mr-2" />
                                                <div>
                                                    <p className="text-sm font-medium text-slate-600">
                                                        {
                                                            college.content
                                                                .address
                                                                ?.address
                                                                .house_number
                                                        }{" "}
                                                        {
                                                            college.content
                                                                .address
                                                                ?.address
                                                                .building
                                                        }
                                                    </p>
                                                    <p className="text-sm font-medium text-slate-600">
                                                        {
                                                            college.content
                                                                .address
                                                                ?.address.road
                                                        }
                                                    </p>
                                                    <p className="text-sm font-medium text-slate-600">
                                                        {college.content.address
                                                            ?.address.city &&
                                                            `${college.content.address?.address.city}, `}
                                                        {
                                                            college.content
                                                                .address
                                                                ?.address.state
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <hr className="my-2" />
                                {college.content.featuredReview && (
                                    <div className="mt-1">
                                        <p className="flex items-center text-lg font-medium text-slate-800">
                                            <FaStar className="text-purple-500 mr-2.5" />
                                            Featured review
                                        </p>
                                        <div className="mt-2.5 border p-2 border-gray-200 bg-gray-50 rounded-lg">
                                            <p className="text-base font-medium text-slate-500">
                                                {
                                                    college.content
                                                        .featuredReview.author
                                                }{" "}
                                                at {college.content.entity.name}
                                            </p>
                                            <p className="mt-1.5 text-sm text-slate-800">
                                                {showMore ? (
                                                    <>
                                                        {
                                                            college.content
                                                                .featuredReview
                                                                .body
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        {college.content
                                                            .featuredReview.body
                                                            .length > 300
                                                            ? `${college.content.featuredReview.body.substring(
                                                                  0,
                                                                  300
                                                              )}....`
                                                            : college.content
                                                                  .featuredReview
                                                                  .body}
                                                    </>
                                                )}
                                                <span
                                                    onClick={() =>
                                                        setShowMore(!showMore)
                                                    }
                                                    className="text-primary-color inline-block font-medium cursor-pointer hover:bg-blue-50 px-1 py-0.5 transition rounded-md"
                                                >
                                                    {college.content
                                                        .featuredReview.body
                                                        .length > 300 &&
                                                    showMore
                                                        ? "Show less"
                                                        : "Show more"}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="w-full p-2 px-4">
                                {college.content.complete_profile && (
                                    <>
                                        <p className="flex items-center text-lg font-medium text-slate-800">
                                            <LiaBookSolid className="text-purple-500 mr-2" />
                                            Popular majors
                                        </p>
                                        <div className="mt-1.5 mb-6 flex flex-wrap">
                                            {college.content.complete_profile.popular_majors.map(
                                                (
                                                    major: string,
                                                    idx: number
                                                ) => (
                                                    <span
                                                        key={idx}
                                                        className="text-sm text-primary-color bg-blue-100 mr-2 my-1 py-0.5 px-1.5 rounded-md font-medium"
                                                    >
                                                        {major}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                        <hr className="my-2" />
                                        <p className="flex items-center text-lg font-medium text-slate-800">
                                            <FaMoneyBill className="text-green-500 mr-2.5" />
                                            Cost of attendance
                                        </p>
                                        <div className="mt-2 flex items-center">
                                            <div className="w-full flex flex-col items-center justify-center ">
                                                <p className="mt-5 text-2xl font-semibold text-primary-color">
                                                    {
                                                        college.content
                                                            .complete_profile
                                                            .cost.net_price
                                                    }
                                                </p>
                                                <span className="text-center text-sm text-gray-500 px-8 pt-2">
                                                    Average cost of attendance
                                                    after accounting for
                                                    financial aid
                                                </span>
                                            </div>
                                            <div className="w-full">
                                                <p className="text-gray-700 font-medium">
                                                    Average aid – 
                                                    <span className="text-sm text-primary-color bg-blue-100 ml-2 py-0.5 px-1.5 rounded-md font-medium">
                                                        {
                                                            college.content
                                                                .complete_profile
                                                                .cost
                                                                .average_aid
                                                        }
                                                    </span>
                                                </p>
                                                <p className="mt-1 text-gray-700 font-medium">
                                                    Percentage aid – 
                                                    <span className="text-sm text-primary-color bg-blue-100 ml-2 py-0.5 px-1.5 rounded-md font-medium">
                                                        {
                                                            college.content
                                                                .complete_profile
                                                                .cost
                                                                .percentage_aid
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                        <hr className="my-2 mt-8" />
                                        {/* <p className="flex items-center text-lg font-medium text-slate-800">
                                    <IoIosCheckmarkCircle className="text-primary-color mr-2.5" />
                                    Admissions
                                </p> */}
                                        {/* <div className="mt-3 flex items-start">
                                            <div className="w-full">
                                                {Object.keys(
                                                    college.content
                                                        .complete_profile
                                                        .admissions.statistics
                                                ).map(
                                                    (
                                                        key: string,
                                                        idx: number
                                                    ) => (
                                                        <div key={idx}>
                                                            {college.content
                                                                .complete_profile
                                                                ?.admissions
                                                                .statistics[
                                                                key as keyof AdmissionStatsType
                                                            ].length !== 0 && (
                                                                <div className="my-2 flex items-center">
                                                                    <p className="font-medium text-gray-700">
                                                                        {getStatName(
                                                                            key
                                                                        )}
                                                                    </p>
                                                                    <p className="ml-auto mr-0 text-primary-color bg-blue-50 px-1.5 py-0.5 text-sm font-medium rounded-md ">
                                                                        {
                                                                            college
                                                                                .content
                                                                                .complete_profile
                                                                                ?.admissions
                                                                                .statistics[
                                                                                key as keyof AdmissionStatsType
                                                                            ]
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <div className="w-full p-2 flex flex-col items-center justify-center">
                                                <p className="mt-4 text-2xl font-bold text-gray-800">
                                                    {
                                                        college.content
                                                            .complete_profile
                                                            .admissions
                                                            .deadlines
                                                            .application_deadline
                                                    }
                                                </p>
                                                <p className="text-gray-500 text-sm mt-0.5">
                                                    Application deadline
                                                </p>
                                                {college.content
                                                    .complete_profile.admissions
                                                    .deadlines
                                                    .early_action_deadline
                                                    .length !== 0 && (
                                                    <>
                                                        <p className="mt-8 text-2xl font-bold text-gray-800">
                                                            {
                                                                college.content
                                                                    .complete_profile
                                                                    .admissions
                                                                    .deadlines
                                                                    .early_action_deadline
                                                            }
                                                        </p>
                                                        <p className="text-gray-500 text-sm mt-0.5">
                                                            Early application
                                                            deadline
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        </div> */}
                                        <p className="flex items-center text-lg font-medium text-slate-800">
                                            <IoIosCheckmarkCircle className="text-primary-color mr-2.5" />
                                            Report card
                                        </p>
                                        <div className="mt-3">
                                            <div className="w-full flex items-center flex-wrap">
                                                {Object.keys(
                                                    college.content
                                                        .complete_profile
                                                        .niche_report_card
                                                ).map(
                                                    (
                                                        key: string,
                                                        idx: number
                                                    ) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center mr-8 my-1.5"
                                                        >
                                                            <p className="font-medium text-gray-600 mr-2">
                                                                {key} –
                                                            </p>
                                                            <p
                                                                className={`${getReportCardColors(
                                                                    college
                                                                        .content
                                                                        .complete_profile!
                                                                        .niche_report_card[
                                                                        key as keyof ReportCardType
                                                                    ]
                                                                )} font-medium py-0.5 px-2 rounded-md`}
                                                            >
                                                                {
                                                                    college
                                                                        .content
                                                                        .complete_profile!
                                                                        .niche_report_card[
                                                                        key as keyof ReportCardType
                                                                    ]
                                                                }
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Wrapper>
    );
};

export default CollegePage;
