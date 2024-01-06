// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [username, setUsername] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const [userUpdated, setUserUpdated] = useState(false);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
		});
		console.log("user", user);
	}, []);

	const signIn = async (email: string, password: string) => {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	};

	const signUp = async (email: string, password: string) => {
		setLoading(true);
		const {
			data: { session },
			error,
		} = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	};

	const signOut = async () => {
		try {
			setLoading(true);
			await supabase.auth.signOut();
			setUser(null);
		} catch (error) {
			Alert.alert("Error signing out:", error.message);
		} finally {
			setLoading(false);
		}
	};

	async function getProfile() {
		try {
			setLoading(true);
			if (!user) throw new Error("No user on the session!");

			const { data, error, status } = await supabase
				.from("profiles")
				.select(`username, avatar_url`)
				.eq("id", user?.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				setUsername(data.username);
				setAvatarUrl(data.avatar_url);
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	async function updateProfile({
		username,
		avatar_url,
	}: {
		username: string;
		avatar_url: string;
	}) {
		console.log(
			"username",
			username,
			"avatar_url",
			avatar_url,
			"user",
			user
		);
		try {
			setLoading(true);
			if (!user) throw new Error("No user on the session!");

			const updates = {
				id: user?.id,
				username,
				avatar_url,
				updated_at: new Date(),
			};

			const { error } = await supabase.from("profiles").upsert(updates);

			if (error) {
				throw error;
			} else {
				setUserUpdated(true);
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				signIn,
				signUp,
				signOut,
				loading,
				getProfile,
				updateProfile,
				username,
				avatarUrl,
				setUsername,
				setAvatarUrl,
				userUpdated,
				setUserUpdated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export { AuthProvider, useAuth };
