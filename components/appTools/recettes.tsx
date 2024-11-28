import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

interface RecettesProps {
  filtre: { strCategory: string; strCategoryThumb: string }[];
  recette: any[];
}

export default function Recettes({filtre, recette}: RecettesProps) {
  return (
    <>
        {filtre.length==0 || recette.length==0 ? null : (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.recettesContainer}>
                    {recette.map((item, i) => {
                        return <RecetteCarte key={i} item={item} index={i}/>
                    })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )}
    </>
  )
}

interface RecetteItem {
  strMeal: string;
  strMealThumb: string;
}

const RecetteCarte = ({item, index}: {item: RecetteItem, index: number})=>{
    const handlePress = () => {
        router.push({
          pathname: '/recettesDetails',
          params: { item: JSON.stringify(item) },
        });
      };
    return (
        <View style={styles.recetteCard}>
            <Pressable style={styles.pressable} onPress={() => {router.push({ pathname: '/recettesDetails'})}}>
                <Image source={{uri: item.strMealThumb}} style={styles.recetteImage}/>
                <Text style={styles.recetteTitre}>{item.strMeal}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        padding: 16,
    },
    pressable:{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    recettesContainer:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 16,
        alignItems: 'center',
    },
    recetteCard:{
        width: "32%",
        height: 170,
        marginBottom: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignItems: 'center',
    },
    recetteImage:{
        width: 100,
        height: 100,
        borderRadius: 9999,
    },
    recetteTitre:{
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
})