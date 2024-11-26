import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const LoginComponent = () => {
  return (
    <View style={[styles.rectangleParent, styles.inscrivezVousPosition]}>
      <View style={styles.componentChild} />
      <View style={[styles.componentItem, styles.componentLayout]} />
      <View style={[styles.componentInner, styles.componentLayout]} />
      <Text style={[styles.email, styles.emailTypo]}>Email</Text>
      <Text style={[styles.email, styles.emailTypo]}>Email</Text>
      <Text style={[styles.motDePasse, styles.emailTypo]}>Mot de passe</Text>
      <Pressable
        style={[styles.vectorParent, styles.componentLayout]}
        onPress={() => {}}
      >
        <Image
          style={[styles.groupChild, styles.componentLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-12.png")}
        />
        <Text style={[styles.seConnecter, styles.emailTypo]}>Se connecter</Text>
      </Pressable>
      <Text
        style={[styles.vousNavezPas, styles.vousLayout]}
      >{`Vous n’avez pas de compte ? `}</Text>
      <Pressable
        style={[styles.inscrivezVous, styles.inscrivezVousPosition]}
        onPress={() => {}}
      >
        <Text style={[styles.inscrivezVous1, styles.vousLayout]}>
          Inscrivez-vous.
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inscrivezVousPosition: {
    left: "50%",
    position: "absolute",
  },
  componentLayout: {
    height: 50,
    width: 250,
    position: "absolute",
  },
  emailTypo: {
    height: 24,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  vousLayout: {
    lineHeight: 23,
    fontSize: FontSize.size_base,
  },
  componentChild: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.colorBurlywood_100,
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  componentItem: {
    top: 44,
    borderWidth: 1,
    borderColor: Color.colorForestgreen,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    width: 250,
    left: 38,
    borderRadius: Border.br_3xs,
  },
  componentInner: {
    top: 117,
    borderWidth: 1,
    borderColor: Color.colorForestgreen,
    borderStyle: "solid",
    backgroundColor: Color.colorWhite,
    width: 250,
    left: 38,
    borderRadius: Border.br_3xs,
  },
  email: {
    top: 57,
    left: 49,
    width: 227,
    height: 24,
    textAlign: "center",
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    color: Color.colorSilver,
  },
  motDePasse: {
    marginLeft: -46.5,
    top: 134,
    width: 107,
    textAlign: "left",
    color: Color.colorSilver,
    height: 24,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
    left: "50%",
  },
  groupChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_3xs,
  },
  seConnecter: {
    top: 16,
    left: 12,
    color: Color.colorWhite,
    width: 227,
    height: 24,
    textAlign: "center",
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_base,
  },
  vectorParent: {
    top: 197,
    left: 38,
    width: 250,
  },
  vousNavezPas: {
    top: 368,
    left: 27,
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorBlack,
    width: 271,
    height: 58,
    textAlign: "center",
    lineHeight: 23,
    position: "absolute",
  },
  inscrivezVous1: {
    marginLeft: -49.5,
    fontWeight: "700",
    fontFamily: FontFamily.robotoBold,
    color: Color.colorForestgreen,
    width: 117,
    height: 23,
    textAlign: "left",
  },
  inscrivezVous: {
    bottom: 67,
  },
  rectangleParent: {
    marginLeft: -162.5,
    top: 209,
    width: 325,
    height: 487,
  },
});

export default LoginComponent;
