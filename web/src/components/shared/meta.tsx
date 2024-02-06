import React from "react";

interface MetaProps {
    title: string;
    owner?: string;
    description?: string;
}

export const Meta: React.FC<MetaProps> = ({ title, owner, description }) => {
    return (
        <>
            <meta name="description" content={description} />
            {owner ? <meta name="author" content={owner} /> : ""}
            <meta
                name="keywords"
                content={`Lumos, LumosStudy, College, colleges-preparation, organise, etc.`}
            />
            <meta name="og:title" content={title || "Lumos"} />
            <meta name="og:type" content={owner ? "lumos.study" : "website"} />
            <meta property="og:determiner" content="the" />
            <meta property="og:locale" content="en_GB" />
            <meta property="og:site_name" content="Lumos" />
            <meta
                name="og:description"
                content={description != null ? description : "Lumos"}
            />
            <meta name="og:site_name" content="Lumos" />
            <meta name="og:image" content={`../../public/logo.png`} />
            <meta property="og:image:alt" content="Lumos" />
        </>
    );
};
