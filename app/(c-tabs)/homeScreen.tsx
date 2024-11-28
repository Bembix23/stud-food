import { Image, StyleSheet, Platform, View, Pressable, Text, TextInput } from 'react-native';
import { router } from 'expo-router';
import { commonStyles } from '@/constants/Style';
import CameraComponent from '@/components/features/CameraComponent';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { SearchBar } from 'react-native-screens';

export default function HomeScreen() {
  return (
    <View style={commonStyles.homeContainer}>
      <Image
        source={require('../../assets/images/photo-profil.png')}
        style={commonStyles.profilePicture}
      />
      <Text style={commonStyles.welcomeTitle}>Stud'Food</Text>
      <View style={ styles.searchBar }>
        <TextInput placeholder='Cherche ton plat' placeholderTextColor={ 'gray' } style={ styles.SearchBarText }/>
        <CameraComponent />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle:{
    marginTop: 10,
  },
  searchBar:{
    marginTop: 10,
    display: 'flex',
    alignItems: 'flex-start',
    borderRadius: 9999,
    backgroundColor: '#CECECE',
    padding: 10,
    width: 275,
  },
  SearchBarText:{
    fontSize: 12,
    marginBottom: 1,
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
