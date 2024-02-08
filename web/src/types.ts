import { IconType } from "react-icons/lib";

export interface AdmissionStatsType {
    acceptance_rate: string;
    early_decision_acceptance_rate: string;
    total_applicants: string;
    sat_range: string;
    sat_reading: string;
    sat_math: string;
    sat_submission_percentage: string;
    act_range: string;
    act_english: string;
    act_math: string;
    act_writing: string;
    act_submission_percentage: string;
}

export interface ReportCardType {
    Academics: string;
    Value: string;
    Diversity: string;
    Campus: string;
    Athletics: string;
    "Party Scene": string;
    Professors: string;
    Location: string;
    Dorms: string;
    "Campus Food": string;
    "Student Life": string;
    Safety: string;
}
export interface CollegeListItem {
    guid: string;
    badge: {
        display: string;
        ordinal: number;
        total: number;
        vanityUrl: string;
        photoURLs: {
            desktop: string;
            mobile: string;
        };
    };
    content: {
        centroid: {
            lat: number;
            lon: number;
        };
        entity: {
            abbreviation: string;
            alternates: { ceeb: string; ipeds: string };
            character: string;
            claimed: boolean;
            displayable: boolean;
            genus: string;
            guid: string;
            isClaimed: boolean;
            isPremium: boolean;
            location: string;
            name: string;
            parentGUIDs: {
                country: string;
                county: string;
                gradSchool: string;
                neighborhood: string;
                state: string;
                town: string;
                zipCode: string;
            };
            premium: boolean;
            published: boolean;
            shortName: string;
            tagline: string[];
            type: string;
            url: string;
            variation: number;
        };
        facts: [
            {
                config: {
                    format: string[];
                    rounding: string[];
                };
                label: string;
                value: number;
            },
            {
                config: {
                    format: string[];
                    rounding: string[];
                };
                label: string;
                value: number;
            },
            { label: string; value: string }
        ];
        featuredReview: {
            author: string;
            body: string;
            categories: string[];
            created: string;
            guid: string;
            rating: number;
        };
        grades: [
            {
                description: string;
                guid: string;
                label: string;
                value: number;
            }
        ];
        photos: {
            default: {
                crops: {
                    DesktopHeader: string;
                    MobileHeader: string;
                    Original: string;
                    Thumbnail: string;
                };
                guid: string;
                licenseName: string;
                uploadTimestamp: string;
            };
            editorial: {
                crops: {
                    Original: string;
                };
                guid: string;
                licenseName: string;
                uploadTimestamp: string;
            };
            mapbox_header: {
                crops: {
                    DesktopHeader: string;
                    MobileHeader: string;
                };
                guid: string;
                licenseName: string;
            };
            spotlight: {
                crops: {
                    Original: string;
                    Spotlight: string;
                };
                guid: string;
                licenseName: string;
            };
        };
        reviewAverage: {
            average: number;
            count: number;
        };
        virtualTour: [
            {
                label: string;
                value: string;
            }
        ];
        address?: {
            place_id: number;
            licence: string;
            osm_type: string;
            osm_id: number;
            lat: string;
            lon: string;
            class: string;
            type: string;
            place_rank: number;
            importance: number;
            addresstype: string;
            name: string;
            display_name: string;
            address: {
                building: string;
                house_number: string;
                road: string;
                neighbourhood: string;
                city: string;
                county: string;
                state: string;
                "ISO3166-2-lvl4": string;
                postcode: string;
                country: string;
                country_code: string;
            };
            boundingbox: string[];
        };
        complete_profile?: {
            niche_report_card: ReportCardType;
            after_college: {
                median_earning_6_years: string;
                graduation_rate: string;
                employment_rate: string;
            };
            students: {
                full_time: string;
                part_time: string;
                over_25: string;
                pell_grant: string;
                varsity_athletes: string;
            };
            popular_majors: string[];
            cost: {
                net_price: string;
                average_aid: string;
                percentage_aid: string;
            };
            admissions: {
                statistics: AdmissionStatsType;
                deadlines: {
                    application_deadline: string;
                    early_decision_deadline: string;
                    early_action_deadline: string;
                    offers_early_decision: string;
                    offers_early_action: string;
                    application_fee: string;
                    application_website: string;
                    accepts_common_app: string;
                    accepts_coalition_app: string;
                };
                requirements: {
                    gpa: string;
                    rank: string;
                    transcript: string;
                    college_prep_coures: string;
                    "sat/act": string;
                    recommendations: string;
                };
            };
        };
    };
}

export interface Column {
    name: string;
    items: {
        id: string;
        content: string;
    }[];
}

export interface Card {
    id: string;
    content: string;
}

export interface ResourceLinkType {
    title: string;
    url: string;
}

export interface ResourceType {
    name: string;
    description: string;
    slug: string;
    icon: IconType;
    color: string;
    links: ResourceLinkType[];
}
