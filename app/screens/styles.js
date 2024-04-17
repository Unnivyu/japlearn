import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        marginTop: 50
    },
    input: {
        backgroundColor: '#ececec',
        color: '#777676',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        height: 60,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 100,
    },
    image: {
        width: 200,
        height: 200,
    },
    buttonContainer: {
        marginTop: 20,
        
    },
    button: {
        backgroundColor:'#8ED94D',
        padding: 5,
        height: 80,
        marginBottom: 20,
        borderRadius: 20,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 30,
    },
    extraText: {
        color: '#B6B5B5',
        fontSize: 9.5,
    },
    linkText: {
        color: '#B6B5B5',
        textDecorationLine: 'underline',
        fontSize: 9.5,
    },

    
});

