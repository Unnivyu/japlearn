import { StyleSheet } from 'react-native';

export const styles =StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'transparent', // Optional: for dimming background
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
        elevation: 5,
        width: 300, // Specify width to avoid stretching on larger devices
        position: 'relative' // For absolute positioning of close button
    },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 10
    },
    text: {
        marginBottom: 20,
        fontSize: 16,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 10,
    },
    closeButtonText: {
        fontSize: 16,
        color: 'red',
    },
    stack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Add this line
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
    
});