import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Modal, Alert, Platform, ScrollView, Image, Keyboard, Animated } from 'react-native';
import { stylesSlate } from './stylesSlate';
import { stylesClass } from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';
import { AuthContext } from '../../context/AuthContext';
import { useClassCode } from '../../context/ClassCodeContext';
import expoconfig from '../../expoconfig';
import SamuraiDuck from '../../assets/SamuraiDuck.png';
import SamuraiEnemy from '../../assets/SamuraiEnemy.png';
import { Svg, Line } from 'react-native-svg';
import Congrats from '../../assets/Congrats.png';
import Approve from '../../assets/Approve.png';
import GiveUp from '../../assets/GiveUp.png';


type Phrase = {
    japPhrase: string;
    engTransl: string;
};

const Quackslate2 = ({ navigation }) => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [engtext, setEngText] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [points, setPoints] = useState(0);
    const [showPrompt, setShowPrompt] = useState(true);
    const [timer, setTimer] = useState(180); // 3 minutes in seconds
    const [timerInterval, setTimerInterval] = useState(null);
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [streak, setStreak] = useState(0); // To track correct answer streak
    const [showStreakModal, setShowStreakModal] = useState(false); // To control the streak modal visibility
    const [showIncorrectModal, setShowIncorrectModal] = useState(false); // To control the incorrect answer modal visibility
    const [showAmazingModal, setShowAmazingModal] = useState(false); // To control the amazing streak modal visibility
    const horizontalShakeAnimation = useRef(new Animated.Value(0)).current;
    const verticalShakeAnimation = useRef(new Animated.Value(0)).current;
    const enemySlashAnimation = useRef(new Animated.Value(0)).current;
    const duckSlashAnimation = useRef(new Animated.Value(0)).current;

    const { user } = useContext(AuthContext);
    const { classCode } = useClassCode();

    useEffect(() => {
        fetchPhrases();

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const triggerEnemyShakeAndSlashAnimation = () => {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(horizontalShakeAnimation, {
                    toValue: 20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(horizontalShakeAnimation, {
                    toValue: -20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(horizontalShakeAnimation, {
                    toValue: 20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(horizontalShakeAnimation, {
                    toValue: -20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(horizontalShakeAnimation, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(verticalShakeAnimation, {
                    toValue: 20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(verticalShakeAnimation, {
                    toValue: -20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(verticalShakeAnimation, {
                    toValue: 20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(verticalShakeAnimation, {
                    toValue: -20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(verticalShakeAnimation, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(enemySlashAnimation, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(enemySlashAnimation, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    };

    const triggerDuckShakeAndSlashAnimation = () => {
        Animated.parallel([
            Animated.sequence([
                Animated.timing(horizontalShakeAnimation, {
                    toValue: 20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(horizontalShakeAnimation, {
                    toValue: -20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(horizontalShakeAnimation, {
                    toValue: 20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(horizontalShakeAnimation, {
                    toValue: -20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(horizontalShakeAnimation, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(verticalShakeAnimation, {
                    toValue: 20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(verticalShakeAnimation, {
                    toValue: -20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(verticalShakeAnimation, {
                    toValue: 20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(verticalShakeAnimation, {
                    toValue: -20,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(verticalShakeAnimation, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]),
            Animated.sequence([
                Animated.timing(duckSlashAnimation, {
                    toValue: 1,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(duckSlashAnimation, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();
    };

    const shakeStyle = {
        transform: [
            {
                translateX: horizontalShakeAnimation,
            },
            {
                translateY: verticalShakeAnimation,
            },
        ],
    };

    const enemySlashStyle = {
        opacity: enemySlashAnimation,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    };

    const duckSlashStyle = {
        opacity: duckSlashAnimation,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    };

    const fetchPhrases = async () => {
        try {
            const response = await fetch(`${expoconfig.API_URL}/api/quackslateContent/getByLevel/Basics 1`);
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
        navigation.navigate('QuackslateOption');
    };

    const handleNextButtonPress = () => {
        const currentPhrase = phrases[currentPhraseIndex];
        const isUserCorrect = engtext.trim().toLowerCase() === currentPhrase.engTransl.toLowerCase();
        if (isUserCorrect) {
            setPoints(points + 1);
            setStreak(streak + 1); // Increment the streak
            if (streak + 1 === 2) {
                setShowStreakModal(true);
                setTimeout(() => setShowStreakModal(false), 1300); // Hide modal after 1.3 seconds
            }
            if (streak + 1 === 5) {
                setShowAmazingModal(true);
                setTimeout(() => setShowAmazingModal(false), 1300); // Hide modal after 1.3 seconds
            }
            triggerEnemyShakeAndSlashAnimation();
        } else {
            setStreak(0); // Reset the streak
            setShowIncorrectModal(true);
            setTimeout(() => setShowIncorrectModal(false), 1300); // Hide modal after 1.3 seconds
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
            level: "Basics 1"
        };
    
        try {
            const response = await fetch(`${expoconfig.API_URL}/api/quackslateScores/addScore`, {
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

    const renderQuizCompleteModalContent = () => {
        const scorePercentage = (points / phrases.length) * 100;
        let resultImage;

        if (scorePercentage >= 85) {
            resultImage = Congrats;
        } else if (scorePercentage >= 50) {
            resultImage = Approve;
        } else {
            resultImage = GiveUp;
        }

        return (
            <View style={stylesSlate.resultContainer}>
                <Image source={resultImage} style={stylesSlate.resultImage} />
                <Text style={stylesSlate.promptText}>Quiz Complete! Your final score is: {points}/{phrases.length}</Text>
                <TouchableOpacity onPress={() => { setIsQuizComplete(false); setShowPrompt(true); setPoints(0); setTimer(180); }} style={stylesSlate.startButton}>
                    <Text style={stylesSlate.startButtonText}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('QuackslateOption')} style={stylesSlate.startButton}>
                    <Text style={stylesSlate.startButtonText}>Back to Menu</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            {isQuizComplete ? (
                <View style={stylesSlate.promptContainer}>
                    {renderQuizCompleteModalContent()}
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
                                <Text style={stylesSlate.promptText}>Welcome to the Quackslate! Defeat the Monster by translating the
                                Japanese phrases to English successfully. Good luck!</Text>
                                <TouchableOpacity onPress={handleStartQuiz} style={stylesSlate.startButton}>
                                    <Text style={stylesSlate.startButtonText}>Start Quiz</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showStreakModal}
                        onRequestClose={() => {
                            setShowStreakModal(false);
                        }}
                    >
                        <View style={stylesSlate.streakModalContainer}>
                            <View style={stylesSlate.streakModalBox}>
                                <Text style={stylesSlate.streakModalText}>You're doing great!</Text>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showAmazingModal}
                        onRequestClose={() => {
                            setShowAmazingModal(false);
                        }}
                    >
                        <View style={stylesSlate.streakModalContainer}>
                            <View style={stylesSlate.streakModalBox}>
                                <Text style={stylesSlate.streakModalText}>Amazing!</Text>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={showIncorrectModal}
                        onRequestClose={() => {
                            setShowIncorrectModal(false);
                        }}
                    >
                        <View style={stylesSlate.streakModalContainer}>
                            <View style={stylesSlate.streakModalBox}>
                                <Text style={stylesSlate.streakModalText}>Incorrect</Text>
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
                        <Animated.View style={shakeStyle}>
                            <ScrollView contentContainerStyle={stylesSlate.MenuAll}>
                                <View style={stylesSlate.Progress}>
                                    <Image source={require('../../assets/GameRect.png')} style={{ width: '100%', height: '100%' }} />
                                    <Text style={{ position: 'absolute', color: 'black', fontSize: 20 }}>{currentPhraseIndex + 1}/{phrases.length}</Text>
                                </View>
                                <View style={stylesSlate.timerContainer}>
                                    <Text style={stylesSlate.timerText}>{formatTime(timer)}</Text>
                                </View>
                                <Text style={[stylesSlate.textStyle, { marginTop: 120 }]}>Translate it to English.</Text>
                                <View style={stylesSlate.phraseContainer}>
                                    {phrases.length > 0 && (
                                        <Text style={stylesSlate.phraseText}>
                                            {phrases[currentPhraseIndex].japPhrase}
                                        </Text>
                                    )}
                                </View>
                                <View style={stylesSlate.imageContainer}>
                                    <View style={{ position: 'relative' }}>
                                        <Image source={SamuraiDuck} style={stylesSlate.samuraiImage} />
                                        <Animated.View style={[duckSlashStyle, { zIndex: 2, top: 100, left: 10 }]}>
                                            <Svg height="100" width="100">
                                                <Line x1="0" y1="100" x2="100" y2="0" stroke="black" strokeWidth="5" />
                                            </Svg>
                                        </Animated.View>
                                    </View>
                                    {!isQuizComplete && (
                                    <View style={{ position: 'relative' }}>
                                        <Image source={SamuraiEnemy} style={{ width: 100, height: 100, top: -20 }} />
                                        <Animated.View style={[enemySlashStyle, { zIndex: 2 }]}>
                                            <Svg height="100" width="100">
                                                <Line x1="0" y1="70" x2="70" y2="0" stroke="red" strokeWidth="2" />
                                            </Svg>
                                        </Animated.View>
                                    </View>
                                    )}
                                </View>
                                <TextInput
                                    style={[stylesSlate.textInput, { marginBottom: keyboardVisible ? 150 : 20 }]}
                                    placeholder="Answer Here"
                                    placeholderTextColor="#888"
                                    value={engtext}
                                    onChangeText={setEngText}
                                />
                            </ScrollView>
                        </Animated.View>
                        {!keyboardVisible && (
                            <TouchableOpacity style={stylesSlate.NextButton} onPress={handleNextButtonPress}>
                                <Image source={require('../../assets/NextButton.png')} style={stylesSlate.NextButtonS} />
                            </TouchableOpacity>
                        )}
                    </View>
                </>
            )}
        </KeyboardAvoidingView>
    );
};

export default Quackslate2;
