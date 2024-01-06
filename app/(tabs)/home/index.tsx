import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import { useAuth } from "../../../context/AuthContext";

const Page = () => {
	const { user, getProfile, username, userUpdated } = useAuth();
	useEffect(() => {
		if (user) getProfile();
	}, [user, userUpdated]);

	return (
		<View style={{ flex: 1, backgroundColor: "#fbfaf3" }}>
			{user?.email ? (
				<View>
					{username ? (
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<View style={styles.container}>
								<Image
									source={require("../../../assets/images/logo-main.png")}
									style={styles.imgCon}
								/>
							</View>
							<View>
								<Text style={styles.welcomeTxt}>
									Welcome dear, {username}
								</Text>
							</View>
						</View>
					) : (
						<View>
							<Text>Logged in as {user?.email}</Text>
							<Text>
								Please Go to your profile in order to complete
								the account creation.
							</Text>
						</View>
					)}
				</View>
			) : (
				<Text>Not logged in</Text>
			)}
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
	},
	imgCon: {
		width: 200,
		height: 200,
	},
	welcomeTxt: {
		marginTop: 20,
		marginBottom: 20,
		fontSize: 28,
		fontWeight: "bold",
		textAlign: "center",
		color: "#000000",
	},
});
