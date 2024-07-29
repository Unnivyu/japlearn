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
        backgroundColor: '#007BFF',
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
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        width: 80,
        height: 80,
        backgroundColor: '#8423D9',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
    },
    cardText: {
        fontSize: 32,
        color: '#FFFFFF',
    },
    message: {
        fontSize: 20,
        color: 'red',
        marginTop: 20,
    },
});

export default styles;
