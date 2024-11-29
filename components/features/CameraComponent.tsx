import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { CameraType, useCameraPermissions, CameraView } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage, db } from "../../FirebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

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
  const cameraRef = useRef<CameraView>(null); 

  useImperativeHandle(ref, () => ({
    takePhoto,
  }));

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePhoto() {
    if (cameraRef.current) {
      try {
        if (!auth.currentUser) {
          Alert.alert("Erreur", "Utilisateur non authentifié.");
          return;
        }

        const photo = await cameraRef.current.takePictureAsync();
        if (!photo) {
          Alert.alert("Erreur", "Impossible de prendre la photo.");
          return;
        }
        const response = await fetch(photo.uri);
        const blob = await response.blob();

        const userId = auth.currentUser.uid;

        const newDocRef = doc(collection(db, "photos"));
        const id = newDocRef.id;

        const storagePath = `photos/${userId}/${id}.jpg`;
        const photoRefStorage = storageRef(storage, storagePath);

        await uploadBytes(photoRefStorage, blob);

        const downloadURL = await getDownloadURL(photoRefStorage);

        await setDoc(newDocRef, {
          id,                   
          userId,               
          imageUrl: downloadURL,
          storagePath,          
          timestamp: new Date(),
        });

        Alert.alert("Succès", "Photo enregistrée avec succès.");
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
