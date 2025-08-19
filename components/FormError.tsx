import { Text } from "react-native";

const FormError = ({ value }: { value: string }) => {
	return <Text className="text-red-500 text-xs">{value}</Text>;
};
export default FormError;
