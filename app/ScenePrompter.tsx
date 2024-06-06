import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, Pressable, Modal, Dimensions, Animated } from 'react-native';
import getStyles from '../styles/stylesPrompter';
import storyData from '../game_content/levels/level_1';

const getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    return height > width ? 'portrait' : 'landscape';
};

const ScenePrompter = () => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [displayText, setDisplayText] = useState("");
    const orientation = getOrientation();
    const styles = getStyles(orientation);
    const textTimerRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(1)).current;  // Opacity animation for fade transitions

    const currentScene = storyData.scenes[currentSceneIndex];
    const currentDialogue = currentScene.dialogues[dialogueIndex];

    // Typewriter effect
    useEffect(() => {
        let index = 0;
        setDisplayText("");
        
        const timer = setInterval(() => {
            if (index < currentDialogue.text.length) {
                setDisplayText(currentDialogue.text.substring(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [dialogueIndex, currentSceneIndex, currentDialogue.text]); // Reset effect when dialogue or scene changes

    const advanceDialogue = () => {
        const nextIndex = dialogueIndex + 1;
        if (nextIndex < currentScene.dialogues.length) {
            setDialogueIndex(nextIndex);
        } else {
            setModalVisible(true);
        }
    };

    const changeScene = (nextSceneIndex) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            setCurrentSceneIndex(nextSceneIndex);
            setDialogueIndex(0);
            setModalVisible(false);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        });
    };

    const selectOption = (optionIndex) => {
        const nextSceneId = currentScene.options[optionIndex].goTo;
        const nextSceneIndex = storyData.scenes.findIndex(scene => scene.id === nextSceneId);
        changeScene(nextSceneIndex);
    };

    return (
        <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
            <Image source={currentScene.background} style={styles.backgroundImage} />
            <View style={styles.dialogueContainer}>
                {currentDialogue.characterImage && (
                    <Image
                        source={currentDialogue.characterImage}
                        style={[
                            styles.characterImage,
                            currentDialogue.position === 'left' && styles.characterLeft,
                            currentDialogue.position === 'right' && styles.characterRight
                        ]}
                    />
                )}
                <View style={styles.dialogueBox}>
                    <Pressable onPress={advanceDialogue}>
                        {currentDialogue.character && (
                            <Text style={styles.characterName}>{currentDialogue.character}</Text>
                        )}
                        <Text style={styles.dialogueText}>{displayText}</Text>
                    </Pressable>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(!isModalVisible)}
            >
                <View style={styles.modalView}>
                    {currentScene.options && currentScene.options.map((option, index) => (
                        <Pressable
                            key={index}
                            style={styles.optionButton}
                            onPress={() => selectOption(index)}
                        >
                            <Text style={styles.optionText}>{option.text}</Text>
                        </Pressable>
                    ))}
                </View>
            </Modal>
        </Animated.View>
    );
};

export default ScenePrompter;
