import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        height: 90,
        justifyContent: 'center',
        paddingLeft: '5%',
        paddingTop: 30,
        backgroundColor: '#8423D9',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    characterDisplay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    romaji: {
        fontSize: 48,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    character: {
        fontSize: 32,
        marginBottom: 20,
    },
    button: {
        padding: 15,
        backgroundColor: '#8423D9',
        borderRadius: 5,
        marginVertical: 10,
        minWidth: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    matchGame: {
        marginTop: 110,
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    matchGameText: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    optionButton: {
        padding: 10,
        backgroundColor: '#8423D9',
        borderRadius: 5,
        margin: 5,
        minWidth: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 20,
        color: 'red',
        marginTop: 20,
    },
});

export default styles;