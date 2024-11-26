import { commonStyles } from '@/constants/Style';
import { router } from 'expo-router';
import { Text, View, Image, StyleSheet, Pressable} from 'react-native';

export default function FirstStep() {
  return (
    <View style={ commonStyles.welcomeContainer }>
      <Text style={ commonStyles.welcomeTitle }>Stud'Food</Text>
      <Text style={ styles.stepTitle }>Simple</Text>
      <Image source={require('../../assets/images/casserole.png')} style={ styles.stepImage }/>
      <Text style={ styles.stepText }>Des recettes{' '}
        <Text style={ commonStyles.underlignText }>simples</Text>, pas besoin d'être un chef pour réaliser nos plats !
      </Text>
      <Pressable style={styles.stepButton} onPress={() => {router.push('/secondStep')}}>
        <Text style={styles.buttonText}>Suivant</Text>
      </Pressable>
      <Image source={require('../../assets/images/step1.png')} style={ styles.stepStateImage }/>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle: {
    fontSize: 24,
    fontWeight: 400,
    color: "red",
    fontFamily: "Fugaz One",
    marginTop: 40,
  },
  stepImage: {
    width: 160, 
    height: 170, 
    marginTop: 50,
  },
  stepText: {
    fontSize: 16,
    textAlign: 'center',
    width: 300,
    margin: 30,
  },
  stepButton: {
    marginTop: 10,
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
  stepStateImage: {
    width: 50,
    height: 6,
    marginTop: 50,
  }
});