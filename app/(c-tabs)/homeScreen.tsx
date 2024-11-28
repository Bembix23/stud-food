import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { router } from 'expo-router';
import { commonStyles } from '@/constants/Style';
import CameraComponent from '@/components/features/CameraComponent';

export default function HomeScreen() {
  return (
    <View style={commonStyles.homeContainer}>
      <Image
        source={require('../../assets/images/photo-profil.png')}
        style={commonStyles.profilePicture}
      />
      <Text style={commonStyles.welcomeTitle}>Stud'Food</Text>
      <CameraComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  stepContainer: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  welcomeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  reactLogo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: Platform.OS === 'ios' ? 60 : 40,
  },
});
