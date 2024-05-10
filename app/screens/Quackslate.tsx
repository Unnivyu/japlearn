import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TextInput, TouchableOpacity } from 'react-native';
import { stylesOption } from './stylesOption';
import { stylesClass} from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';

const japanesePhrases = [
    {
        japanese: 'こんにちは',
        english: 'Hello'
    },
    {
        japanese: 'さようなら',
        english: 'Goodbye'
    },
    // Add the rest of the phrases here
    {
        japanese: 'ありがとう',
        english: 'Thank you'
    },
    {
        japanese: 'おはよう',
        english: 'Good morning'
    }
    // Add up to 10 phrases as needed
];


const Quackslate = () => {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [engtext, setEngText] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);
    const [points, setPoints] = useState(0);

    
    // Define a function to handle back button press
    const handleBackPress = () => {
        console.log('Back button pressed');
        // Add logic to handle back button press
    };

    const handleNextButtonPress = () => {
        // Check the user's answer
        const currentPhrase = japanesePhrases[currentPhraseIndex];
        const isUserCorrect = engtext.trim().toLowerCase() === currentPhrase.english.toLowerCase();
        if (isUserCorrect) {
            // User is correct
            alert('Correct! , You translated the phrase correctly.');
            setPoints(points + 1);
        } else {
            // User is incorrect
            alert('Incorrect , Your translation is incorrect. Try again.');
        }
    
        setIsCorrect(isUserCorrect);

        // Move to the next phrase
        setCurrentPhraseIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex < japanesePhrases.length) {
                return nextIndex;
            } else {
                return 0; // Reset to the first phrase when reaching the end
            }
        });

        // Reset the text input
        setEngText('');
    };


    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
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
                        <Text style={{ fontSize: 24, color: 'black', textAlign: 'center' }}>
                            {japanesePhrases[currentPhraseIndex].japanese}
                        </Text>
                    </View>
                    {/* Second Button (GameBack) */}
                    <TouchableOpacity style={[stylesOption.BackButton]} onPress={() => console.log('GameBack Button pressed')}>
                        <Image source={require('../../assets/GameBack.png')} style={[stylesOption.upperLeftButtonImage]} />
                    </TouchableOpacity>

                    {/* GameRect with Text */}
                    <View style={[stylesOption.Progress,]}>
                        <Image source={require('../../assets/GameRect.png')} style={{ width: '100%', height: '100%' }} />
                        <Text style={{ position: 'absolute', color: 'black', fontSize: 20 }}>{currentPhraseIndex + 1}/{japanesePhrases.length}</Text>
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
      
        </KeyboardAvoidingView>
    );
};
export default Quackslate;
