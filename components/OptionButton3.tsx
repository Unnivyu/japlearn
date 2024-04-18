import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const OptionButton2 = ({ imageSource, buttonText, onPress }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={imageSource} style={styles.image} resizeMode="cover" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 0,
        width: 350,
        height: 125,
        overflow: 'hidden',
        marginBottom: 75,
        marginTop: -75,
    },
    container: {
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: 20, // Add border radius for smooth edges
        overflow: 'hidden', // Hide overflow for smooth edges
        
    },
    imageContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 20, // Add border radius for smooth edges
        
        
    },
    textContainer: {
        top: 35, // Adjust to move the text container to the bottom
        left: 0,
        width: '100%',
        alignItems: 'center', // Center the text horizontally
        justifyContent: 'center', // Center the text vertically
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        
    },
    buttonText: {
        fontFamily: 'jua',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
});

export default OptionButton2;
