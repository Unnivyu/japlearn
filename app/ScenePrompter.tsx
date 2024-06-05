import React, { useState, useEffect } from 'react';
import { View, Text, Image, Pressable, Modal, Dimensions } from 'react-native';
import getStyles from '../styles/stylesPrompter';
import storyData from '../game_content/levels/level_1';  // Ensure this path is correct

const getOrientation = () => {
    const { width, height } = Dimensions.get('window');
    return height > width ? 'portrait' : 'landscape';
};

const ScenePrompter = () => {
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const orientation = getOrientation();

    const currentScene = storyData.scenes[currentSceneIndex];
    const currentDialogue = currentScene.dialogues[dialogueIndex];

    const styles = getStyles(orientation);

    const advanceDialogue = () => {
        const nextIndex = dialogueIndex + 1;
        if (nextIndex < currentScene.dialogues.length) {
            setDialogueIndex(nextIndex);
        } else {
            setModalVisible(true);  // Show options in the modal
        }
    };

    const selectOption = (optionIndex) => {
        const nextSceneId = currentScene.options[optionIndex].goTo;
        const nextSceneIndex = storyData.scenes.findIndex(scene => scene.id === nextSceneId);
        setCurrentSceneIndex(nextSceneIndex);
        setDialogueIndex(0);
        setModalVisible(false);  // Hide the modal after selection
    };

    return (
        <View style={styles.container}>
            <Image
                source={currentScene.background}
                style={styles.backgroundImage}
            />
            <View style={styles.dialogueContainer}>
                <Image
                    source={{ uri: currentDialogue.image }}
                    style={styles.characterImage}
                />
                <Pressable onPress={advanceDialogue} style={styles.dialogueBox}>
                    <Text style={styles.characterName}>{currentDialogue.character}</Text>
                    <Text style={styles.dialogueText}>{currentDialogue.text}</Text>
                </Pressable>
            </View>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(!isModalVisible);
                }}
            >
                <View style={styles.modalView}>
                    {currentScene.options && (
                        currentScene.options.map((option, index) => (
                            <Pressable
                                key={index}
                                style={styles.optionButton}
                                onPress={() => selectOption(index)}
                            >
                                <Text style={styles.optionText}>{option.text}</Text>
                            </Pressable>
                        ))
                    )}
                </View>
            </Modal>
        </View>
    );
};

export default ScenePrompter;
