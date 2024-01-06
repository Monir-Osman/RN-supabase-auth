import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import {
	StyleSheet,
	Text,
	View,
	Alert,
	TextInput,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import { Session } from "@supabase/supabase-js";
import { router, useRouter } from "expo-router";
import Auth from "./Auth";
import { useAuth } from "../context/AuthContext";

export default function Account({ user }: any) {
	const [inputFocusUserName, setInputFocusUserName] = useState(false);
	const [usernameInput, setUsernameInput] = useState("");
	const { avatarUrl, updateProfile, loading } = useAuth();

	function handleCreateAccount() {
		updateProfile({
			username: usernameInput,
			avatar_url: avatarUrl,
		});
	}
	return (
		<View style={{ flex: 1, backgroundColor: "#fbfaf3", padding: 20 }}>
			{loading ? (
				<ActivityIndicator size={"large"} />
			) : (
				<View>
					{/* inputs */}
					<View style={{ gap: 25, marginTop: 40 }}>
						<View>
							<Text style={{ paddingBottom: 7 }}>
								Email address
							</Text>
							<TextInput
								style={styles.input}
								value={user?.email}
								editable={false}
							/>
						</View>

						<View>
							<Text style={{ paddingBottom: 7 }}>Username</Text>
							<TextInput
								style={[
									styles.input,
									{
										borderColor: inputFocusUserName
											? "#414345"
											: "#bcc0c4",
									},
								]}
								onChangeText={(text) => setUsernameInput(text)}
								value={usernameInput}
								placeholder='your username'
								autoCapitalize='none'
								onFocus={() => setInputFocusUserName(true)}
								onBlur={() => setInputFocusUserName(false)}
							/>
						</View>
					</View>
					<View style={{ marginTop: 60, backgroundColor: "#f3f827" }}>
						<TouchableOpacity
							style={styles.logBtn}
							onPress={() => handleCreateAccount()}
						>
							<Text>Create account</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
	btnText: {
		color: "white",
		fontSize: 16,
		fontWeight: "700",
	},
	input: {
		backgroundColor: "#fff",
		padding: 12,
		borderRadius: 8,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "#bcc0c4",
	},
	logBtn: {
		backgroundColor: "#f3f827",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 12,
		borderRadius: 8,
	},
});
