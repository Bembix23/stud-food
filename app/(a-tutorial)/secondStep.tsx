import { commonStyles } from '@/constants/Style';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, StyleSheet, Pressable} from 'react-native';

export default function SecondStep() {
  const completeTutorial = async () => {
    try {
      await AsyncStorage.setItem('tutorialCompleted', 'true');
      router.push('../(b-user)/');
    } catch (e) {
      console.error('Failed to save the data to the storage');
    }
  };
  const validateTuto = () => {
    completeTutorial();
  };
  return (
    <View style={ commonStyles.welcomeContainer }>
      <Pressable style={ commonStyles.skipButton } onPress={validateTuto}>
        <Text style={commonStyles.skipButtonText}>Skip</Text>
      </Pressable>
      <Text style={ commonStyles.welcomeTitle }>Stud'Food</Text>
      <Text style={ commonStyles.stepTitle }>Rapide</Text>
      <Image source={require('../../assets/images/rapide.png')} style={ styles.stepImage }/>
      <Text style={ commonStyles.stepText }>Nous savons que vous êtes pressés donc le temps de préparation de nos plats est en moyenne de {''}
        <Text style={ commonStyles.underlignText }>15 minutes</Text> !
      </Text>
      <Pressable style={commonStyles.stepButton} onPress={() => {router.push('/thirdStep')}}>
        <Text style={commonStyles.buttonText}>Suivant</Text>
      </Pressable>
      <Image source={require('../../assets/images/step2.png')} style={ commonStyles.stepStateImage }/>
    </View>
  );
}

const styles = StyleSheet.create({
  stepImage: {
    width: 160, 
    height: 120, 
    marginTop: 50,
  },
});