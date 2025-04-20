import { SIZES } from "@/utils/constants";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function EmptyList() {
	return (
		<Svg
			width={SIZES.height > 700 ? 101 : 80}
			height={SIZES.height > 700 ? 100 : 79}
			viewBox="0 0 101 100"
			fill="none"
		>
			<Path
				d="M84.875 31.25v41.125c0 6.627-5.373 12-12 12h-44.75c-6.627 0-12-5.373-12-12V31.25m68.75 0l-12.11-12.11a12 12 0 00-8.486-3.515H36.721a12 12 0 00-8.486 3.515l-12.11 12.11m68.75 0h-68.75M56.75 62.5l9.375 9.375m-6.25-15.625a9.375 9.375 0 11-18.75 0 9.375 9.375 0 0118.75 0z"
				stroke="#E4AE1B"
				strokeWidth={4}
			/>
		</Svg>
	);
}

export default EmptyList;
