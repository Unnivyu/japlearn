
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    timerContainer: {
        marginTop: 10,
        flex: 1,
        alignItems: 'flex-end',
        padding: 20,
        marginBottom: 20,
    },
    timer: {
        backgroundColor: '#FAF7FC',
        borderRadius: 10,
        borderBottomWidth: 10,
        borderBottomColor: '#ACACAC',
        height: 60,
        width: 150,
        padding: 10,
        justifyContent: 'center'
    },
    timerText: {
        fontFamily: 'jua',
        fontSize: 15,
        textAlign: 'center',
    },
    displayContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    charText: {
        fontFamily: 'jua',
        fontSize: 50,
    },
    moleContainer: {
        flex: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        position: 'relative',
    },
    hole: {
        width: 90,
        height: 50,
        marginBottom: 60, // Increased bottom margin to create more space between rows
        marginHorizontal: 5,
        borderRadius: 25,
        backgroundColor: '#B8B2BB',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },
    mole: {
        position: 'absolute',
        top: -74, // Adjust to position above the holes
        left: 0, // Adjust to center the mole
        right: 0, // Adjust to center the mole
        justifyContent: 'center',
        alignItems: 'center',
    },
    bubble: {
        position: 'absolute',
        bottom: 100, // Adjust based on the new mole position
        left: '50%',
        transform: [{ translateX: -50 }],
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 4,
        width: 50,
    },
    bubbleText: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
    },
    moleTouchable: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,  // Width of the mole
        height: 150, // Height of the mole
    },
    romajiContainer: {
        position: 'absolute',
        top: -10,  // Adjust to position above the mole
        left: 0, // Adjust to center the romaji text
        right: 0, // Adjust to center the romaji text
        backgroundColor: '#FFFFFF',  // Example background color
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10,
    },
    romajiText: {
        fontSize: 20,
        color: '#000000',  // Example text color
        textAlign: 'center',
    },
    clipContainer: {
        height: 50,  // Ensure this height covers the part of the mole you want to show initially
        overflow: 'hidden',
        width: '100%',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontFamily: 'jua',
        fontSize: 20,
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#8ED94D',
        padding: 10,
        borderRadius: 10,

    },
    modalButtonText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'jua',

    },
    gameOverContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    gameOverText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ff6347',
    },
    scoreText: {
        fontSize: 24,
        marginBottom: 40,
    },
    endButton: {
        backgroundColor: '#8ED94D',
        height: 60,
        width: 100,
        
    },
    endButtonText: {
        fontFamily: 'jua',
        fontSize: 20,
        color: '#fff'
    },

});
