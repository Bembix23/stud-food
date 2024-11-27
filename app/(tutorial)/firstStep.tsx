import { commonStyles } from '@/constants/Style';
import { router } from 'expo-router';
import { Text, View, Image, StyleSheet, Pressable} from 'react-native';

export default function FirstStep() {
  return (
    <View style={ commonStyles.welcomeContainer }>
      <Pressable style={ commonStyles.skipButton } onPress={() => {router.push('/')}}>
        <Text style={commonStyles.skipButtonText}>Skip</Text>
      </Pressable>
      <Text style={ commonStyles.welcomeTitle }>Stud'Food</Text>
      <Text style={ commonStyles.stepTitle }>Simple</Text>
      <Image source={require('../../assets/images/casserole.png')} style={ styles.stepImage }/>
      <Text style={ commonStyles.stepText }>Des recettes{' '}
        <Text style={ commonStyles.underlignText }>simples</Text>, pas besoin d'être un chef pour réaliser nos plats !
      </Text>
      <Pressable style={commonStyles.stepButton} onPress={() => {router.push('/secondStep')}}>
        <Text style={commonStyles.buttonText}>Suivant</Text>
      </Pressable>
      <Image source={require('../../assets/images/step1.png')} style={ commonStyles.stepStateImage }/>
    </View>
  );
}

const styles = StyleSheet.create({
  stepImage: {
    width: 160, 
    height: 170, 
    marginTop: 50,
  },
});