import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Search({ isActive }: { isActive: boolean }) {
	return (
		<Svg
			width={25}
			height={24}
			viewBox="0 0 25 24"
			fill={isActive ? "#18658B" : "#FFF"}
		>
			<Path
				d="M11.875 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
				stroke={isActive ? "#18658B" : "#CCC"}
				strokeWidth={1.5}
			/>
			<Path
				d="M20.375 20l2 2"
				stroke={isActive ? "#18658B" : "#CCC"}
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

export default Search;
