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
            <a href="/signup" className="menlo text-purple-500 hover:underline">
                /signup
            </a>
        </div>
    );
}
