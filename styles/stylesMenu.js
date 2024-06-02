import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pictureCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    header: {
        backgroundColor: '#8423D9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 40,
        marginBottom: 20,
        borderBottomWidth: 10,
        borderBottomColor: '#6C3A99',
        height: 130,
    },
    hText: {
        fontFamily: 'Jua',
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
        flex: 1,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontFamily: 'Jua',
        fontSize: 18,
        marginBottom: 10,
    },
    flatListContainer: {
        justifyContent: 'space-between',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    levelContainer: {
        flex: 1,
        margin: 10,
        alignItems: 'center',
        maxWidth: '50%', 
        marginBottom: 40, 
    },
    menuText: {
        fontFamily: 'Jua',
        fontSize: 15,
        textAlign: 'center',
    },
    completedButton: {
        backgroundColor: '#8ED94D',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 10,
    },
    incompleteButton: {
        backgroundColor: '#C0C0C0',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        margin: 10,
    },
    buttonText: {
        fontSize: 20,
    },
});

export default styles;