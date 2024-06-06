import { StyleSheet, Dimensions } from 'react-native';

const getStyles = (orientation) => {
    const { width, height } = Dimensions.get('window');
    const aspectRatio = 3 / 4;
    const imageHeight = width > 600 ? 350 : 300; 
    const imageWidth = imageHeight * aspectRatio;

    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: orientation === 'portrait' ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'cover',
        },
        backgroundImage: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            resizeMode: 'cover',
            zIndex: 1,
        },
        hiddenImage: {
            width: 0,
            height: 0,
            position: 'absolute',
        },
        dialogueContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
            zIndex: 3, // Ensure dialogue box is above the character image
            alignItems: 'center',
        },
        characterImage: {
            width: imageWidth,  // This is calculated based on the height
            height: imageHeight,
            resizeMode: 'contain',
            position: 'absolute',
            bottom: 155,  // Adjust this value to position the image above the dialogue
            zIndex: 2,
        },
        characterLeft: {
            left: '3%', // Adjust positioning to the left
        },
        characterRight: {
            right: '3%', // Adjust positioning to the right
        },
        dialogueBox: {
            width: '90%',
            height: 150,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: width > 600 ? 30 : 20,
            borderRadius: 20,
            marginBottom: 20,
            zIndex: 3, // Ensure it's above the character image
        },
        characterName: {
            fontWeight: 'bold',
            fontSize: width > 600 ? 24 : 20,
            color: 'white',
            marginBottom: 8,
        },
        dialogueText: {
            fontSize: width > 600 ? 20 : 16,
            color: 'white',
        },
        modalView: {
            position: 'absolute',
            bottom: '30%',
            left: 0,
            right: 0,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 4,
        },
        modalContent: {
            width: '80%',
            padding: 35,
            alignItems: 'center',
            elevation: 5,
        },
        optionButton: {
            backgroundColor: 'rgba(106, 90, 205, 0.8)',
            borderWidth: 5,
            borderColor: 'rgba(52, 52, 52, 0.8)',
            padding: 10,
            margin: 10,
            borderRadius: 5,
            width: '100%',
        },
        optionText: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
        }
    });
};

export default getStyles;
