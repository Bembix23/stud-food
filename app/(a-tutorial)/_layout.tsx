import { Stack } from 'expo-router';

export default function TutoLayout() {

  

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="firstStep"/>
      <Stack.Screen name="secondStep"/>
      <Stack.Screen name="thirdStep"/>
    </Stack>
  );
}
