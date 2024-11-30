import { commonStyles } from '@/constants/Style';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, StyleSheet, Pressable} from 'react-native';

export default function ThirdStep() {
  const completeTutorial = async () => {
    try {
      await AsyncStorage.setItem('tutorialCompleted', 'true');
      router.push('../(b-user)/');
    } catch (e) {
      console.error('Echec de la sauvegarde des données');
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
      <Text style={ commonStyles.stepTitle }>Prix bas</Text>
      <Image source={require('../../assets/images/argent.png')} style={ styles.stepImage }/>
      <Text style={ commonStyles.stepText }>Pourquoi dépenser une fortune quand on peut le faire sois même pour{' '}
        <Text style={ commonStyles.underlignText }>moins chère</Text> !
      </Text>
      <Pressable style={commonStyles.stepButton} onPress={validateTuto} >
        <Text style={commonStyles.buttonText}>Suivant</Text>
      </Pressable>
      <Image source={require('../../assets/images/step3.png')} style={ commonStyles.stepStateImage }/>
    </View>
  );
}

const styles = StyleSheet.create({
  stepImage: {
    width: 170, 
    height: 170, 
    marginTop: 50,
  },
});