import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { CameraType, useCameraPermissions, Camera, CameraView } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import {ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../FirebaseConfig";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../FirebaseConfig'; 

export interface CameraHandle {
  takePhoto: () => void;
}

interface AppProps {
  isActive: boolean;
  onClose: () => void;
}

const CameraComponent = forwardRef<CameraHandle, AppProps>(({ isActive, onClose }, ref) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<Camera>(null); 

  useImperativeHandle(ref, () => ({
    takePhoto,
  }));

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    if (cameraRef.current) {
      try {
        console.log("Prise de photo...");
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo prise :", photo.uri);

        console.log("Fetch de l'URI de la photo...");
        const response = await fetch(photo.uri);
        const blob = await response.blob();
        console.log("Blob créé :", blob);

        if (!auth.currentUser) {
          console.log("Utilisateur non authentifié.");
          Alert.alert("Erreur", "Utilisateur non authentifié.");
          return;
        }

        const userId = auth.currentUser.uid;
        const fileName = `${Date.now()}_photo.jpg`;
        const photoRef = storageRef(storage, `photos/${userId}/${fileName}`);
        console.log("Référence de stockage :", photoRef.fullPath);

        console.log("Upload du blob...");
        await uploadBytes(photoRef, blob);
        console.log("Blob uploadé.");

        console.log("Obtention de l'URL de téléchargement...");
        const downloadURL = await getDownloadURL(photoRef);
        console.log("URL de téléchargement obtenue :", downloadURL);

        console.log("Enregistrement des métadonnées dans Firestore...");
        await addDoc(collection(db, "photos"), {
          userId,
          imageUrl: downloadURL,
          timestamp: new Date(),
        });
        console.log("Méta-données sauvegardées :", downloadURL);

        onClose();
      } catch (error) {
        console.error("Erreur lors de la prise ou de la sauvegarde de la photo:", error);
        Alert.alert("Erreur", "Impossible de sauvegarder la photo.");
      }
    }
  }

  if (!isActive) {
    return null;
  }

  if (!permission) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      {permission.granted ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.message}>
            Nous avons besoin de votre permission pour utiliser la caméra
          </Text>
          <Button onPress={requestPermission} title="Accorder la permission" />
        </View>
      )}
    </View>
  );
});

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    height: "75%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
