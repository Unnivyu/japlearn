import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Image, TouchableOpacity, Platform } from 'react-native';
import { stylesQuackman } from './stylesQuackman';
import { stylesClass } from './stylesClass';
import BackIcon from '../../assets/back-icon.svg';

const letters = ["ku", "u", "ru", "fu", "ko", "mo", "ne", "re", "ma", "ra", "lo", "li", "la", "ta", "le"];

const Quackman = () => {
    const [boxTexts, setBoxTexts] = useState(['', '', '']); // State to manage inputs
    const [currentBoxIndex, setCurrentBoxIndex] = useState(0); // Track the current text box index

    // Function to update text in a specific box
    const updateBoxText = (index, text) => {
        const updatedTexts = [...boxTexts];
        updatedTexts[index] = text;
        setBoxTexts(updatedTexts);
    };

    // Function to insert text into the next empty box or reset boxes if full
    const insertTextToNextBoxOrReset = (text) => {
        if (currentBoxIndex < boxTexts.length) {
            updateBoxText(currentBoxIndex, text);
            setCurrentBoxIndex(currentBoxIndex + 1);
        } else {
            // All boxes are full, reset boxes and start with the new option
            setBoxTexts([text, '', '']); // Insert the clicked option into the first box
            setCurrentBoxIndex(1); // Move index to the second box
        }
    };

    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                {/* Header with Left-Aligned Back Button */}
                <View style={[stylesClass.header, Platform.OS === 'web' ? { alignItems: 'flex-start' } : {}]}>
                    <TouchableOpacity onPress={() => console.log('Back button pressed')}>
                        <View style={stylesClass.backButtonContainer}>
                            <BackIcon width={20} height={20} fill={'white'} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={[
                    stylesQuackman.MenuAll,
                    Platform.OS === 'web' ? { maxWidth: 350, marginHorizontal: 'auto' } : {} // Narrower width for web
                ]}
            >
                {/* Logo and Text */}
                <View style={[stylesQuackman.menuContainer]}>
                    <Image source={require('../../assets/quacklogo.png')} style={[stylesQuackman.Quacklogo]} />
                    <Text style={[stylesQuackman.textStyle]}>Quackman</Text>
                </View>

                {/* QuackChance images displayed below the text */}
                <View style={[stylesQuackman.quackChanceContainer]}>
                    {Array.from(Array(3)).map((_, index) => (
                        <Image key={index} source={require('../../assets/QuackProgress.png')} style={[stylesQuackman.QuackChance]} />
                    ))}
                </View>

                {/* 5x3 Button Grid */}
                <View style={stylesQuackman.gridContainer}>
                    {letters.map((letter, index) => (
                        <TouchableOpacity key={index} style={stylesQuackman.button} onPress={() => insertTextToNextBoxOrReset(letter)}>
                            <Image source={require('../../assets/QuackmanOptions.png')} style={stylesQuackman.buttonImage} />
                            <Text style={stylesQuackman.buttonText}>{letter}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Game Back Button */}
                <TouchableOpacity style={[stylesQuackman.BackButton]} onPress={() => console.log('GameBack Button pressed')}>
                    <Image source={require('../../assets/GameBack.png')} style={[stylesQuackman.upperLeftButtonImage]} />
                </TouchableOpacity>

                {/* Game Progress Rect */}
                <View style={[stylesQuackman.Progress]}>
                    <Image source={require('../../assets/GameRect.png')} style={{ width: '100%', height: '100%' }} />
                    <Text style={{ position: 'absolute', color: 'black', fontSize: 20 }}>9/10</Text>
                </View>

                {/* QuackmanBG Image Section */}
                <Image source={require('../../assets/QuackmanBG.png')} style={[stylesQuackman.QuackmanBGImage, { aspectRatio: 1 }]} />
                <Text style={[stylesQuackman.QuackmanBGText]}>A vehicle with 4 wheels used for transport.</Text>

                {/* Text Boxes (Non-Editable) */}
                <View style={stylesQuackman.purpleBoxContainer}>
                    {boxTexts.map((value, index) => (
                        <View key={index} style={stylesQuackman.purpleBox}>
                            <TextInput
                                style={stylesQuackman.textInputStyle}
                                value={value}
                                editable={false} // Make the TextInput non-editable
                            />
                        </View>
                    ))}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Quackman;
