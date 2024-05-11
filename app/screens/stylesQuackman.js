import { StyleSheet } from 'react-native';

export const stylesQuackman = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',  // Align children horizontally
        alignItems: 'flex-end',  // Align items to the bottom
        justifyContent: 'center',  // Center the contents within the container horizontally
    },
    MenuAll: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Progress: {
        position: 'absolute', 
        top: -270, 
        left: 240, 
        width: 105, 
        height: 45, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    BackButton: {
        position: 'absolute', 
        top: -185, 
        left: 20
    },
    upperLeftButtonImage: {
        width: 70,
        height: 40,
        top: -80
    },
    Quacklogo: {
        width: 100,
        height: 100,
        marginRight: 20,  // Space between the logo and the text
        marginTop: -300, 
        marginBottom: 100 // Move the logo up relative to the text
    },
    textStyle: {
        fontWeight: 'bold', 
        fontSize: 30,
        marginTop: -300,
        marginBottom: 135
    },
    QuackChance: {
        width: 50,
        height: 40,
        borderRadius: 10,
        marginRight: 10,  // Right margin for spacing between images
        marginLeft: 10,  // Left margin if needed for spacing
    },
    quackChanceContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: -200,
        marginBottom: -180
    },
    QuackmanOptions: {
        width: 50,  // Example width, adjust as needed
        height: 50,  // Example height, adjust as needed
        marginTop: 30,  // Space above the button to separate it from the images
        alignSelf: 'center'  // Center the button horizontally
    },
    QuackmanBGImage: {
        marginBottom: -200
    },
    QuackmanBGText: {
        position: 'absolute',
        top: '55%',
        left: '10%',
        fontSize: 20,
        color: 'black',
        
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',  // This will space out the buttons evenly
        width: '100%',  // Ensure the container takes full width of the screen
        marginTop: 80,
        marginBottom: 50,
        paddingHorizontal: 10,  // Add horizontal padding if needed
    },
    button: {
        width: 60,  // Adjust size based on your preference and screen size
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,  // Vertical spacing between rows
    },
    buttonText: {
        fontSize: 12,  // Make sure text is readable
        color: 'white',  // Ensure contrast against button background
        fontWeight: 'bold',
        position: 'absolute',  // Overlay text on the image
    },
    buttonImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 5,  // Optional: adds rounded corners to the button image
    },
    purpleBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',  // Space boxes horizontally
        marginTop: 10,
                          // Adjust vertical spacing
    },
    purpleBox: {
        width: 50,                       // Square width
        height: 50,                      // Square height
        backgroundColor: 'white',        // White background for text input
        borderColor: 'purple',           // Purple border color
        borderWidth: 2,                  // Thickness of the border
        justifyContent: 'center',        // Center text vertically
        alignItems: 'center',            // Center text horizontally
        borderRadius: 4,                 // Rounded corners (optional)
        marginHorizontal: 10,            // Horizontal spacing between boxes
        marginVertical: 5,    
        marginBottom: 30           // Vertical spacing between rows
    },
    textInputStyle: {
        flex: 1,
        color: 'purple',                 // Text color for visibility
        textAlign: 'center',             // Center text horizontally
        fontWeight: 'bold',              // Bold text
    },
});
