import React, { useEffect, useState, useRef } from 'react';
import { Image, StyleSheet, View, Pressable, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { auth, db, storage } from '../../FirebaseConfig'; 
import { collection, query, where, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { ref, deleteObject } from "firebase/storage";
import CameraComponent, { CameraHandle } from '../../components/features/CameraComponent';
import { commonStyles } from '../../constants/Style';
import { router } from 'expo-router';

interface Photo {
  id: string;
  imageUrl: string;
  storagePath: string;
}

export default function MyPhotos() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef<CameraHandle>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const photosQuery = query(
          collection(db, "photos"),
          where("userId", "==", userId),
          orderBy("timestamp", "desc")
        );
        try {
          const querySnapshot = await getDocs(photosQuery);
          const fetchedPhotos: Photo[] = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log('Données du document:', data);
            if (data.imageUrl && data.storagePath) {
              fetchedPhotos.push({ id: doc.id, imageUrl: data.imageUrl, storagePath: data.storagePath });
            } else {
              console.warn(`Le document avec l'ID ${doc.id} manque des champs requis.`);
            }
          });
          setPhotos(fetchedPhotos);
        } catch (error) {
          console.error('Erreur lors de la récupération des photos:', error);
        }
      }
    };

    fetchPhotos();
  }, [isCameraActive]);

  const openCamera = () => {
    setIsCameraActive(true);
  };

  const takePhoto = () => {
    cameraRef.current?.takePhoto();
  };

  const closeCamera = () => {
    setIsCameraActive(false);
  };

  const deletePhoto = async () => {
    if (selectedImage && selectedImage.storagePath) {
      try {
        const photoStorageRef = ref(storage, selectedImage.storagePath);

        await deleteObject(photoStorageRef);

        await deleteDoc(doc(db, "photos", selectedImage.id));

        setPhotos(photos.filter((photo) => photo.id !== selectedImage.id));

        setSelectedImage(null);

        Alert.alert("Succès", "Photo supprimée avec succès.");
      } catch (error) {
        console.error("Erreur lors de la suppression de la photo:", error);
        Alert.alert("Erreur", "Impossible de supprimer la photo.");
      }
    } else {
      console.error("selectedImage ou selectedImage.storagePath est indéfini.");
      Alert.alert("Erreur", "Image invalide ou non sélectionnée.");
    }
  };

  return (
    <View style={commonStyles.homeContainer}>
      <Pressable style={commonStyles.profilePictureContainer} onPress={() => {router.push('../(b-user)/profileScreen')}}>
        <Image
          source={require('../../assets/images/photo-profil.png')}
          style={commonStyles.profilePicture}
        />
      </Pressable>
      <Text style={commonStyles.welcomeTitle}>Stud'Food</Text>
      <Text style={[commonStyles.stepTitle, styles.stepTitle]}>Mes Photos</Text>

      {isCameraActive && (
        <CameraComponent
          ref={cameraRef}
          isActive={isCameraActive}
          onClose={closeCamera}
        />
      )}

      {!isCameraActive && (
        <View style={styles.photosContainer}>
          {photos.map((photo) => (
            <TouchableOpacity key={photo.id} onPress={() => setSelectedImage(photo)}>
              <Image source={{ uri: photo.imageUrl }} style={styles.photo} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {selectedImage && (
        <Modal
          visible={selectedImage !== null}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSelectedImage(null)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: selectedImage?.imageUrl || '' }} style={styles.fullImage} resizeMode="contain" />
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
                  <Text style={styles.deleteButtonText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <Pressable
        style={styles.bottomButton}
        onPress={isCameraActive ? takePhoto : openCamera}
      >
        <Text style={styles.buttonText}>
          {isCameraActive ? 'Prendre une photo' : 'Activer la caméra'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
  bottomButton: {
    position: 'absolute',
    bottom: 100, 
    backgroundColor: '#358510',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 275,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  stepTitle: {
    marginTop: 10,
  },


  
  // Styles pour le Modal
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    width: '100%',
    height: '80%',
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#358510',
    borderRadius: 5,
    marginRight: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
