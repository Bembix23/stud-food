import { Image, StyleSheet, Platform, View, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { commonStyles } from '@/constants/Style';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CameraComponent from '@/components/features/CameraComponent';

export default function HomeScreen() {
  return (
    <View style={commonStyles.homeContainer}>
      <Pressable style={commonStyles.profilePictureContainer} onPress={() => {router.push('../(b-user)/profileScreen')}}>
        <Image
          source={require('../../assets/images/photo-profil.png')}
          style={commonStyles.profilePicture}
        />
      </Pressable>
      <Text style={ commonStyles.welcomeTitle }>Stud'Food</Text>
      <Text style={ [commonStyles.stepTitle, styles.stepTitle] }>Mes Photos</Text>
      <CameraComponent />
      <Pressable style={styles.bottomButton} onPress={() => router.push('./')}>
        <Text style={styles.buttonText}>Prendre une photo</Text>
        <IconSymbol size={20} name="camera.fill" color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle:{
    marginTop: 10,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 100, // Ajustez cette valeur pour placer le bouton juste au-dessus de la navigation par onglets
    backgroundColor: '#358510',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 275,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});
