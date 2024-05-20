import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import { stylesQuackman } from './stylesQuackman';
import { stylesClass } from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';

// Example list of all romaji
const allRomaji = ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'shi', 'su', 'se', 'so', 'ta', 'chi', 'tsu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'fu', 'he', 'ho', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro', 'wa', 'wo', 'n'];

const staticData = [
    { word: ["ku", "ru", "ma"], hint: "A vehicle with 4 wheels used for transport." },
    { word: ["mi", "zu"], hint: "The clear liquid essential for life, found in rivers and lakes." },
    { word: ["hi", "to", "ri"], hint: "A single unit or individual, one." },
    { word: ["ta", "be", "mo", "no"], hint: "Something you eat to sustain life." },
    { word: ["ne", "ko"], hint: "A small domesticated carnivorous mammal with soft fur." }
];

const Quackman = () => {
    const [romajiGrid, setRomajiGrid] = useState([]);
    const [inputRomaji, setInputRomaji] = useState([]);
    const [currentHint, setCurrentHint] = useState('');
    const [wordLength, setWordLength] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState([null, null, null]); // null means no attempt, true means correct, false means incorrect
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        loadWord();
    }, [currentWordIndex]);

    const loadWord = () => {
        const selectedData = staticData[currentWordIndex];
        const { hint, word } = selectedData;

        setCurrentHint(hint);
        setWordLength(word.length);
        const grid = fillGrid(word, allRomaji, 12); // 4x3 grid needs 12 characters
        setRomajiGrid(grid);
        setInputRomaji([]);
        setAttempts([null, null, null]); // Reset attempts for the new word
    };

    const fillGrid = (syllables, allSyllables, gridSize) => {
        const filledGrid = [...syllables];

        while (filledGrid.length < gridSize) {
            const randomIndex = Math.floor(Math.random() * allSyllables.length);
            const randomRomaji = allSyllables[randomIndex];
            if (!filledGrid.includes(randomRomaji)) {
                filledGrid.push(randomRomaji);
            }
        }

        // Shuffle the grid
        for (let i = filledGrid.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [filledGrid[i], filledGrid[j]] = [filledGrid[j], filledGrid[i]];
        }

        return filledGrid;
    };

    const toggleRomaji = (char) => {
        setInputRomaji((prevInput) => {
            let newInput;
            if (prevInput.includes(char)) {
                newInput = prevInput.filter((c) => c !== char);
            } else {
                newInput = prevInput.length < wordLength ? [...prevInput, char] : prevInput;
            }

            if (newInput.length === wordLength) {
                setModalVisible(true);
            }

            return newInput;
        });
    };

    const handleConfirm = () => {
        const selectedData = staticData[currentWordIndex];
        const { word } = selectedData;

        if (inputRomaji.join('') === word.join('')) {
            // Correct attempt
            setScore(score + 1);
            setProgress(progress + 1);
            moveToNextWord();
        } else {
            // Incorrect attempt
            setAttempts((prevAttempts) => {
                const updatedAttempts = [...prevAttempts];
                updatedAttempts[prevAttempts.findIndex((attempt) => attempt === null)] = false;
                if (updatedAttempts.filter(attempt => attempt === false).length === 3) {
                    moveToNextWord();
                }
                return updatedAttempts;
            });
        }

        setModalVisible(false);
        setInputRomaji([]);
    };

    const moveToNextWord = () => {
        if (currentWordIndex + 1 === staticData.length) {
            setGameOver(true);
        } else {
            setCurrentWordIndex(currentWordIndex + 1);
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleBackPress = () => {
        setGameOver(false);
        // Handle navigation back or any other logic
    };

    const handleRetry = () => {
        setGameOver(false);
        setProgress(0);
        setScore(0);
        setCurrentWordIndex(0);
        setAttempts([null, null, null]);
    };

    if (gameOver) {
        return (
            <Modal
                visible={gameOver}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setGameOver(false)}
            >
                <View style={stylesQuackman.modalContainer}>
                    <View style={stylesQuackman.modalContent}>
                        <Text style={stylesQuackman.gameOverText}>Game Over!</Text>
                        <Text style={stylesQuackman.scoreText}>Your final score: {score}</Text>
                        <View style={stylesQuackman.buttonRow}>
                            <CustomButton title="OK" onPress={handleBackPress} style={stylesQuackman.endButton} textStyle={stylesQuackman.endButtonText} />
                            <CustomButton title="Retry" onPress={handleRetry} style={stylesQuackman.retryButton} textStyle={stylesQuackman.retryButtonText} />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={stylesClass.header}>
                <TouchableOpacity onPress={() => console.log('Back button pressed')}>
                    <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={stylesQuackman.progressContainer}>
                <View style={stylesQuackman.progress}>
                    <Text style={stylesQuackman.progressText}>{currentWordIndex + 1}/{staticData.length}</Text>
                </View>
            </View>
            
            <View style={stylesQuackman.menuContainer}>
                <Image source={require('../../assets/quacklogo.png')} style={stylesQuackman.Quacklogo} />
                <Text style={stylesQuackman.textStyle}>Quackman</Text>
            </View>

            <View style={stylesQuackman.attemptsContainer}>
                {attempts.map((attempt, index) => (
                    <View key={index} style={[stylesQuackman.attempt, attempt === false && stylesQuackman.attemptWrong, attempt === true && stylesQuackman.attemptCorrect]}></View>
                ))}
            </View>

            <View style={stylesQuackman.charGridContainer}>
                <View style={stylesQuackman.charGrid}>
                    {romajiGrid.map((char, index) => (
                        <TouchableOpacity key={index} style={[stylesQuackman.charCell, inputRomaji.includes(char) && stylesQuackman.charCellSelected]} onPress={() => toggleRomaji(char)}>
                            <Text style={stylesQuackman.charText}>{char}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={stylesQuackman.hintInputContainer}>
                <View style={stylesQuackman.hintContainer}>
                    <Text style={stylesQuackman.hintText}>
                        {currentHint}
                    </Text>
                </View>
                <View style={stylesQuackman.inputContainer}>
                    {Array.from({ length: wordLength }, (_, index) => (
                        <View key={index} style={[stylesQuackman.inputCell]}>
                            <Text style={stylesQuackman.inputText}>{inputRomaji[index]}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={stylesQuackman.modalContainer}>
                    <View style={stylesQuackman.modalContent}>
                        <Text style={stylesQuackman.modalText}>Are you sure you want to submit?</Text>
                        <View style={stylesQuackman.modalButtons}>
                            <CustomButton style={stylesQuackman.modButton} title="Cancel" onPress={handleCancel} />
                            <CustomButton style={stylesQuackman.modButton} title="Confirm" onPress={handleConfirm} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Quackman;
