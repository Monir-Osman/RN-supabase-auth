import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Account from "../../components/Account";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

const Profile = () => {
	const { user, username, signOut } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!user?.email) router.push("/");
	}, [user]);

	return (
		<View style={{ flex: 1 }}>
			{!user?.email ? (
				<View>
					<Text>Not logged in</Text>
				</View>
			) : (
				<View style={{ flex: 1 }}>
					{username ? (
						<View>
							<Text>Username: {username}</Text>
							<Text>Email: {user?.email}</Text>
							<TouchableOpacity onPress={() => signOut()}>
								<Text>Log Out</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={{ flex: 1 }}>
							<Account user={user} />
						</View>
					)}
				</View>
			)}
		</View>
	);
};

export default Profile;
