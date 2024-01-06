import { Tabs } from "expo-router";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default () => {
	return (
		<Tabs>
			<Tabs.Screen
				name='home'
				options={{
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='home' size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					headerShown: true,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name='person' size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
};
