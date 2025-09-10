import { useEffect, useState } from "react";

// In-memory cache for distances keyed by "origin|destination"
const distanceCache = new Map<string, string | null>();

const useDistance = ({
	origin,
	destination,
}: {
	origin: string;
	destination: string;
}) => {
	const [distance, setDistance] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		let isActive = true;
		const controller = new AbortController();

		const fetchDistance = async () => {
			if (!origin || !destination) {
				setDistance(null);
				setLoading(false);
				return;
			}

			const cacheKey = `${origin}|${destination}`;
			if (distanceCache.has(cacheKey)) {
				const cached = distanceCache.get(cacheKey) ?? null;
				if (isActive) {
					setDistance(cached);
					setLoading(false);
				}
				return;
			}

			setLoading(true);
			try {
				const response = await fetch(
					`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
						origin
					)}&destinations=${encodeURIComponent(destination)}&key=${
						process.env.EXPO_PUBLIC_GOOGLE_API
					}`,
					{ signal: controller.signal }
				);
				const data = await response.json();
				const meters: number | undefined =
					data?.rows?.[0]?.elements?.[0]?.distance?.value;
				let computed: string | null = null;
				if (typeof meters === "number") {
					computed =
						meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${meters} m`;
				}

				// save to cache
				distanceCache.set(cacheKey, computed);

				if (isActive) {
					setDistance(computed);
				}
			} catch (error: any) {
				if (error?.name !== "AbortError") {
					console.error("Failed to fetch distance", error);
				}
			} finally {
				if (isActive) {
					setLoading(false);
				}
			}
		};

		fetchDistance();

		return () => {
			isActive = false;
			controller.abort();
		};
	}, [origin, destination]);

	return { distance, loading };
};
export default useDistance;
