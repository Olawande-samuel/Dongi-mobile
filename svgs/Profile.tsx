import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Profile({ isActive }: { isActive: boolean }) {
	return (
		<Svg
			width={25}
			height={24}
			viewBox="0 0 25 24"
			fill={isActive ? "#18658B" : "#FFF"}
		>
			<Path
				d="M12.875 12a3 3 0 100-6 3 3 0 000 6z"
				stroke={isActive ? "#18658B" : "#CCC"}
				strokeWidth={1.5}
			/>
			<Path
				d="M12.875 22c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
				stroke={isActive ? "#18658B" : "#CCC"}
				strokeWidth={1.5}
			/>
			<Path
				d="M18.845 20c-.16-2.892-1.045-5-5.97-5s-5.81 2.108-5.97 5"
				stroke={isActive ? "#18658B" : "#CCC"}
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

export default Profile;
