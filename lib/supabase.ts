import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://btuzikenfukepaxopioe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0dXppa2VuZnVrZXBheG9waW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzNTYwNTEsImV4cCI6MjAxOTkzMjA1MX0.BKaTuLtr7NYMb_CskyJQkZiIZ35iqSixvEV2q_L4CWc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
})