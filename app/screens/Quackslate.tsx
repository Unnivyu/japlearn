import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { stylesOption } from './stylesOption';
import { stylesClass} from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';


type Phrase = {
    japPhrase: string;
    engTransl: string;
};



const Quackslate = () => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [engtext, setEngText] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [points, setPoints] = useState(0);
    const [showPrompt, setShowPrompt] = useState(true);
    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const [timerInterval, setTimerInterval] = useState(null);
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [isQuizComplete, setIsQuizComplete] = useState(false);


    useEffect(() => {
        fetchPhrases();
    }, []);

    const fetchPhrases = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/quackslateintro/all');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Phrase[] = await response.json();
            setPhrases(data);
        } catch (error) {
            console.error('Error fetching phrases:', error);
        }
    };
    
    // Define a function to handle back button press
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
                return 0; // Reset to the first phrase when reaching the end
            }
        });
    
        setEngText('');
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
            <View style={stylesOption.promptContainer}>
                <View style={stylesOption.promptBox}>
                    <Text style={stylesOption.promptText}>Quiz Complete! Your final score is: {points}/{phrases.length}</Text>
                    <TouchableOpacity onPress={() => { setIsQuizComplete(false); setShowPrompt(true); setPoints(0); setTimer(300); }} style={stylesOption.startButton}>
                        <Text style={stylesOption.startButtonText}>Restart Quiz</Text>
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
                <View style={stylesOption.promptContainer}>
                    <View style={stylesOption.promptBox}>
                        <Text style={stylesOption.promptText}>Welcome to the Quackslate Quiz! Translate the following Japanese phrases to English. Good luck!</Text>
                        <TouchableOpacity onPress={handleStartQuiz} style={stylesOption.startButton}>
                            <Text style={stylesOption.startButtonText}>Start Quiz</Text>
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
                

                <View style={[stylesOption.MenuAll]}>
                    <View style={[stylesOption.menuContainer]}>
                        {/* Change margin-top here */}
                        <Text style={[stylesOption.textStyle,]}>Translate it to English.</Text>
                    </View>
                    <Image source={require('../../assets/QuackslateDisplay.png')} style={[stylesOption.imageStyle]} />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 400, justifyContent: 'center', alignItems: 'center' }}>
                    {phrases.length > 0 && (
                        <Text style={{ fontSize: 24, color: 'black', textAlign: 'center' }}>
                            {phrases[currentPhraseIndex].japPhrase}
                        </Text>
                    )}
                </View>
                    {/* Second Button (GameBack) */}
                    <TouchableOpacity style={[stylesOption.BackButton]} onPress={() => console.log('GameBack Button pressed')}>
                        <Image source={require('../../assets/GameBack.png')} style={[stylesOption.upperLeftButtonImage]} />
                    </TouchableOpacity>

                    {/* GameRect with Text */}
                    <View style={[stylesOption.Progress,]}>
                        <Image source={require('../../assets/GameRect.png')} style={{ width: '100%', height: '100%' }} />
                        <Text style={{ position: 'absolute', color: 'black', fontSize: 20 }}>{currentPhraseIndex + 1}/{phrases.length}</Text>
                    </View>


                    {/* Timer Display */}
                    <View style={stylesOption.topBarContainer}>
                <View style={stylesOption.timerContainer}>
                    <Text style={stylesOption.timerText}>{formatTime(timer)}</Text>
                </View>
                </View>

                    {/* Next Button */}
                    <TouchableOpacity style={[stylesOption.NextButton]} onPress={handleNextButtonPress}>
                        <Image source={require('../../assets/NextButton.png')} style={[stylesOption.NextButtonS]} />
                    </TouchableOpacity>
        
                    <TextInput
                        style={stylesOption.textInput}
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
export default Quackslate;
