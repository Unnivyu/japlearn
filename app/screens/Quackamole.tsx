import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Alert, Modal } from 'react-native';
import { styles } from './stylesMole';
import { stylesClass } from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';
import Mole from '../../assets/mole.svg';
import CustomButton from '../../components/CustomButton';

const Quackamole = ({ navigation, route }) => {
    const { levelId } = route.params;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [secondCounter, setSecondCounter] = useState(0);
    const [holes, setHoles] = useState(new Array(9).fill(null));
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [updateCharacter, setUpdateCharacter] = useState(true);
    const [attempts, setAttempts] = useState(0);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [kanaCharacters, setKanaCharacters] = useState([]);
    const [romajiCharacters, setRomajiCharacters] = useState([]);
    const scaleYAnimations = useRef(holes.map(() => new Animated.Value(0))).current;

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/quackamolecontent/getContent/${levelId}`);
                const data = await response.json();
                console.log(data);
                setKanaCharacters(data.kana);
                setRomajiCharacters(data.romaji);
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        fetchContent();
    }, [levelId]);

    useEffect(() => {
        if (isGameStarted) {
            const gameInterval = setInterval(updateMoles, 1000);
            return () => clearInterval(gameInterval);
        }
    }, [currentIndex, secondCounter, gameOver, isGameStarted]);

    const resetGame = () => {
        setCurrentIndex(0);
        setSecondCounter(0);
        setHoles(new Array(9).fill(null));
        setScore(0);
        setGameOver(false);
        setUpdateCharacter(true);
        setAttempts(0);
        setIsGameStarted(true);
    };

    const handleRetry = () => {
        resetGame();
    };

    const updateMoles = () => {
        if (secondCounter >= 29) {
            const nextIndex = currentIndex + 1;
            if (nextIndex < kanaCharacters.length) {
                setCurrentIndex(nextIndex);
                setSecondCounter(0); // Reset the timer for the next character
            } else {
                setGameOver(true); // End the game if all characters have been attempted
                return; // Exit the function to stop further execution
            }
        }

        if (gameOver) return;

        let newHoles = new Array(9).fill(null);
        const activeMolesCount = Math.floor(Math.random() * 3) + 1;
        const activeIndexes = [];

        while (activeIndexes.length < activeMolesCount) {
            const randomIndex = Math.floor(Math.random() * 9);
            if (!activeIndexes.includes(randomIndex)) {
                activeIndexes.push(randomIndex);
                newHoles[randomIndex] = romajiCharacters[Math.floor(Math.random() * romajiCharacters.length)];
                animateMole(randomIndex, true);  // Animate mole emerging
                setTimeout(() => animateMole(randomIndex, false), 3000);  // Animate mole retracting
            }
        }

        setHoles(newHoles);
        setSecondCounter(prevCounter => prevCounter + 1);
        setUpdateCharacter(!updateCharacter); // Toggle the character update
    };

    const animateMole = (index, shouldPopUp) => {
        Animated.timing(scaleYAnimations[index], {
            toValue: shouldPopUp ? 1 : 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
        }).start();
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleWhack = (index) => {
        if (holes[index] === romajiCharacters[currentIndex]) {
            setScore(score + 1);
            animateMole(index, false);
            const nextIndex = currentIndex + 1;
            if (nextIndex < kanaCharacters.length) {
                setCurrentIndex(nextIndex);
                setSecondCounter(0);
                setAttempts(0);
            } else {
                setGameOver(true);
            }
            Alert.alert('Hit!');
        } else {
            setAttempts(attempts + 1);
            if (attempts + 1 >= 3) {
                Alert.alert('Miss!');
                const nextIndex = currentIndex + 1;
                if (nextIndex < kanaCharacters.length) {
                    setCurrentIndex(nextIndex);
                    setSecondCounter(0);
                    setAttempts(0);
                } else {
                    setGameOver(true);
                }
            }
        }
    };

    const startGame = () => {
        setIsGameStarted(true);
    };

    if (gameOver) {
        return (
            <Modal
                visible={gameOver}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setGameOver(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.gameOverText}>Game Over!</Text>
                        <Text style={styles.scoreText}>Your final score: {score}</Text>
                        <View style={styles.buttonRow}>
                            <CustomButton title="OK" onPress={handleBackPress} style={styles.endButton} textStyle={styles.endButtonText} />
                            <CustomButton title="Retry" onPress={handleRetry} style={styles.retryButton} textStyle={styles.retryButtonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <Modal
                visible={!isGameStarted}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsGameStarted(true)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Ready to start the game?</Text>
                        <TouchableOpacity onPress={startGame} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Start Game</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={stylesClass.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.timerContainer}>
                <View style={styles.timer}>
                    <Text style={styles.timerText}>Timer: {29 - secondCounter}</Text>
                </View>
            </View>
            <View style={styles.displayContainer}>
                <Text style={styles.charText}>{kanaCharacters[currentIndex]}</Text>
            </View>
            <View style={styles.moleContainer}>
                {holes.map((char, index) => (
                    <View key={index} style={styles.hole}>
                        <Animated.View style={[
                            styles.mole,
                            {
                                transform: [{ scaleY: scaleYAnimations[index] }]
                            }
                        ]}>
                            {char && (
                                <TouchableOpacity onPress={() => handleWhack(index)} style={styles.moleTouchable}>
                                    <View style={styles.romajiContainer}>
                                        <Text style={styles.romajiText}>{char}</Text>
                                    </View>
                                    <Mole width={100} height={150} />
                                </TouchableOpacity>
                            )}
                        </Animated.View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Quackamole;
