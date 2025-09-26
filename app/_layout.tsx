import AsyncStorage from '@react-native-async-storage/async-storage'
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { useColorScheme } from "react-native"
import { Colors } from "../constants/Colors"

export const AuthContext = createContext<{ token: string | null; setToken: (t: string | null) => void; loadingAuth: boolean }>({ token: null, setToken: () => {}, loadingAuth: true })

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light
  const [token, setTokenState] = useState<string | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('authToken')
        if (stored) setTokenState(stored)
      } finally {
        setLoadingAuth(false)
      }
    })()
  }, [])

  const setToken = async (t: string | null) => {
    setTokenState(t)
    if (t) await AsyncStorage.setItem('authToken', t)
    else await AsyncStorage.removeItem('authToken')
  }

  const authValue = useMemo(() => ({ token, setToken, loadingAuth }), [token, loadingAuth])
  return (
    <AuthContext.Provider value={authValue}>
      <StatusBar style={'auto'} />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.iconColorFocused,
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="category/section" options={{ headerShown: false }} />
      </Stack>
    </AuthContext.Provider>
  )
}