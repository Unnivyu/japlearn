import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { stylesSlate } from './stylesSlate';
import { stylesClass } from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';
import { AuthContext } from '../../context/AuthContext';
import { useClassCode } from '../../context/ClassCodeContext';

type Phrase = {
    japPhrase: string;
    engTransl: string;
};

const Quackslate3 = ({ navigation }) => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [engtext, setEngText] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [points, setPoints] = useState(0);
    const [showPrompt, setShowPrompt] = useState(true);
    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const [timerInterval, setTimerInterval] = useState(null);
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [isQuizComplete, setIsQuizComplete] = useState(false);

    const { user } = useContext(AuthContext);
    const { classCode } = useClassCode();

    useEffect(() => {
        fetchPhrases();
    }, []);

    const fetchPhrases = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/quackslateContent/getByLevel/Basics 2');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const formattedData: Phrase[] = data.map(item => ({
                japPhrase: item.word,
                engTransl: item.translatedWord,
            }));
            setPhrases(formattedData);
        } catch (error) {
            console.error('Error fetching phrases:', error);
        }
    };

    const handleBackPress = () => {
        console.log('Back button pressed');
        // Add logic to handle back button press
    };

    const handleNextButtonPress = () => {
        const currentPhrase = phrases[currentPhraseIndex];
        const isUserCorrect = engtext.trim().toLowerCase() === currentPhrase.engTransl.toLowerCase();
        if (isUserCorrect) {
            alert('Correct! You translated the phrase correctly.');
            setPoints(points + 1);
        } else {
            alert('Incorrect. Your translation is incorrect. Try again.');
        }

        setIsCorrect(isUserCorrect);

        setCurrentPhraseIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex < phrases.length) {
                return nextIndex;
            } else {
                setIsQuizComplete(true); // Mark the quiz as complete
                if (timerInterval) {
                    clearInterval(timerInterval);
                }
                sendScoreToBackend(points + (isUserCorrect ? 1 : 0)); // Send the score to the backend
                return 0; // Reset to the first phrase when reaching the end
            }
        });

        setEngText('');
    };

    const sendScoreToBackend = async (finalScore) => {
        const scoreData = {
            fname: user.fname,
            lname: user.lname,
            score: finalScore,
            classcode: classCode,
            level: "Basics 2"
        };

        try {
            const response = await fetch('http://localhost:8080/api/quackslateScores/addScore', {
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

    const handleStartQuiz = () => {
        setShowPrompt(false);
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    setIsQuizComplete(true); // Mark the quiz as complete
                    setTimer(0);
                    alert('Time is up! Quiz ended.');
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
        setTimerInterval(interval);
    };

    useEffect(() => {
        return () => {
            // Clear the interval when the component unmounts
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [timerInterval]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            {isQuizComplete ? (
                <View style={stylesSlate.promptContainer}>
                    <View style={stylesSlate.promptBox}>
                        <Text style={stylesSlate.promptText}>Quiz Complete! Your final score is: {points}/{phrases.length}</Text>
                        <TouchableOpacity onPress={() => { setIsQuizComplete(false); setShowPrompt(true); setPoints(0); setTimer(300); }} style={stylesSlate.startButton}>
                            <Text style={stylesSlate.startButtonText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('QuackslateOption')} style={stylesSlate.startButton}>
                            <Text style={stylesSlate.startButtonText}>Back to Menu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showPrompt}
                        onRequestClose={() => {
                            setShowPrompt(!showPrompt);
                        }}
                    >
                        <View style={stylesSlate.promptContainer}>
                            <View style={stylesSlate.promptBox}>
                                <Text style={stylesSlate.promptText}>Welcome to the Quackslate Quiz! Translate the following Japanese phrases to English. Good luck!</Text>
                                <TouchableOpacity onPress={handleStartQuiz} style={stylesSlate.startButton}>
                                    <Text style={stylesSlate.startButtonText}>Start Quiz</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={{ flex: 1 }}>
                        {/* Header */}
                        <View style={stylesClass.header}>
                            <TouchableOpacity onPress={handleBackPress}>
                                <View style={stylesClass.backButtonContainer}>
                                    <BackIcon width={20} height={20} fill={'white'} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[stylesSlate.MenuAll]}>
                        <View style={[stylesSlate.menuContainer]}>
                            <Text style={[stylesSlate.textStyle]}>Translate it to English.</Text>
                        </View>
                        <Image source={require('../../assets/QuackslateDisplay.png')} style={[stylesSlate.imageStyle]} />
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 400, justifyContent: 'center', alignItems: 'center' }}>
                            {phrases.length > 0 && (
                                <Text style={{ fontSize: 24, color: 'black', textAlign: 'center' }}>
                                    {phrases[currentPhraseIndex].japPhrase}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity style={[stylesSlate.BackButton]} onPress={() => console.log('GameBack Button pressed')}>
                            <Image source={require('../../assets/GameBack.png')} style={[stylesSlate.upperLeftButtonImage]} />
                        </TouchableOpacity>
                        <View style={[stylesSlate.Progress]}>
                            <Image source={require('../../assets/GameRect.png')} style={{ width: '100%', height: '100%' }} />
                            <Text style={{ position: 'absolute', color: 'black', fontSize: 20 }}>{currentPhraseIndex + 1}/{phrases.length}</Text>
                        </View>
                        <View style={stylesSlate.topBarContainer}>
                            <View style={stylesSlate.timerContainer}>
                                <Text style={stylesSlate.timerText}>{formatTime(timer)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[stylesSlate.NextButton]} onPress={handleNextButtonPress}>
                            <Image source={require('../../assets/NextButton.png')} style={[stylesSlate.NextButtonS]} />
                        </TouchableOpacity>
                        <TextInput
                            style={stylesSlate.textInput}
                            placeholder="Answer Here"
                            placeholderTextColor="#888"
                            value={engtext}
                            onChangeText={setEngText}
                        />
                    </View>
                </>
            )}
        </KeyboardAvoidingView>
    );
};

export default Quackslate3;
