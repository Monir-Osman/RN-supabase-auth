import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	Alert,
	ActivityIndicatorBase,
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [inputFocusEmail, setInputFocusEmail] = useState(false);
	const [inputFocusPass, setInputFocusPass] = useState(false);
	const { signIn, signUp, loading } = useAuth();

	const { top } = useSafeAreaInsets();
	async function signInWithEmail() {
		signIn(email, password);
	}

	async function signUpWithEmail() {
		signUp(email, password);
	}
	return (
		<View style={{ flex: 1, backgroundColor: "#fbfaf3", padding: 20 }}>
			{loading ? (
				<ActivityIndicator size={"large"} />
			) : (
				<View style={[styles.container, { paddingTop: top + 30 }]}>
					{/* logo */}
					<View>
						<Image
							source={require("../assets/images/logo-with-text-black.png")}
							style={styles.image}
						/>
					</View>
					<Text style={styles.welcomeTxt}>Hi, welcome back</Text>

					{/* Social login */}
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginTop: 45,
						}}
					>
						<TouchableOpacity style={styles.btnContainer}>
							<Ionicons
								name='logo-google'
								size={20}
								color={"#ffffff"}
							/>
							<Text style={styles.btnText}>Google</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.btnContainer}>
							<Ionicons
								name='logo-facebook'
								size={20}
								color={"#ffffff"}
							/>
							<Text style={styles.btnText}>Facebook</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.btnContainer}>
							<Ionicons
								name='logo-apple'
								size={20}
								color={"#ffffff"}
							/>
							<Text style={styles.btnText}>Apple ID</Text>
						</TouchableOpacity>
					</View>

					{/* inputs */}
					<View style={{ gap: 25, marginTop: 40 }}>
						<View>
							<Text style={{ paddingBottom: 7 }}>
								Email address
							</Text>
							<TextInput
								style={[
									styles.input,
									{
										borderColor: inputFocusEmail
											? "#414345"
											: "#bcc0c4",
									},
								]}
								onChangeText={setEmail}
								value={email}
								placeholder='user@example.com'
								onFocus={() => setInputFocusEmail(true)}
								onBlur={() => setInputFocusEmail(false)}
								autoCapitalize='none'
							/>
						</View>

						<View>
							<Text style={{ paddingBottom: 7 }}>Password</Text>
							<TextInput
								style={[
									styles.input,
									{
										borderColor: inputFocusPass
											? "#414345"
											: "#bcc0c4",
									},
								]}
								onChangeText={setPassword}
								value={password}
								placeholder='password'
								keyboardType='visible-password'
								onFocus={() => setInputFocusPass(true)}
								onBlur={() => setInputFocusPass(false)}
							/>
						</View>
					</View>

					{/* Login btn */}
					<View style={{ marginTop: 60 }}>
						<TouchableOpacity
							style={styles.logBtn}
							onPress={() => signInWithEmail()}
						>
							<Text>Log In</Text>
						</TouchableOpacity>
					</View>

					<View style={{ marginTop: 20 }}>
						<TouchableOpacity
							style={styles.signupbtn}
							onPress={() => signUpWithEmail()}
						>
							<Text>Sign up</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</View>
	);
};

export default Auth;

const styles = StyleSheet.create({
	container: {},
	image: {
		width: 150,
		height: 100,
		resizeMode: "contain",
	},
	welcomeTxt: { marginTop: 50, fontSize: 30, fontWeight: "bold" },
	btnContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 6,
		backgroundColor: "black",
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 5,
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
	signupbtn: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "black",
	},
	newUserTxt: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
});
