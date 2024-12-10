const flowbite = require("flowbite-react/tailwind")

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}", flowbite.content()],
	theme: {
		extend: {},
	},
	plugins: [flowbite.plugin()],
};
