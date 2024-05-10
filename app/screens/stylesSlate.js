import { StyleSheet } from 'react-native';

export const stylesSlate = StyleSheet.create({

    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontWeight: 'bold', 
        fontSize: 30, 
        marginTop: -350
    },
    imageStyle:{
        marginTop: -200, 
        width: 200, 
        height: 200,
        marginLeft: 80
        
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
        marginTop: -50
    },
    menuText: {
        fontFamily: 'jua',
        fontSize: 30,
    },
    MenuAll:{
        flex: 1, justifyContent: 'center', alignItems: 'center'
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
    Progress:{
        position: 'absolute', 
        top: 120, 
        left: 240, 
        width: 105, 
        height: 45, 
        justifyContent: 'center', 
        alignItems: 'center' 
        
    },
    pictureCircle: {
        backgroundColor: 'white',
        width: 50, 
        height: 50, 
        borderRadius: 50,
    },
    
    BackButton: {
        position: 'absolute', 
        top: -230, 
        left: 20
    },
    NextButton: {
        position: 'absolute', 
        top: 400, 
        left: 250
    },
    NextButtonS:{
        width: 85, 
        height: 40
    },

    upperLeftButtonImage: {
        width: 70, height: 40
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
    textInput: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20, // Increased border radius for smoother edges
        paddingHorizontal: 100, // Adjusted padding for better appearance
        marginTop: 200,
    },
    Mole: {
        position: 'absolute', // Position the Mole absolutely within the SlateBody
        top: 100, // Adjust as needed
        left: 35, // Adjust as needed
        width: 70, // Adjust as needed
        height: 80, // Adjust as needed
    },
});
