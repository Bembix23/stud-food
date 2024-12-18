import { Image, StyleSheet, View, Pressable, Text, TextInput } from 'react-native';
import { router } from 'expo-router';
import { commonStyles } from '@/constants/Style';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useEffect, useState } from 'react';
import Filtres from '@/components/appTools/filtres';
import axios from 'axios';
import Recettes from '@/components/appTools/recettes';

export default function HomeScreen() {
  const[filtreActif, setFiltreActif] = useState('Beef');
  const [filtre, setFiltre] = useState([]);
  const [recette, setRecette] = useState([]);

  useEffect ( ()=>{
    getFiltre();
    getRecette();
  },[])

  const changementCategorie = (category: string) => {
    getRecette(category);
    setFiltreActif(category);
    setRecette([]);
  }

  const getFiltre = async ()=>{
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php'); 
      if (response && response.data){
        setFiltre(response.data.categories ?? []);
      }
    }catch (err: any){
      console.log('error: ',err.message);
    }
  }

  const getRecette = async (category="Beef") =>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data){
        setRecette(response.data.meals ?? []);
      }
    }catch (err: any){
      console.log('error: ',err.message);
    }
  }
  return (
    <View style={commonStyles.homeContainer}>
      <Pressable style={commonStyles.profilePictureContainer} onPress={() => {router.push('../(b-user)/profileScreen')}}>
        <Image
          source={require('../../assets/images/photo-profil.png')}
          style={commonStyles.profilePicture}
        />
      </Pressable>
      <Text style={commonStyles.welcomeTitle}>Stud'Food</Text>
      <View style={ styles.searchBar }>
        <TextInput placeholder='Cherche ton plat' placeholderTextColor={ 'gray' } style={ styles.SearchBarText }/>
        <View style={ styles.SearchBarButton }>
          <IconSymbol size={20} name="magnifyingglass" color="#000000" />
        </View>
      </View>
      <View style={{height:120}}>
        <Filtres filtre={filtre} filtreActif={filtreActif} changementCategorie={changementCategorie}/>
      </View>
      <View>
        <Recettes recette={recette} filtre={filtre}/>
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 9999,
    backgroundColor: '#CECECE',
    padding: 10,
    width: 275,
  },
  SearchBarText:{
    fontSize: 14,
    marginTop: 4,
    width: '90%',
  },
  SearchBarButton:{
    backgroundColor: '#FFFFFF',
    borderRadius: 9999,
    padding: 3,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 100, 
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

