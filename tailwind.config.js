/** @type {import('tailwindcss').Config} */
module.exports = {
	// NOTE: Update this to include the paths to all of your component files.
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#18658B",
				primaryII: "#E4AE1B",
				muted: "#99A2B3",
				light: "#F9FAFC",
				inactive: "#CCCCCC",
				support: "#676B83",
				"error-600": "#D92D20",
				"off-black": "#1A1B23",
				"success-100": "#D1FADF",
				"success-500": "#12B76A",
				"inner-light": "#F2F2F2",
				"inner-background-light": "#F9FAFC",
				"outer-light": "#FAFAFA",
				"blue-light": "#B9E6FE",
				"blue-light-500": "#0BA5EC",
				service: {
					primary: "#E4AE1B",
					"primary-light": "#F7EFDE",
					inactive: "#CCCCCC",
				},
				client: {
					primary: "#18658B",
					"primary-light": "#1FB4FF1A",
				},
			},
			fontFamily: {
				light: ["PlusJakartaSans_300Light"],
				regular: ["PlusJakartaSans_400Regular"],
				medium: ["PlusJakartaSans_500Medium"],
				semibold: ["PlusJakartaSans_600SemiBold"],
				bold: ["PlusJakartaSans_700Bold"],
				extrabold: ["PlusJakartaSans_800ExtraBold"],
			},
		},
	},
	plugins: [],
};
