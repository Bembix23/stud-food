import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, Pressable } from 'react-native';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/FirebaseConfig';
import { router } from 'expo-router';
import { commonStyles } from '@/constants/Style';

const auth = getAuth(app);

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Déconnexion réussie');
        router.push('/(b-user)');
      })
      .catch((error) => {
        Alert.alert('Erreur', error.message);
      });
  };

  if (!user) {
    return (
      <View style={styles.centered}>
        <Text>Aucun utilisateur connecté.</Text>
        <Pressable onPress={() => {router.push('/(b-user)')}}>
            <Text style={{textDecorationLine:'underline'}}>Revenir à la page de connexion</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.profileContainer}>
      <Pressable style={ styles.returnButton } onPress={() => {router.push('/homeScreen')}}>
        <Text style={commonStyles.skipButtonText}>Retour</Text>
      </Pressable>
      <Image
        source={require('@/assets/images/photo-profil.png')}
        style={styles.profileImage}
      />
      <Text style={styles.profileEmail}><Text style={{fontWeight:600,}}>Email: </Text>{user.email}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Se Déconnecter" color="red" onPress={handleSignOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  returnButton:{
    marginTop: 30,
    left: "-35%",
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#FFCB7E',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 50,
    backgroundColor: '#ccc',
  },
  profileEmail: {
    fontSize: 18,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'red',
    backgroundColor: 'white',
  },
});