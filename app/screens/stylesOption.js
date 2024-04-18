import { StyleSheet } from 'react-native';

export const stylesOption = StyleSheet.create({

    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuButton: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    input: {
        backgroundColor:'#EFECEC',
        color: '#A4A4A4',
        borderRadius: 10,
        padding: 10,
        width: 340,
        marginBottom: 10,
        height: 70,
    },
    header: {
        backgroundColor: '#8423D9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingTop: 30,
        marginBottom: 100, 
        borderBottomWidth: 10, 
        borderBottomColor: '#6C3A99',
        
    },
    hText: {
        fontFamily: 'jua',
        color: 'white',
        fontSize: 15,
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    menuContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // Ensure the container is relative for absolute positioning of the upper image
        zIndex: 0, // Set z-index to default for buttons to be behind the upper image
    },
    menuText: {
        fontFamily: 'jua',
        fontSize: 30,
    },
    button: {
        backgroundColor:'#8ED94D',
        borderBottomColor: '#74A14C',
        borderBottomWidth: 6,
        padding: 5,
        height: 60,
        width: 100,
        marginBottom: 20,
        borderRadius: 30,
        justifyContent: 'center',
        position: 'relative', // Ensure the button is relative for z-index stacking
        zIndex: 1, // Set z-index higher than default for the buttons to be above other content
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 80, // Adjust as needed for text positioning
        color: 'white', // Adjust text color as needed
    },
    pictureCircle: {
        backgroundColor: 'white',
        width: 50, 
        height: 50, 
        borderRadius: 50,
    },
    upperLeftButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 10, // Ensure the button is above other content
    },
    upperLeftButtonImage: {
        width: 40,
        height: 40,
    },
    upperImage: {
        position: 'absolute',
        top: 150,
        left: '25%',
        marginLeft: -83, // Half of the width to center it horizontally
        width: 350, // Same width as buttons
        height: 180, // Adjust height as needed
        marginBottom: 20, // Adjust margin bottom as needed
        zIndex: 2, // Set z-index higher than buttons to display above them
    },
});
