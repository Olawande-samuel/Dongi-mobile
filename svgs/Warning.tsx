import * as React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function Warning({ isError = false }: { isError?: boolean }) {
	return (
		<Svg width={263} height={263} viewBox="0 0 263 263" fill="none">
			<G filter="url(#filter0_i_47_3154)">
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M33.194 114.635c0-34.931 0-52.397 4.13-58.274 4.117-5.865 20.534-11.49 53.38-22.73l6.258-2.14c17.116-5.866 25.669-8.794 34.538-8.794 8.869 0 17.422 2.928 34.538 8.793l6.259 2.141c32.845 11.24 49.262 16.865 53.38 22.73 4.129 5.877 4.129 23.354 4.129 58.274v17.192c0 61.583-46.302 91.479-75.357 104.161-7.876 3.44-11.808 5.166-22.949 5.166-11.141 0-15.074-1.726-22.949-5.166-29.055-12.693-75.357-42.567-75.357-104.161v-17.192zM131.5 80.042a8.194 8.194 0 018.192 8.192v43.692a8.192 8.192 0 01-16.384 0V88.234a8.193 8.193 0 018.192-8.192zm0 95.575a10.926 10.926 0 0010.923-10.923 10.922 10.922 0 10-10.923 10.923z"
					fill={isError ? "#D92D20" : "#FDB022"}
				/>
			</G>
			<Defs></Defs>
		</Svg>
	);
}

export default Warning;
