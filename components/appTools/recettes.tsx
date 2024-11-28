import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { recettesData } from '@/constants/data'

export default function Recettes() {
  return (
    <View style={styles.recettesContainer}>
      {recettesData.map((item, i) => {
        return <RecetteCarte key={i} item={item} index={i}/>
      })}
    </View>
  )
}

interface RecetteItem {
  image: string;
  name: string;
}

const RecetteCarte = ({item, index}: {item: RecetteItem, index: number})=>{
    return (
        <View style={styles.recetteCard}>
            <Image source={{uri: item.image}} style={{width: 100, height: 100}}/>
            <Text>{item.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
    width: "30%",
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
})