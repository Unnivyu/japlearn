import { StyleSheet } from "react-native";

export const stylesEdit = StyleSheet.create ({
    header: {
        height: 105,
        backgroundColor: '#8423D9',
        borderBottomWidth: 10,
        borderBottomColor: '#6C3A99',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 40,
    },
    backButtonContainer: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: '#462A5E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTextContainer: {
        padding: 20,
    },
    titleText: {
        fontFamily: 'jua',
        fontSize: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, 
        paddingHorizontal: 10, 
    },
    button: {
        backgroundColor: '#8ED94D',
        padding: 5,
        height: 60,
        width: 100,
        borderRadius: 5,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
    },
    editContainer: {
        padding: 20,
    },
    quackmaneditContent: {
        height: 200,
        width: '100%',
        backgroundColor: '#8ED94D',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 20,
        borderBottomColor: '#83C449',
        borderBottomWidth: 10

    },
    picker: {
        fontSize: 10,
        height: 70,
        width: 170,
        borderColor: 'transparent',
        padding: 5,
    },
    input: {
        backgroundColor: '#ececec',
        color: '#777676',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        height: 50,
        borderColor: 'red',
    },
    charContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
    },
    
    characterButton: {
        width: '18%',
        padding: 2,
        height: '18%',
        aspectRatio: 1,
        backgroundColor: '#C9C8C8',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5, 
        marginBottom: 15, 
    },
    characterText: {
        fontFamily: 'jua',
        textAlign: 'center',
        fontSize: 20,
        color: '#333333',
    },
    scrollViewContent: {
        flexGrow: 1, 
    },
    selectedCharacter: {
        backgroundColor: '#C1FF8B', 
    }
});
