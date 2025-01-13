import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Star() {
	return (
		<Svg width={15} height={14} viewBox="0 0 15 14" fill="none">
			<Path
				d="M13.99 5.529H9.037L7.5.726 5.964 5.529H1.01l4.002 2.964-1.514 4.781L7.5 10.31l4.003 2.964-1.537-4.803 4.025-2.942z"
				fill="#E4AE1B"
			/>
		</Svg>
	);
}

export default Star;
