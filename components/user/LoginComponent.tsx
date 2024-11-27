import * as React from "react";
import { StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'expo-router';
import { commonStyles } from "@/constants/Style";

const LoginComponent = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  
  const router = useRouter();

  const handleLogin = async () => {
    console.log('Login button pressed');
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
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredentials.user.email);
      router.push('../(c-tabs)/homeScreen'); 
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
    console.log('Sign up button pressed');
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
      router.push('../(c-tabs)/index'); 
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
    <View style={styles.loginContainer}>
      <View style={styles.form}>
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
          placeholder="Mot de passe" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>
        <Text style={styles.noAccountText}>Vous n’avez pas de compte ?</Text>
        <Pressable onPress={handleSignUp}>
          <Text style={styles.signupText}>Inscrivez-vous.</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 50,
    backgroundColor: "#FFBA53",
    padding: 40,
    borderRadius: 25,
  },
  form: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#358510',
    backgroundColor: '#fff',
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#358510',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noAccountText: {
    marginTop: 30,
    marginBottom: 8,
  },
  signupText: {
    color: '#358510',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default LoginComponent;
