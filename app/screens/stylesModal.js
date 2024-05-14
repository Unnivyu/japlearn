import { StyleSheet } from 'react-native';

export const styles =StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        backgroundColor: 'transparent', 
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300, 
        position: 'relative' 
    },
    modalContent: {
        alignItems: 'center',
    },
    input: {
        height: 65,
        width: 250,
        margin: 12,
        padding: 10,
        backgroundColor: '#ececec',
        borderRadius: 10
    },
    text: {
        marginBottom: 20,
        fontSize: 16,
        fontFamily: 'jua',
        textAlign: 'center',
    },
    closeButtonContainer: {
        alignItems: 'flex-end'
    },
    closeButton: {
        height: 40,
        width: 40,
        backgroundColor: '#ececec',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },    
    closeButtonText: {
        fontSize: 20,
        color: 'grey',
        fontFamily: 'jua',
        textAlign: 'center',
        textAlign: 'center'
    },
    stack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        flexWrap: 'wrap'
    },
    stackText: {
        marginLeft: 10,
        fontSize: 16,
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        backgroundColor: 'lightgray',
        marginRight: 10,
        marginBottom: 5,
        paddingHorizontal: 10,
        paddingVertical: 3,
    },
    button: {
        backgroundColor:'#8ED94D',
        padding: 5,
        height: 60,
        width: 100,
        borderRadius: 5,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center'
    },
    
});