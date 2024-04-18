import { StyleSheet } from 'react-native';

export const stylesProfile = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 90,
        justifyContent: 'center',
        paddingLeft: '5%',
        paddingTop: 30,
    },
    cover: {
        backgroundColor: '#8423D9',
        height: 180,
    },

    profileContainer: {
        width: 150, 
        height: 150,
        borderRadius: 75, 
        backgroundColor: 'white', 
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 110,
        marginLeft: 10,
        shadowColor: 'light-grey'

    },
    description: {
        padding: 20,
        borderBottomColor: '#E1E1E1',
        borderBottomWidth: 5,
        borderTopWidth: 0, 
        borderLeftWidth: 0, 
        borderRightWidth: 0, 
    },
    descText: {
        fontFamily: 'jua',
        fontSize: 20,
        marginTop: 10,
    },
    descTextContainer: {
        justifyContent: 'center',
        
    },
    whiteSpace: {
        height: 75,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '5%',
    },
    buttonContainer: {
        height: 50,
        backgroundColor: '#D6D6D6', 
        borderRadius: 40, 
        overflow: 'hidden', 
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'jua',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    scoreArea: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    scoreButton: {
        backgroundColor: '#8ED94D',
        height: 100,
        width: '90%', 
        borderRadius: 40,
        justifyContent: 'center'
    },
    scoreButtonText: {
        color: 'white',
        fontFamily: 'jua',
        fontSize: 40,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    
});
