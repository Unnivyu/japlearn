import { StyleSheet, Dimensions } from 'react-native';

const getStyles = (orientation) => {
    const { width, height } = Dimensions.get('window');
    return StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: orientation === 'portrait' ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            resizeMode: 'cover'
        },
        backgroundImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            resizeMode: 'contain',
            position: 'absolute',
            zIndex: 1,
        },
        dialogueContainer: {
            position: 'absolute',
            bottom: 10,
            left: 10,
            right: 10,
            padding: 20, // Increased padding for more space inside
            zIndex: 2,
        },
        characterImage: {
            width: '50%',
            height: '30%',
            resizeMode: 'contain',
            zIndex: 2,
        },
        dialogueBox: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: width > 600 ? 30 : 20, // Larger padding for larger screens or more padding in general
            borderRadius: 20, // Increased radius for a smoother look
            marginTop: 10, // Ensure it doesn't overlap with anything above it
            height: 150,
            zIndex: 2,
        },
        characterName: {
            fontWeight: 'bold',
            fontSize: width > 600 ? 24 : 20, // Increased font size
            color: 'white',
            marginBottom: 8, // Space between the character name and dialogue text
        },
        dialogueText: {
            fontSize: width > 600 ? 20 : 16, // Increased font size
            color: 'white',
        },
        modalView: {
            margin: 20,
            borderRadius: 20,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            alignSelf: 'center',
            marginTop: Dimensions.get('window').height / 4,  // Center the modal vertically
            zIndex: 3,
        },
        optionButton: {
            backgroundColor: 'rgba(106, 90, 205, 0.8)',
            borderWidth: 5,
            borderColor: 'rgba(52, 52, 52, 0.8)',
            padding: 10,
            margin: 10,
            borderRadius: 5,
            width: 500,
            flexWrap: 'wrap',
        },
        optionText: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center'
        }
        
    });
};

export default getStyles;
