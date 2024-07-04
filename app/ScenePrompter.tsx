import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Modal, Text, TouchableOpacity } from 'react-native';
import Scene from '../components/Scene';
import DialogueBox from '../components/DialogueBox';
import ChoiceModal from '../components/ChoiceModal';
import scenes from '../game_content/part1';
import MatchGame from './MatchGame';  // Adjust the import path as per your folder structure

const ScenePrompter = () => {
  const [currentSceneId, setCurrentSceneId] = useState(1);
  const [background, setBackground] = useState(null);
  const [character, setCharacter] = useState(null);
  const [characterPosition, setCharacterPosition] = useState(null);
  const [dialogues, setDialogues] = useState([]);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [choices, setChoices] = useState([]);
  const [isChoiceVisible, setIsChoiceVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGameVisible, setIsGameVisible] = useState(false);
  const [isGameModalVisible, setIsGameModalVisible] = useState(false);

  const fadeBackgroundAnimation = useState(new Animated.Value(0))[0];
  const fadeCharacterAnimation = useState(new Animated.Value(0))[0];
  
  useEffect(() => {
    console.log("Current Scene ID:", currentSceneId);
    const scene = scenes.find(scene => scene.id === currentSceneId);
    if (scene) {
        processScene(scene);
    } else {
        console.log("Scene data not found for ID:", currentSceneId);
    }
  }, [currentSceneId]);

  const processScene = (scene) => {
    console.log("Processing scene:", scene);
    setDialogues(scene.dialogues);
    setChoices(scene.choices || []);
    setIsChoiceVisible(false);
    setIsGameVisible(false);
    setIsAnimating(false);
    setCurrentDialogueIndex(0);  // Reset dialogue index at the start of each scene

    const firstDialogue = scene.dialogues[0] || {};
    fadeInBackground(firstDialogue.background || null);
    fadeInCharacter(firstDialogue.characterImage || null);

    setCharacterPosition(firstDialogue.characterPosition);
  };

  const handleChoice = (nextSceneId) => {
    setCurrentSceneId(nextSceneId);
  };

  const handleDialoguePress = () => {
    if (isAnimating || isGameVisible) return;

    if (currentDialogueIndex < dialogues.length - 1) {
      const nextDialogue = dialogues[currentDialogueIndex + 1];
      setCurrentDialogueIndex(currentDialogueIndex + 1);

      if (nextDialogue.background !== undefined) {
        fadeInBackground(nextDialogue.background);
      }
      if (nextDialogue.characterImage !== undefined) {
        fadeInCharacter(nextDialogue.characterImage);
      }

      setCharacterPosition(nextDialogue.characterPosition);

      if (nextDialogue.startGame) {
        setIsGameModalVisible(true);
      }
    } else {
      setIsChoiceVisible(choices.length > 0);
    }
  };

  const startGame = () => {
    setIsGameModalVisible(false);
    setIsGameVisible(true);
  };

  const handleGameComplete = () => {
    setIsGameVisible(false);
    const nextSceneId = currentSceneId + 1;
    const nextScene = scenes.find(scene => scene.id === nextSceneId);
    if (nextScene) {
      setCurrentSceneId(nextSceneId);
    }
  };

  const fadeInBackground = (backgroundImage) => {
    if (backgroundImage !== null && backgroundImage !== background) {
      setBackground(backgroundImage);
      fadeBackgroundAnimation.setValue(0);
      Animated.timing(fadeBackgroundAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else if (backgroundImage === null) {
      setBackground(null);
    }
  };

  const fadeInCharacter = (characterImage) => {
    if (characterImage !== null && characterImage !== character) {
      setCharacter(characterImage);
      fadeCharacterAnimation.setValue(0);
      Animated.timing(fadeCharacterAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else if (characterImage === null) {
      setCharacter(null);
    }
  };

  return (
    <View style={styles.container}>
      {!isGameVisible && (
        <Animated.View style={[styles.fadeContainer, { opacity: fadeBackgroundAnimation }]}>
          {background ? (
            <Scene
                backgroundSource={background}
                characterSource={character}
                characterPosition={characterPosition}
            />
          ) : <Text>No visual content available.</Text>}
        </Animated.View>
      )}
      {dialogues.length > 0 && currentDialogueIndex < dialogues.length && (
        <DialogueBox
            characterName={dialogues[currentDialogueIndex].characterName}
            dialogue={dialogues[currentDialogueIndex].text}
            speed={50}
            onPress={handleDialoguePress}
        />
      )}
      {isGameVisible && (
        <MatchGame
            options={dialogues[currentDialogueIndex].game?.options}
            onComplete={handleGameComplete}
        />
      )}
      <ChoiceModal visible={isChoiceVisible} choices={choices} onSelect={handleChoice} />
      
      <Modal visible={isGameModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Can you match these to familiarize yourself with the characters?</Text>
            <TouchableOpacity onPress={startGame} style={styles.okButton}>
                <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fadeContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  okButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ScenePrompter;
