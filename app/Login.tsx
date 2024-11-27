import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { auth } from '../FirebaseConfig'; 

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const router = useRouter(); 

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('./(tabs)/index'); 
    } catch (err: unknown) {
      if (err instanceof FirebaseError) { 
        setError(err.message);
        Alert.alert('Erreur de connexion', err.message);
      } else {
        setError('Une erreur inattendue est survenue.');
        Alert.alert('Erreur de connexion', 'Une erreur inattendue est survenue.');
        console.error('Erreur inconnue:', err);
      }
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide.');
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      console.log('Utilisateur inscrit avec succès :', user.email);
      Alert.alert('Succès', 'Inscription réussie !');
      router.push('./(tabs)/index'); 
    } catch (err: unknown) {
      if (err instanceof FirebaseError) { 
        setError(err.message);
        Alert.alert('Erreur d\'inscription', err.message);
      } else {
        setError('Une erreur inattendue est survenue.');
        Alert.alert('Erreur d\'inscription', 'Une erreur inattendue est survenue.');
        console.error('Erreur inconnue:', err);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Login" onPress={handleLogin} />
        <View style={styles.signupContainer}>
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 50, 
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5, 
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  signupContainer: {
    marginTop: 12,
  },
});
