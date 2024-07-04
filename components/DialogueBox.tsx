import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const isMobile = width < 600; // Adjust this breakpoint based on your requirements

const DialogueBox = ({ characterName, dialogue, speed, onPress }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(''); // Clear displayed text when dialogue changes
    setIsAnimating(true); // Start animation

    animationRef.current = setInterval(() => {
      setDisplayedText(prevText => {
        if (currentIndex < dialogue.length) {
          return prevText + dialogue[currentIndex++];
        } else {
          clearInterval(animationRef.current);
          setIsAnimating(false);
          return prevText;
        }
      });
    }, speed);

    return () => {
      clearInterval(animationRef.current);
    };
  }, [dialogue, speed]);

  const handlePress = () => {
    if (isAnimating) {
      clearInterval(animationRef.current);
      setDisplayedText(dialogue); // Display full dialogue text immediately
      setIsAnimating(false);
    } else {
      onPress(); // Proceed to next scene or action when dialogues are finished
    }
  };

  return (
    <Pressable onPress={handlePress} style={styles.dialogueContainer}>
      <Text style={isMobile ? styles.characterNameMobile : styles.characterNamePC}>{characterName}</Text>
      <Text style={isMobile ? styles.dialogueTextMobile : styles.dialogueTextPC}>{displayedText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dialogueContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    minHeight: 180, // Increased height
  },
  characterNameMobile: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  characterNamePC: {
    fontWeight: 'bold',
    fontSize: 24, // Increased font size for PC
    color: 'white',
    marginBottom: 10,
  },
  dialogueTextMobile: {
    fontSize: 16,
    color: 'white',
  },
  dialogueTextPC: {
    fontSize: 20, // Increased font size for PC
    color: 'white',
  },
});

export default DialogueBox;
