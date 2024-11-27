import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from "@/hooks/useColorScheme";
import "../../stud-food/FirebaseConfig";
import { AsyncStorage } from '@react-native-async-storage/async-storage';

// Empêche la splash screen de se cacher automatiquement avant le chargement des assets.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();
  const [tutorialCompleted, setTutorialCompleted] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
    'Pattaya-Regular': require('../assets/fonts/Pattaya-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'FugazOne-Regular': require('../assets/fonts/FugazOne-Regular.ttf'),
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    const checkTutorialCompletion = async () => {
      try {
        const value = await AsyncStorage.getItem('tutorialCompleted');
        if (value === 'true') {
          setTutorialCompleted(true);
        }
      } catch (e) {
        console.error('Failed to load the data from storage');
      } finally {
        setIsLoading(false);
      }
    };

    checkTutorialCompletion();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (isLoading) {
    return <AppLoading />;
  }

  if (tutorialCompleted) {
    router.push('/(user)/index');
  } else {
    router.push('/(a-tutorial)/firstStep');
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(a-tutorial)" options={{ headerShown: false }} />
        <Stack.Screen name="(b-user)" options={{ headerShown: false }} />
        <Stack.Screen name="(c-tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
