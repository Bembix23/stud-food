import { router } from 'expo-router';
import { Text, View, Image, StyleSheet, Pressable} from 'react-native';
import { commonStyles } from '@/constants/Style';

export default function Welcome() {
  return (
    <View style={ commonStyles.welcomeContainer }>
      <Text style={ commonStyles.welcomeTitle }>Bienvenue sur Stud'Food</Text>
      <Image source={require('../../assets/images/welcome-image.png')} style={ styles.welcomeImage }/>
      <Pressable style={styles.welcomeButton} onPress={() => {router.push('/firstStep')}}>
        <Text style={styles.buttonText}>C'est parti !</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeImage: {
    width: 261, 
    height: 210, 
    marginTop: 50,
  },
  welcomeButton: {
    marginTop: 50,
    width: 250,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#358510",
    borderStyle: "solid",
    backgroundColor: "#358510",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: 16,
    margin: "auto",
  },
});