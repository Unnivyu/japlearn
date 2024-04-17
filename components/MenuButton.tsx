import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const MenuButton = ({ imageSource, buttonText, onPress }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <View style={styles.imageContainer}>
                <Image source={imageSource} style={styles.image} resizeMode="contain" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#E4E3E3',
        width: 300,
        height: 150,
        overflow: 'hidden',
        marginBottom: 20,
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '40%',
        backgroundColor: '#8ED94D',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    textContainer: {
        flex: 1,
        marginLeft: '40%',
        justifyContent: 'center',
        padding: 10, 
    },
    buttonText: {
        fontFamily: 'jua',
        fontSize: 20,
        textAlign: 'center', 
        flexWrap: 'wrap', 
    },
});

export default MenuButton;
