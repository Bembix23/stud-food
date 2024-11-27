import { Image, StyleSheet, Platform, View, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { commonStyles } from '@/constants/Style';

export default function HomeScreen() {
  return (
    <View style={commonStyles.homeContainer}>
      <Image source={require('../../assets/images/photo-profil.png')} style={ commonStyles.profilePicture }/>
      <Text style={ commonStyles.welcomeTitle }>Stud'Food</Text>
      <Text style={ [commonStyles.stepTitle, styles.stepTitle] }>Mes Photos</Text>
      <Pressable style={styles.bottomButton} onPress={() => router.push('/somePage')}>
        <Text style={styles.buttonText}>Aller à une autre page</Text>
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
    bottom: 20, // Ajustez cette valeur pour placer le bouton juste au-dessus de la navigation par onglets
    backgroundColor: '#FFA800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 275,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
