import { View, Text, ImageSourcePropType, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

function Links({
	source,
	title,
	link,
}: {
	source: ImageSourcePropType;
	title: string;
	link: string;
}) {
	return (
		<Link href={link}>
			<View className="flex-row w-full justify-between items-center">
				<View className="flex-row flex-1 gap-2 items-center">
					<Image source={source} className="w-6 h-6" resizeMode="contain" />
					<Text className="flex-1 text-base text-off-black font-regular max-w-[231px]">{title}</Text>
				</View>

				<Ionicons name="arrow-forward" size={20} color="#676B83" />
			</View>
		</Link>
	);
}

export default Links