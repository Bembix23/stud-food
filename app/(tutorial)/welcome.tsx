import { Stack } from 'expo-router';
import { Text, View, Image } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: "#FFCB7E" }}>
      <Text style={{ fontSize: "48px", marginTop: "20px", fontWeight: "400", fontFamily: "Pattaya", color: "#FFA800", textAlign: 'center' }}>Bienvenue<br />sur<br />Stud'Food</Text>
      <Image source={require('../../assets/images/welcome-image.png')} style={{ width: "261px", height: "210px", marginTop: "50px" }}/>
    </View>
  );
}