import { View, Text, ScrollView, StatusBar, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { commonStyles, FontFamily } from '@/constants/Style';
import axios from 'axios';

export default function recettesDetails() {
    const {recetteName, recettePhoto, idRecette} = useLocalSearchParams<{recetteName?: string, recettePhoto?: string, idRecette?: string}>();
    interface Recette {
        strArea: string;
        strInstructions: string;
        strMeal: string;
    }

    const [recette, setRecette] = useState<Recette | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if (idRecette) {
            getRecetteData(idRecette);
        }
    },[])
    
    const getRecetteData = async (id:string) =>{
        try{
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          if (response && response.data){
            setRecette(response.data.meals[0]);
            setLoading(false);
          }
        }catch (err: any){
          console.log('error: ',err.message);
        }
      }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{width:"100%"}}>
        <View style={commonStyles.homeContainer}>
            <Pressable style={ styles.returnButton } onPress={() => {router.push('/homeScreen')}}>
                <Text style={commonStyles.skipButtonText}>Retour</Text>
            </Pressable>
            <Image source={{ uri: recettePhoto }} style={styles.recetteImage}/>
            {
                loading ?(
                    <Text style={{color:"white"}}>Chargement...</Text>
                ):(
                    <View>
                        <Text style={styles.recetteTitle}>{recette?.strMeal}</Text>
                        <Text style={{color:"white"}}>{recette?.strInstructions}</Text>
                    </View>
                )
            }
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    returnButton:{
        marginTop: 30,
        left: "-35%",
    },
    recetteImage:{
        width: 300,
        height: 300,
        borderRadius: 53,
        marginTop: 30,
    },
    recetteTitle:{
        fontSize: 32, 
        marginTop: 20, 
        fontWeight: 400, 
        fontFamily: FontFamily.pattayaRegular, 
        color: "#FFA800", 
        textAlign: 'center',
    },
})