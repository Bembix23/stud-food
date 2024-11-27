import { commonStyles } from '@/constants/Style';
import { router } from 'expo-router';
import { Text, View, Image, StyleSheet, Pressable} from 'react-native';

export default function SecondStep() {
  return (
    <View style={ commonStyles.welcomeContainer }>
      <Pressable style={ styles.skipButton } onPress={() => {router.push('/')}}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </Pressable>
      <Text style={ commonStyles.welcomeTitle }>Stud'Food</Text>
      <Text style={ styles.stepTitle }>Rapide</Text>
      <Image source={require('../../assets/images/rapide.png')} style={ styles.stepImage }/>
      <Text style={ styles.stepText }>Nous savons que vous êtes pressés donc le temps de préparation de nos plats est en moyenne de {''}
        <Text style={ commonStyles.underlignText }>15 minutes</Text> !
      </Text>
      <Pressable style={styles.stepButton} onPress={() => {router.push('/thirdStep')}}>
        <Text style={styles.buttonText}>Suivant</Text>
      </Pressable>
      <Image source={require('../../assets/images/step2.png')} style={ styles.stepStateImage }/>
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
    height: 120, 
    marginTop: 50,
  },
  stepText: {
    fontSize: 16,
    textAlign: 'center',
    width: 300,
    margin: 30,
  },
  skipButton: {
    left: 150,
  },
  skipButtonText: {
    color: "#358510",
    fontWeight: "500",
    fontSize: 16,
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