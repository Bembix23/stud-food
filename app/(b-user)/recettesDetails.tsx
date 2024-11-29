import { View, Text, ScrollView, StatusBar, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { commonStyles, FontFamily } from '@/constants/Style';
import axios from 'axios';

export default function recettesDetails() {
    const {idRecette} = useLocalSearchParams<{idRecette?: string}>();
    interface Recette {
        strArea: string;
        strInstructions: string;
        strMeal: string;
        strMealThumb: string;
        [key: string]: any;
    }

    const [recette, setRecette] = useState<Recette | null>();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if (idRecette) {
            getRecetteData(idRecette);
        }
    },[idRecette])
    
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

    const indexIngredient = (recette: Recette | null) => {
        if (!recette) return [];
        let index = [];
        for(let i = 1; i<=20; i++){
            if(recette ['strIngredient'+i]){
                index.push (i);
            }
        }
        return index;
    }


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{width:"100%"}}>
        <View style={commonStyles.homeContainer}>
            <Pressable style={ styles.returnButton } onPress={() => {router.push('/homeScreen')}}>
                <Text style={commonStyles.skipButtonText}>Retour</Text>
            </Pressable>
            <Image source={{ uri: recette?.strMealThumb }} style={styles.recetteImage}/>
            <Text style={styles.recetteTitle}>
                {recette?.strMeal}
            </Text>
            <Text style={styles.recetteOrigin}>
                {recette?.strArea}
            </Text>
            {
                loading? (
                    <Text style={{color:"white"}}>Chargement...</Text>
                ):(
                    <View style={styles.recetteContainer}>
                        <Text style={styles.ingredientsWord}>
                            Ingrédients
                        </Text>
                        <View>
                            {
                                recette && indexIngredient(recette).map(i=>{
                                    return (
                                        <View style={styles.elementListe}>
                                            <View style={styles.pointListe}/>
                                            <Text key={i}>
                                                {recette?.['strIngredient'+i]} : {recette?.['strMeasure'+i]}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <Text style={styles.recetteWord}>
                            Recette
                        </Text>
                        <Text style={styles.recetteText}>
                            {recette?.strInstructions}
                        </Text>
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
    recetteContainer:{
        display: "flex",
        width: "100%",
        marginLeft:"10%"
    },
    recetteOrigin:{
        fontSize: 16,
        fontWeight: 700,
    },
    recetteTitle:{
        fontSize: 32, 
        marginTop: 20, 
        fontWeight: 400, 
        fontFamily: FontFamily.pattayaRegular, 
        color: "#FFA800", 
        textAlign: 'center',
    },
    recetteWord:{
        fontSize: 24,
        marginTop: 20,
        fontWeight: 400,
        color: "red",
        fontFamily: FontFamily.fugazOneRegular,
    },
    recetteText:{
        width: "80%",
        textAlign: 'justify',
        marginTop: 20,
        marginBottom: 150,

    },
    ingredientsWord:{
        fontSize: 24,
        marginTop: 20,
        fontWeight: 400,
        color: "red",
        fontFamily: FontFamily.fugazOneRegular,
    },
    pointListe:{
        width: 6,
        height: 6,
        backgroundColor: "#FFA800",
        borderRadius: 9999,
        marginRight: 10,
    },
    elementListe:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    }
})