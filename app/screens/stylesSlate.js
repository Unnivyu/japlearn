import { StyleSheet } from 'react-native';

export const stylesSlate = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontWeight: 'bold', 
        fontSize: 24, 
        marginTop: 20,
        textAlign: 'center',
        marginTop: 60,
    },
    phraseContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical: 20,
    },
    phraseText: {
        fontSize: 24, 
        color: 'black', 
        textAlign: 'center'
    },
    imageStyle:{
        marginTop: -100, 
        width: 250, 
        height: 100
    },
    SlateBody: {
        marginTop:100, 
        width: 360, 
        height: 300,
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
        marginTop: -50
    },
    menuText: {
        fontFamily: 'jua',
        fontSize: 30,
    },
    MenuAll:{
        flexGrow: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingHorizontal: 20,
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
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        marginBottom: -200,
    },
    streakModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    streakModalBox: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    streakModalText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    samuraiImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        margin: 20,
        marginTop: 100,
        marginBottom: 100,
    },
    Progress:{
        position: 'absolute', 
        top: 15, 
        right: 10, 
        width: 90, 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 1,
    },
    pictureCircle: {
        backgroundColor: 'white',
        width: 50, 
        height: 50, 
        borderRadius: 50,
    },
    BackButton: {
        position: 'absolute', 
        top: 40, 
        left: 10,
        zIndex: 1,
    },
    NextButton: {
        position: 'absolute', 
        bottom: 40, 
        right: 40,
        zIndex: 1,
    },
    NextButtonS:{
        width: 85, 
        height: 40
    },
    textInput: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20, // Increased border radius for smoother edges
        paddingHorizontal: 20, // Adjusted padding for better appearance
        textAlign: 'center',
        marginTop: 200,
    },
    timerContainer: {
        position: 'absolute', // Position the timer absolutely within the parent container
        top: 15, // Adjust this value to move the timer up or down
        left: 10, 
        width: 90, 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 1,
    },
    timerText: {
        fontSize: 20, // Font size for the timer text
        fontWeight: 'bold', // Bold font for emphasis
    },
    promptContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    },
    promptBox: {
        width: '90%', // Width of the prompt box
        padding: 50, // Padding inside the prompt box
        backgroundColor: 'white', // Background color of the prompt box
        borderRadius: 10, // Rounded corners
        alignItems: 'center', // Center align the content inside the prompt box
    },
    promptText: {
        fontSize: 18, // Font size of the text inside the prompt box
        textAlign: 'center', // Center align the text
        marginBottom: 20, // Margin at the bottom of the text
        letterSpacing: 1.1,
    },
    startButton: {
        backgroundColor: '#8423D9', // Background color of the start button
        padding: 10, // Padding inside the start button
        borderRadius: 5, // Rounded corners of the start button
        margin: 5,
    },
    startButtonText: {
        color: 'white', // Text color of the start button
        fontSize: 16, // Font size of the start button text
    },
});
