import { Stack } from 'expo-router';

export default function TutoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome"/>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
