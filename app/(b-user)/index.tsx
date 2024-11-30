import { Text, View } from 'react-native';
import { commonStyles } from '@/constants/Style';
import LoginComponent from '@/components/user/LoginComponent';

export default function Login() {
  return (
    <View style={ commonStyles.welcomeContainer }>
      <Text style={ commonStyles.welcomeTitle }>Stud'Food</Text>
      <Text style={ commonStyles.stepTitle }>Connectez-vous !</Text>
      <LoginComponent />
    </View>
  );
}