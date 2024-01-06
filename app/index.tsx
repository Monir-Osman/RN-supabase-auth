import { Redirect, SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import Auth from "../components/Auth";

SplashScreen.preventAutoHideAsync();

export default function Page() {
	// the file stracture in expo router is going to have this file as the first page of the app
	//but you can change it to whatever you want by useing the <Redirect> component
	// return <View>This is the first page of your app.</View>;
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
		console.log("session", session);
	}, []);

	return !session && !session?.user ? (
		<View style={{ flex: 1 }}>
			<Auth />
			<Stack.Screen options={{ headerShown: false }} />
		</View>
	) : (
		<Redirect href='/home' />
	);
}
