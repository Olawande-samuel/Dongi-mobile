/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#18658B",
				muted: "#99A2B3",
				"off-black": "#1A1B23",
				"success-100": "#D1FADF",
				"success-500": "#12B76A",
				support: "#676B83",
				client: {
					primary: "#18658B",
				},
				serviceProvider: {
					primary: "#E4AE1B",
					inactive: "#CCCCCC",
					secondary: "#F7EFDE",
				},
			},
		},
	},
	plugins: [],
};
