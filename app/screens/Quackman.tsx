import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Alert } from 'react-native';
import { stylesQuackman } from './stylesQuackman';
import { stylesClass } from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';
import CustomButton from '../../components/CustomButton';
import { useClassCode } from '../../context/ClassCodeContext';
import { AuthContext } from '../../context/AuthContext';
import expoconfig from '../../expoconfig';

const allRomaji = [
    'a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'shi', 'su', 'se', 'so', 'ta', 'chi', 'tsu', 'te', 'to', 
    'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'fu', 'he', 'ho', 'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 
    'ru', 're', 'ro', 'wa', 'wo', 'n', 'ga', 'gi', 'gu', 'ge', 'go', 'za', 'ji', 'zu', 'ze', 'zo', 'da', 'ji', 'zu', 'de', 
    'do', 'ba', 'bi', 'bu', 'be', 'bo', 'pa', 'pi', 'pu', 'pe', 'po'
];

const Quackman = ({ navigation, route }) => {
    const { levelId } = route.params;
    const { title } = route.params;
    const [data, setData] = useState([]);
    const [romajiGrid, setRomajiGrid] = useState([]);
    const [inputRomaji, setInputRomaji] = useState([]);
    const [currentHint, setCurrentHint] = useState('');
    const [wordLength, setWordLength] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState([null, null, null]); 
    const [gameOver, setGameOver] = useState(false);

    const { user } = useContext(AuthContext);
    const { classCode } = useClassCode();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${expoconfig.API_URL}/api/quackmancontent/getContentByLevelId/${levelId}`);
                const json = await response.json();
                if (json.hint && json.word) {
                    const transformedData = json.hint.map((hint, index) => ({
                        hint: hint,
                        word: syllabifyWord(json.word[index])
                    }));
                    setData(transformedData);
                    if (transformedData.length > 0) {
                        loadWord(0);
                    }
                } else {
                    console.error("Invalid data format:", json);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [levelId]);

    const syllabifyWord = (word) => {
        let syllables = [];
        let i = 0;
        while (i < word.length) {
            let found = false;
            for (let len = 2; len > 0; len--) {
                let sub = word.slice(i, i + len);
                if (allRomaji.includes(sub)) {
                    syllables.push(sub);
                    i += len;
                    found = true;
                    break;
                }
            }
            if (!found) {
                console.error(`Invalid syllable in word '${word}' at position ${i}`);
                return [];
            }
        }
        return syllables;
    }

    useEffect(() => {
        if (data.length > 0) {
            loadWord(currentWordIndex);
        }
    }, [currentWordIndex, data]);

    const loadWord = (index) => {
        if (index < data.length) {
            const selectedData = data[index];
            const { hint, word } = selectedData;

            setCurrentHint(hint);
            setWordLength(word.length);
            const grid = fillGrid(word, allRomaji, 12);
            setRomajiGrid(grid);
            setInputRomaji([]);
            setAttempts([null, null, null]);
        }
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
        const selectedData = data[currentWordIndex];
        const { word } = selectedData;

        if (inputRomaji.join('') === word.join('')) {
            setScore(score + 1);
            setProgress(progress + 1);
            moveToNextWord();
        } else {
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
        if (currentWordIndex + 1 === data.length) {
            setGameOver(true);
            sendScoreToBackend(score);
        } else {
            setCurrentWordIndex(currentWordIndex + 1);
        }
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleBackPress = () => {
        setGameOver(false);
        navigation.navigate('QuackmanOption');
    };

    const handleRetry = () => {
        setGameOver(false);
        setProgress(0);
        setScore(0);
        setCurrentWordIndex(0);
        setAttempts([null, null, null]);
    };

    const sendScoreToBackend = async (finalScore) => {
        const scoreData = {
            fname: user.fname,
            lname: user.lname,
            score: finalScore,
            classcode: classCode,
            level: title
        };

        try {
            const response = await fetch(`${expoconfig.API_URL}/api/quackmanScores/addquackmanScore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scoreData)
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
            }

            const result = await response.json();
            console.log('Score saved successfully:', result);
        } catch (error) {
            console.error('Error saving score:', error);
            alert(`Error saving score: ${error.message}`);
        }
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
                <TouchableOpacity onPress={handleBackPress}>
                    <View style={stylesClass.backButtonContainer}>
                        <BackIcon width={20} height={20} fill={'white'} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={stylesQuackman.progressContainer}>
                <View style={stylesQuackman.progress}>
                    <Text style={stylesQuackman.progressText}>{currentWordIndex + 1}/{data.length}</Text>
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
