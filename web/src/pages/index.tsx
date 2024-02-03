import { Wrapper } from "@/components/shared/wrapper";
import React from "react";

export default function Home() {
    return (
        <div>
            <a href="/app" className="menlo text-purple-500 hover:underline">
                /app
            </a>
            <br />
            <a href="/login" className="menlo text-purple-500 hover:underline">
                /login
            </a>
            <br />
            <a
                href="/sign-up"
                className="menlo text-purple-500 hover:underline"
            >
                /sign-up
            </a>
        </div>
    );
}
