import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            screens: {
                mid: "870px",
            },
            spacing: {
                90: "22.5rem",
            },
            fontSize: {
                tiny: "0.89rem",
                smol: "0.95rem",
            },
            colors: {
                "red-dark": "rgba(235, 87,87, 0.1)",
                "primary-color": "#007AFF",
                "dark-compliment": "#0B0E11",
                "error-red": "#c54b4b",
                "dark-compliment-hovered": "#14181D",
                "text-compliment-color": "#DEE3EA",
                "input-border-blue": "#88B9EA",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
