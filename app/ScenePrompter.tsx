import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import levelData from '../levels/level_1';  // Make sure the path is correct

const { height } = Dimensions.get('window');  // Get the full height of the screen

const ScenePrompter = () => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    const currentScene = levelData.level1[0].scenes[currentSceneIndex];
    const currentText = currentScene.texts[textIndex];

    const handleTextAdvance = () => {
        if (textIndex < currentScene.texts.length - 1) {
            setTextIndex(textIndex + 1);
        } else {
            const nextSceneIndex = (currentSceneIndex + 1) % levelData.level1[0].scenes.length;
            setCurrentSceneIndex(nextSceneIndex);
            setTextIndex(0);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={typeof currentScene.backgroundImage === 'string' ? { uri: currentScene.backgroundImage } : currentScene.backgroundImage}
                style={styles.backgroundImage}
            />

            <View style={styles.characterImageContainer}>
                <Image
                    source={{ uri: currentText.characterImage }}
                    style={styles.characterImage}
                />
            </View>
            <Pressable style={styles.textContainer} onPress={handleTextAdvance}>
                <Text style={styles.speaker}>{currentText.speaker}</Text>
                <Text style={styles.text}>{currentText.text}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    characterImageContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: height * 0.2,  // Ensure it does not overlap the text container
        zIndex: 2  // Higher than background
    },
    characterImage: {
        width: '60%',  // Adjust the width as needed
        height: '50%',  // Adjust the height as needed
        resizeMode: 'contain'
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: height * 0.2, // 20% of the screen height
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        justifyContent: 'center',
        zIndex: 3  // Highest to ensure visibility
    },
    speaker: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    text: {
        color: 'white',
        fontSize: 16,
    }
});


export default ScenePrompter;
