import * as React from "react";
import Svg, { Path } from "react-native-svg";

function Home({ isActive }: { isActive: boolean }) {
	return (
		<Svg
			width={25}
			height={24}
			viewBox="0 0 25 24"
			fill={isActive ? "#18658B" : "#FFF"}
		>
			<Path
				d="M2.489 12.958c-.38-2.637-.57-3.956-.029-5.083.541-1.127 1.691-1.813 3.992-3.183l1.385-.825C9.925 2.622 10.971 2 12.125 2c1.154 0 2.199.622 4.288 1.867l1.385.825c2.3 1.37 3.451 2.056 3.992 3.183.541 1.127.35 2.446-.03 5.083l-.278 1.937c-.487 3.388-.731 5.081-1.906 6.093C18.401 22 16.678 22 13.231 22h-2.212c-3.447 0-5.17 0-6.345-1.012-1.175-1.012-1.419-2.705-1.906-6.093l-.279-1.937z"
				stroke={isActive ? "#18658B" : "#CCC"}
				strokeWidth={1.5}
				// fill={isActive ? "#18658B" : ""}
			/>
			<Path
				d="M9.125 16c.85.63 1.885 1 3 1s2.15-.37 3-1"
				stroke={isActive ? "#18658B" : "#CCC"}
				strokeWidth={1.5}
				// fill={isActive ? "#18658B" : ""}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

export default Home;
