import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

interface FiltreProps {
  filtre: { strCategory: string; strCategoryThumb: string }[];
  filtreActif: string;
  changementCategorie: (category: string) => void;
}

export default function Filtres({ filtre, filtreActif, changementCategorie }: FiltreProps) {
  return (
    <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingHorizontal: 15}}>
            {filtre.map ((fil, index) =>{
                let isActive = fil.strCategory==filtreActif;
                let activeButtonClass = isActive? styles.activeButtonClass : {};
                return (
                    <TouchableOpacity key={index} onPress={() => changementCategorie(fil.strCategory)} style={ styles.filterContainer }>
                        <View style={[styles.filterImage, activeButtonClass]}>
                            <Image source={{uri: fil.strCategoryThumb}} style={styles.filterImageSizing}/>
                        </View>
                        <Text style={{marginTop:10}}>
                            {fil.strCategory}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    filterContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
    },
    filterImage:{
        borderRadius: 9999,
        padding: 10,
        width: 60,
        height: 60,
        backgroundColor: '#CECECE',
        justifyContent: 'center',
        alignItems: 'center',
    },  
    filterImageSizing:{
        width: 50,
        height: 50,
        borderRadius: 9999,
    },
    activeButtonClass:{
        backgroundColor: '#FFA800',
    }
})