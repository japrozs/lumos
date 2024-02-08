import { CollegeListItem } from "@/types";
import {
    getPillBgColor,
    getPillBorderColor,
    getPillEmoji,
    getPillIcon,
    getPillTextColor,
} from "@/utils/pill";
import React from "react";
import { Pill } from "../ui/pill";

interface AcceptanceRatePillProps {
    college: CollegeListItem;
}

export const AcceptanceRatePill: React.FC<AcceptanceRatePillProps> = ({
    college,
}) => {
    return (
        <Pill
            noMargin
            label={`${getPillEmoji(college)}\tAcceptance rate – ${
                college.content.complete_profile
                    ? college.content.complete_profile.admissions.statistics
                          .acceptance_rate
                    : `${((college.content.facts[0].value || 1.0) * 100)
                          .toFixed(1)
                          .toString()} %`
            }`}
        />
    );
};

interface FeesPillProps {
    college: CollegeListItem;
}

export const FeesPill: React.FC<FeesPillProps> = ({ college }) => {
    return (
        <Pill
            noMargin
            label={`$ ${
                college.content.complete_profile
                    ? college.content.complete_profile.cost.net_price.split(
                          "$"
                      )[1]
                    : (
                          college.content.facts[1].value || 10000
                      )?.toLocaleString()
            }`}
        />
    );
};

interface SATRangePillProps {
    college: CollegeListItem;
}

export const SATRangePill: React.FC<SATRangePillProps> = ({ college }) => {
    return (
        <Pill
            noMargin
            label={`🎓 SAT Range ${
                college.content.complete_profile &&
                college.content.complete_profile.admissions.statistics.sat_range
                    .length != 0
                    ? college.content.complete_profile.admissions.statistics
                          .sat_range
                    : college.content.facts[2].value || 400
            }`}
        />
    );
};

interface RatingPillProps {
    college: CollegeListItem;
}

export const RatingPill: React.FC<RatingPillProps> = ({ college }) => {
    return (
        <Pill
            borderColor={getPillBorderColor(college)}
            textColor={getPillTextColor(college)}
            bgColor={getPillBgColor(college)}
            icon={getPillIcon(college)}
            noMargin
            label={`${(college.content.grades[0]?.value || 1)?.toFixed(2)}`}
        />
    );
};
