import { Image, StyleSheet, Platform, View, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import { commonStyles } from '@/constants/Style';
import { IconSymbol } from '@/components/ui/IconSymbol';
import CameraComponent, { CameraHandle } from '../../components/features/CameraComponent';
import React, { useState, useEffect, useRef } from 'react';
import { auth,storage,  db } from '../../FirebaseConfig'; 
import { collection, query, where, getDocs } from "firebase/firestore"; 

export default function HomeScreen() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef<CameraHandle>(null);
  const [photos, setPhotos] = useState<string[]>([]);

  const openCamera = () => {
    setIsCameraActive(true);
  };

  const takePhoto = () => {
    cameraRef.current?.takePhoto();
  };

  const closeCamera = () => {
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      setIsCameraActive(false);
    };
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const photosQuery = query(
          collection(db, "photos"),
          where("userId", "==", userId)
        );
        try {
          const querySnapshot = await getDocs(photosQuery);
          const urls: string[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.imageUrl) {
              urls.push(data.imageUrl);
            }
          });
          setPhotos(urls);
        } catch (error) {
          console.error('Erreur lors de la récupération des photos:', error);
        }
      }
    };

    fetchPhotos();
  }, [isCameraActive]);



  return (
    <View style={commonStyles.homeContainer}>
      <Image source={require('../../assets/images/photo-profil.png')} style={ commonStyles.profilePicture }/>
      <Text style={ commonStyles.welcomeTitle }>Stud'Food</Text>
      <Text style={ [commonStyles.stepTitle, styles.stepTitle] }>Mes Photos</Text>
      {isCameraActive ? (
        <CameraComponent
          ref={cameraRef}
          isActive={isCameraActive}
          onClose={closeCamera}
        />
      ) : null}
      
      <View style={styles.photosContainer}>
        {photos.map((url, index) => (
          <Image key={index} source={{ uri: url }} style={styles.photo} />
        ))}
      </View>

      <Pressable
        style={styles.bottomButton}
        onPress={isCameraActive ? takePhoto : openCamera}
      >
        <Text style={styles.buttonText}>
          {isCameraActive ? 'Prendre une photo' : 'Activer la caméra'}
        </Text>
        <IconSymbol size={20} name="camera.fill" color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  stepTitle:{
    marginTop: 10,
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
  photosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    justifyContent: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
});
