import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { toast } from "sonner-native";

const useDocumentPicker = () => {
	const pickDocument = async () => {
		console.log("clicked");
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
	return { pickDocument };
};

export default useDocumentPicker;
