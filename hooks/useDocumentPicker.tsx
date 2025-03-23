import * as DocumentPicker from "expo-document-picker";
import { toast } from "sonner-native";
import * as ImagePicker from "expo-image-picker";

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
		aspectRatio?: [number, number]
	): Promise<
		| {
				uri: string;
				type: string | undefined;
				name: string;
		  }
		| null
		| undefined
	> => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: aspectRatio ? aspectRatio : [4, 3],
				quality: 1,
			});
			if (!result.canceled && result.assets && result.assets.length > 0) {
				const asset = result.assets[0];
				const fileName =
					asset.fileName ?? `image.${asset.mimeType?.split("/")[1]}`;
				const fileObject = {
					uri: asset.uri,
					name: fileName,
					type: asset.mimeType,
					// size: asset.fileSize,
					// height: asset.height,
					// width: asset.width,
				};

				return fileObject;
			}
			return null;
		} catch (error) {
			console.log(error);
		}
	};
	return { pickDocument, pickImage };
};

export default useDocumentPicker;
