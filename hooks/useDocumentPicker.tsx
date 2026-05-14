import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { toast } from "sonner-native";

const useDocumentPicker = () => {
	const pickDocument = async () => {
		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: "image/*",
			});

			if (result.assets) {
				return { result: result.assets[0] };
			}
		} catch (error) {
			toast.error("Error uploading document");
		}
	};
	const pickImage = async (
		aspectRatio?: [number, number],
	): Promise<
		| {
				uri: string;
				type: string;
				name: string;
				base64: string | null | undefined;
		  }
		| null
		| undefined
	> => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				aspect: aspectRatio ? aspectRatio : [4, 3],
				quality: 1,
				base64: true,
			});
			if (!result.canceled && result.assets && result.assets.length > 0) {
				const asset = result.assets[0];
				const mimeType = asset.mimeType ?? "image/jpeg";
				const fileName = asset.fileName ?? `image.${mimeType.split("/")[1]}`;
				const ext = mimeType.split("/")[1];
				const dest = new File(Paths.cache, `picked_${Date.now()}.${ext}`);
				new File(asset.uri).copy(dest);
				return {
					uri: dest.uri,
					name: fileName,
					type: mimeType,
					base64: asset.base64,
				};
			}
			return null;
		} catch (error) {
			toast.error("Error uploading image");
		}
	};
	return { pickDocument, pickImage };
};

export default useDocumentPicker;
