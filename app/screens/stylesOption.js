import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const stylesOption = StyleSheet.create({
    menuContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerContainer: {
        padding: 20,
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
    },
});