import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

import '../../stud-food/FirebaseConfig'; 

// Empêche la splash screen de se cacher automatiquement avant le chargement des assets.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tutorial)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(tvbs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found"/>
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
