import { StyleSheet } from 'react-native';

export const FontFamily = {
    poppinsSemiBold: "Poppins-SemiBold",
    robotoMedium: "Roboto-Medium",
    pattayaRegular: "Pattaya-Regular",
    robotoBold: "Roboto-Bold",
    fugazOneRegular: "FugazOne-Regular",
    robotoRegular: "Roboto-Regular",
  };

export const commonStyles = StyleSheet.create({
    welcomeContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: "#FFCB7E",
    },
    welcomeTitle: {
        fontSize: 48, 
        marginTop: 20, 
        fontWeight: 400, 
        fontFamily: FontFamily.pattayaRegular, 
        color: "#FFA800", 
        textAlign: 'center',
        width: 250,
      },
    underlignText: {
        textDecorationLine: 'underline',
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: 400,
        color: "red",
        fontFamily: FontFamily.fugazOneRegular,
        marginTop: 40,
    },
    stepText: {
        fontSize: 16,
        textAlign: 'center',
        width: 300,
        margin: 30,
    },
      skipButton: {
        left: 150,
    },
      skipButtonText: {
        color: "#358510",
        fontWeight: "500",
        fontSize: 16,
    },
      stepButton: {
        marginTop: 10,
        width: 250,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#358510",
        borderStyle: "solid",
        backgroundColor: "#358510",
    },
      buttonText: {
        color: "#FFFFFF",
        fontWeight: "500",
        fontSize: 16,
        margin: "auto",
    },
      stepStateImage: {
        width: 50,
        height: 6,
        marginTop: 50,
    },
})

