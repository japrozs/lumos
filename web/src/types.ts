import { IconType } from "react-icons/lib";

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
