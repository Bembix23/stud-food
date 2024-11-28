import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Camera, CameraType, useCameraPermissions } from "expo-camera"; // Correct import
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const App = forwardRef<CameraHandle, AppProps>(({ isActive, onClose }, ref) => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nous avons besoin de votre permission pour utiliser la caméra</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        // ...existing code to capture photo...
        const userId = auth.currentUser?.uid || "anonymous";
        const fileName = `${Date.now()}_photo.jpg`;
        const photoRef = storageRef(storage, `photos/${userId}/${fileName}`);
        // ...existing code to upload the photo...
      } catch (error) {
        console.error("Erreur lors de la prise ou de l'upload de la photo:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '90%',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
