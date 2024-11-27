import * as React from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Border } from "../../constants/GlobalStyles";
import { commonStyles } from "@/constants/Style";

const LoginComponent = () => {
  return (
    <View style={styles.loginContainer}>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry />
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>
        <Text style={styles.noAccountText}>Vous n’avez pas de compte ?</Text>
        <Pressable onPress={() => {}}>
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
});

export default LoginComponent;
