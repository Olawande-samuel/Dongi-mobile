import { View, Text, TextInput, Pressable } from "react-native";
import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";

function Search() {
	return (
		<Svg width={18} height={18} viewBox="0 0 25 24" fill="none">
			<Path
				d="M11.875 21a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
				stroke="#1A1B23"
				strokeWidth={1.5}
			/>
			<Path
				d="M20.375 20l2 2"
				stroke="#1A1B23"
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

const FormSchema = z.object({
	search: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

const SearchBar = () => {
	const params = useLocalSearchParams();
	const searchText = params.query;

	const form = useForm<FormType>({
		defaultValues: {
			search: "",
		},
		resolver: zodResolver(FormSchema),
	});

	React.useEffect(() => {
		if (searchText) {
			form.reset({ search: searchText as string });
		}
	}, [searchText]);

	console.log({ params });

	function submit(val: FormType) {
		console.log(val);
		router.push(`/client/search/search-text?query=${val.search}`);
	}
	return (
		<View>
			<View className="border flex-row items-center justify-between border-muted rounded-lg  px-3 py-[2px]">
				<Controller
					control={form.control}
					name="search"
					render={({ field }) => (
						<TextInput
							className="flex-1 py-2"
							placeholder="I am looking for..."
							value={field.value}
							onChangeText={field.onChange}
						/>
					)}
				/>
				<Pressable onPress={form.handleSubmit(submit)}>
					<Search />
				</Pressable>
			</View>
		</View>
	);
};

export default SearchBar;
