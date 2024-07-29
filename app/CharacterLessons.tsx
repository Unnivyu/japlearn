import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from "../styles/stylesCharacterLessons";
import BackIcon from '../assets/svg/back-icon.svg';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

const CharacterLessons = () => {
    const router = useRouter();
    const characters = [
        { romaji: "a", hiragana: "あ", katakana: "ア" },
        { romaji: "i", hiragana: "い", katakana: "イ" },
        { romaji: "u", hiragana: "う", katakana: "ウ" },
        { romaji: "e", hiragana: "え", katakana: "エ" },
        { romaji: "o", hiragana: "お", katakana: "オ" },
        { romaji: "ka", hiragana: "か", katakana: "カ" },
        { romaji: "ki", hiragana: "き", katakana: "キ" },
        { romaji: "ku", hiragana: "く", katakana: "ク" },
        { romaji: "ke", hiragana: "け", katakana: "ケ" },
        { romaji: "ko", hiragana: "こ", katakana: "コ" },
        { romaji: "sa", hiragana: "さ", katakana: "サ" },
        { romaji: "shi", hiragana: "し", katakana: "シ" },
        { romaji: "su", hiragana: "す", katakana: "ス" },
        { romaji: "se", hiragana: "せ", katakana: "セ" },
        { romaji: "so", hiragana: "そ", katakana: "ソ" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showMatchGame, setShowMatchGame] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [message, setMessage] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [lastFiveIndices, setLastFiveIndices] = useState([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

    const options = characters.map(character => character.romaji);

    const handleNext = () => {
        if (currentIndex === characters.length - 1) {
            setIsComplete(true);
            setShowMatchGame(true);
        } else {
            const newAttempts = (attempts + 1) % 5;
            setAttempts(newAttempts);

            if (newAttempts === 0) {
                setShowMatchGame(true);
            }

            const newIndex = (currentIndex + 1) % characters.length;
            setCurrentIndex(newIndex);

            setLastFiveIndices(prevIndices => {
                const updatedIndices = [...prevIndices, currentIndex];
                if (updatedIndices.length > 5) {
                    updatedIndices.shift();
                }
                return updatedIndices;
            });
        }
    };

    const handleMatchGameNext = (romaji) => {
        const characterIndex = lastFiveIndices[currentMatchIndex];
        if (romaji === characters[characterIndex].romaji) {
            setMessage('');
            if (currentMatchIndex === lastFiveIndices.length - 1) {
                setShowMatchGame(false);
                setAttempts(0);
                setLastFiveIndices([]);
                setCurrentMatchIndex(0);
                if (isComplete) {
                    setIsComplete(true);
                }
            } else {
                setCurrentMatchIndex((prevIndex) => prevIndex + 1);
            }
        } else {
            setMessage('Wrong, try again.');
        }
    };

    const handleBackPress = () => {
        router.back();
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setAttempts(0);
        setIsComplete(false);
        setShowMatchGame(false);
        setLastFiveIndices([]);
        setCurrentMatchIndex(0);
    };

    return (
        <View style={{ flex: 0.5 }}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <BackIcon width={30} height={30} />
                </TouchableOpacity>
            </View>
            {isComplete && !showMatchGame ? (
                <View style={styles.characterDisplay}>
                    <Text style={styles.romaji}>Well done! You have finished all characters.</Text>
                    <TouchableOpacity style={styles.button} onPress={handleRestart}>
                        <Text style={styles.buttonText}>Restart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleBackPress}>
                        <Text style={styles.buttonText}>Go to menu</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                !showMatchGame ? (
                    <View style={styles.characterDisplay}>
                        <Text style={styles.romaji}>{characters[currentIndex].romaji}</Text>
                        <Text style={styles.character}>Hiragana: {characters[currentIndex].hiragana}</Text>
                        <Text style={styles.character}>Katakana: {characters[currentIndex].katakana}</Text>
                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.matchGame}>
                        <Text style={styles.matchGameText}>Match the romaji with the characters</Text>
                        <Text style={styles.character}>Hiragana: {characters[lastFiveIndices[currentMatchIndex]].hiragana}</Text>
                        <Text style={styles.character}>Katakana: {characters[lastFiveIndices[currentMatchIndex]].katakana}</Text>
                        <View style={styles.optionsContainer}>
                            {options.map((option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.optionButton}
                                    onPress={() => handleMatchGameNext(option)}
                                >
                                    <Text style={styles.buttonText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {message && <Text style={styles.message}>{message}</Text>}
                    </View>
                )
            )}
        </View>
    );
};

export default CharacterLessons;
