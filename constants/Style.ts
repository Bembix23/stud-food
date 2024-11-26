import { StyleSheet } from 'react-native';

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
        fontFamily: "Pattaya", 
        color: "#FFA800", 
        textAlign: 'center',
        width: 250,
      },
    underlignText: {
        textDecorationLine: 'underline',
    },
});