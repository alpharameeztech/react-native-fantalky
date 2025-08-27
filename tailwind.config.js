/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./app/**/*.{js,jsx,ts,tsx}",        // all screens, route groups: (tabs), (screens), etc.
        "./components/**/*.{js,jsx,ts,tsx}", // shared UI
        "./hooks/**/*.{js,jsx,ts,tsx}",      // custom hooks that render UI
        "./constants/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {},
    },
    plugins: [],
}