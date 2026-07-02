import { useLocationContext } from "@/providers/LocationProvider";

// Location is requested once by LocationProvider (mounted in the
// authenticated layout); this hook just reads the shared value.
const useCurrentLocation = () => useLocationContext();

export default useCurrentLocation;
